import {
  createConnection,
  TextDocuments,
  Diagnostic,
  DiagnosticSeverity,
  ProposedFeatures,
  InitializeParams,
  DidChangeConfigurationNotification,
  CompletionItem,
  CompletionItemKind,
  TextDocumentPositionParams,
  TextDocumentSyncKind,
  InitializeResult,
  DocumentDiagnosticReportKind,
  type DocumentDiagnosticReport,
  TextDocumentChangeEvent,
  InsertTextFormat,
  TextEdit,
  Position,
  TextDocumentWillSaveEvent,
  Range,
} from "vscode-languageserver/node";
import { TextDocument } from "vscode-languageserver-textdocument";
import { attachPartialResult } from "vscode-languageserver/lib/common/progress";
import * as predefined_snippets from "./snippets/sentinel-snippet.json";
import { file_list } from "./files-listing";
import { start } from "repl";
import { exec, execFileSync, execSync } from "child_process";
import { debug } from "console";
import * as fs from "fs";
import { sentinel_functions } from "./snippets/sentinel-functions";
import * as url from "url";
import { match } from "assert";
import path = require("path");
const connection = createConnection(ProposedFeatures.all);
// Create a simple text document manager.
const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

let hasConfigurationCapability = false;
let hasWorkspaceFolderCapability = false;
let hasDiagnosticRelatedInformationCapability = false;

connection.onInitialize((params: InitializeParams) => {
  const capabilities = params.capabilities;
  hasConfigurationCapability = !!(
    capabilities.workspace && !!capabilities.workspace.configuration
  );
  hasWorkspaceFolderCapability = !!(
    capabilities.workspace && !!capabilities.workspace.workspaceFolders
  );
  hasDiagnosticRelatedInformationCapability = !!(
    capabilities.textDocument &&
    capabilities.textDocument.publishDiagnostics &&
    capabilities.textDocument.publishDiagnostics.relatedInformation
  );

  const result: InitializeResult = {
    capabilities: {
      textDocumentSync: TextDocumentSyncKind.Incremental,
      // Tell the client that this server supports code completion.
      completionProvider: {
        resolveProvider: true,
        triggerCharacters: [".", "="],
      },
      diagnosticProvider: {
        interFileDependencies: false,
        workspaceDiagnostics: false,
      },
    },
  };
  if (hasWorkspaceFolderCapability) {
    result.capabilities.workspace = {
      workspaceFolders: {
        supported: true,
      },
    };
  }
  return result;
});

connection.onInitialized(() => {
  if (hasConfigurationCapability) {
    console.log("Connected");
    // Register for all configuration changes.
    connection.client.register(
      DidChangeConfigurationNotification.type,
      undefined
    );
  }
  if (hasWorkspaceFolderCapability) {
    connection.workspace.onDidChangeWorkspaceFolders((_event) => {
      connection.console.log("Workspace folder change event received.");
    });
  }
});

interface ExampleSettings {
  maxNumberOfProblems: number;
}

const defaultSettings: ExampleSettings = { maxNumberOfProblems: 1000 };
let globalSettings: ExampleSettings = defaultSettings;

// Cache the settings of all open documents
const documentSettings: Map<string, Thenable<ExampleSettings>> = new Map();

connection.onDidChangeConfiguration((change) => {
  if (hasConfigurationCapability) {
    // Reset all cached document settings
    documentSettings.clear();
  } else {
    globalSettings = <ExampleSettings>(
      (change.settings.languageServerExample || defaultSettings)
    );
  }
  connection.languages.diagnostics.refresh();
});

function getDocumentSettings(resource: string): Thenable<ExampleSettings> {
  if (!hasConfigurationCapability) {
    return Promise.resolve(globalSettings);
  }
  let result = documentSettings.get(resource);
  if (!result) {
    result = connection.workspace.getConfiguration({
      scopeUri: resource,
      section: "languageServerExample",
    });
    documentSettings.set(resource, result);
  }
  return result;
}

// Only keep settings for open documents
documents.onDidClose((e) => {
  variables = [];
  documentSettings.delete(e.document.uri);
});

// const debounce = (callback, wait) => {
//   let timeoutId = null;
//   return (...args) => {
//     clearTimeout(timeoutId);
//     timeoutId = setTimeout(() => {
//       callback(...args);
//     }, wait);
//   };
// };

let showDiag = async (params) => {
  const document = documents.get(params.textDocument.uri);
  if (document !== undefined) {
    let diag = await validateTextDocument(document);
    return {
      kind: DocumentDiagnosticReportKind.Full,
      items: diag,
    } satisfies DocumentDiagnosticReport;
  } else {
    // We don't know the document. We can either try to read it from disk
    // or we don't report problems for it.
    return {
      kind: DocumentDiagnosticReportKind.Full,
      items: [],
    } satisfies DocumentDiagnosticReport;
  }
};

connection.languages.diagnostics.on(async (params) => await showDiag(params));

let output;
documents.onDidSave((data: TextDocumentChangeEvent<TextDocument>) => {
  connection.languages.diagnostics.refresh();
});

documents.onDidChangeContent(
  (change: TextDocumentChangeEvent<TextDocument>) => {
    //connection.languages.diagnostics.refresh();
  }
);

type ExtractedInfo = {
  position: number[] | null;
  content: string;
};

function extractInfo(input: string): ExtractedInfo {
  const sentinelPattern = /\.sentinel(:\d+:\d+)?/g;
  let match: RegExpExecArray | null = null;
  let lastMatch: RegExpExecArray | null = null;

  // Iterate over all matches to find the last one
  while ((match = sentinelPattern.exec(input)) !== null) {
    lastMatch = match;
  }

  if (!lastMatch) {
    throw new Error("No '.sentinel' pattern found in the input string.");
  }

  let position: number[] | null = null;
  if (lastMatch[1]) {
    position = lastMatch[1]
      .substring(1) // Remove the leading colon
      .split(":") // Split by colon to get line and column numbers
      .map((num) => parseInt(num, 10)); // Convert each part to an integer
  }

  const content = input
    .substring(lastMatch.index! + lastMatch[0].length)
    .trim();

  return {
    position,
    content,
  };
}

async function validateTextDocument(
  textDocument: TextDocument
): Promise<Diagnostic[]> {
  const text = textDocument.getText();
  const file_name = textDocument.uri;
  const uri = url.fileURLToPath(url.parse(textDocument.uri).href);
  let path_id = uri.replace(/\s/g, "");
  path_id = path_id.replace(/\//g, "-").replace(/\.sentinel$/, "");
  try {
    let command = `sentinel apply "${uri}" &> /tmp/run${path_id}`;
    execSync(command);
  } catch (error) {
    error.status;
    error.message;
    error.stderr;
    error.stdout;
  }
  const diagnostics: Diagnostic[] = [];
  let output = fs.readFileSync(`/tmp/run${path_id}`).toString();
  if (output.slice(0, 4) == "Pass") {
    try {
      let command = `rm /tmp/run${path_id}`;
      execSync(command);
    } catch (error) {
      error.status;
      error.message;
      error.stderr;
      error.stdout;
    }
    return diagnostics;
  }
  const { position, content } = extractInfo(output);
  const diagnostic: Diagnostic = {
    severity: DiagnosticSeverity.Error,
    range: {
      start: { line: position[0] - 1, character: position[1] - 1 },
      end: { line: position[0] - 1, character: position[1] + 4 },
    },
    message: content,
    source: path_id,
  };
  diagnostics.push(diagnostic);

  try {
    let command = `rm /tmp/run${path_id}`;
    execSync(command);
  } catch (error) {
    error.status;
    error.message;
    error.stderr;
    error.stdout;
  }
  return diagnostics;
}

connection.onDidChangeWatchedFiles((_change) => {
  // Monitored files have change in VSCode
  connection.console.log("We received a file change event");
});
var variables: CompletionItem[] = [],
  func_name;
const functions_list: string[] = [
  "strings",
  "json",
  "http",
  "types",
  "base64",
  "time",
  "decimal",
];
// This handler provides the initial list of the completion items.
connection.onCompletion(
  (_textDocumentPosition: TextDocumentPositionParams): CompletionItem[] => {
    const document = documents.get(_textDocumentPosition.textDocument.uri);
    if (!document) {
      return [];
    } // Ensure the document is available
    var snippetCompletion: CompletionItem;
    let line = document.getText({
      start: { line: _textDocumentPosition.position.line, character: 0 },
      end: _textDocumentPosition.position,
    });

    for (const func of functions_list) {
      const regex = new RegExp(`${func}\.\s*$`);
      if (regex.test(line)) {
        return sentinel_functions[func];
      }
    }

    if (/=\s*func\b.*$/.test(line)) {
      snippetCompletion = {
        label: predefined_snippets["Function Snippet TypeA"].description,
        kind: CompletionItemKind.Snippet,
        insertText:
          predefined_snippets["Function Snippet TypeA"].body.join("\n"),
        insertTextFormat: InsertTextFormat.Snippet,
      };
      return [snippetCompletion];
    }
    const rest_snippets = removeFirstElement(predefined_snippets);
    for (const snippet of Object.keys(rest_snippets)) {
      const reg_exp = new RegExp(`${rest_snippets[snippet].prefix}s*$`);
      if (reg_exp.test(line)) {
        snippetCompletion = {
          label: rest_snippets[snippet].description,
          kind: CompletionItemKind.Method,
          insertText: rest_snippets[snippet].body.join("\n"),
          insertTextFormat: InsertTextFormat.Snippet,
        };
        return [snippetCompletion];
      }
    }
    if (/^(.*?)=+$/.test(line)) {
      const variable = line.replace(/^(.*?)=+$/, "$1");
      const variable_completion: CompletionItem = {
        label: variable,
        kind: CompletionItemKind.Keyword,
        data: variable,
      };
      variables.push(variable_completion);
    }
    const regex = /func\s+(\w+)\s+\(/;
    if (regex.test(line)) {
      console.log("Matched");
    }
    return [...variables, ...sentinel_functions["rest_variables"]];
  }
);

connection.onCompletionResolve((item: CompletionItem): CompletionItem => {
  if (item.data === 1) {
    item.detail = "Import plugin or standard library";
    item.documentation = "Import keyword allow us to import libraries";
  }
  return item;
});

function removeFirstElement<T>(obj: Record<string, T>): Record<string, T> {
  const { [Object.keys(obj)[0]]: _, ...rest } = obj;
  return rest;
}
documents.listen(connection);

// Listen on the connection
connection.listen();
