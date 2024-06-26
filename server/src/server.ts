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
  DocumentLink,
} from "vscode-languageserver/node";
import { TextDocument } from "vscode-languageserver-textdocument";
import { sentinel_prefix } from "./snippets/sentinel-prefix";
import { variable_linting } from "./functions/variable_linting";
import { showDiagnostics } from "./functions/showDiagnostics";
import { containsCompletionItem } from "./functions/containsCompletionItems";
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
        triggerCharacters: [".", "=", "(", ")", "{", "}"],
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
    // Register for all configuration changes.
    connection.client.register(
      DidChangeConfigurationNotification.type,
      undefined
    );
  }
  if (hasWorkspaceFolderCapability) {
    connection.workspace.onDidChangeWorkspaceFolders((_event) => {});
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
let global_path_id: string;
documents.onDidOpen((e) => {
  let line = e.document.getText();
  const uri = url.fileURLToPath(url.parse(e.document.uri).href);
  let path_id = uri.replace(/\s/g, "");
  path_id = path_id.replace(/\//g, "-").replace(/\.sentinel$/, "");
  global_path_id = path_id;
  variables[global_path_id] = [];
  variable_linting(line, variables, global_path_id);
});
// Only keep settings for open documents
documents.onDidClose((e) => {
  variables[global_path_id] = [];
  documentSettings.delete(e.document.uri);
});

connection.languages.diagnostics.on(
  async (params) => await showDiagnostics(documents, params)
);

documents.onDidSave((data: TextDocumentChangeEvent<TextDocument>) => {
  connection.languages.diagnostics.refresh();
});

documents.onDidChangeContent(
  (change: TextDocumentChangeEvent<TextDocument>) => {}
);

interface variables_object {
  [key: string]: CompletionItem[];
}
var variables: variables_object = {};
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
    const uri = url.fileURLToPath(
      url.parse(_textDocumentPosition.textDocument.uri).href
    );
    let path_id = uri.replace(/\s/g, "");
    path_id = path_id.replace(/\//g, "-").replace(/\.sentinel$/, "");
    global_path_id = path_id;
    const document = documents.get(_textDocumentPosition.textDocument.uri);
    if (!document) {
      return [];
    } // Ensure the document is available
    let line = document.getText({
      start: { line: _textDocumentPosition.position.line, character: 0 },
      end: _textDocumentPosition.position,
    });

    for (const func of functions_list) {
      const regex = new RegExp(`${func}\.\s*$`);
      if (regex.test(line)) {
        return sentinel_prefix[func];
      }
    }
    const regex = /^func\s+(\w+)\s*\(.*$/;
    if (regex.test(line)) {
      const variable = regex.exec(line)[1];
      const variable_completion: CompletionItem = {
        label: variable,
        kind: CompletionItemKind.Keyword,
        data: variable,
      };
      if (
        !containsCompletionItem(variables[global_path_id], variable_completion)
      ) {
        variables[global_path_id].push(variable_completion);
      }
    }
    variable_linting(line, variables, global_path_id);
    return [...variables[global_path_id], ...sentinel_prefix["rest_variables"]];
  }
);

connection.onCompletionResolve((item: CompletionItem): CompletionItem => {
  if (item.data === 1) {
    item.detail = "Import plugin or standard library";
    item.documentation = "Import keyword allow us to import libraries";
  }
  return item;
});

documents.listen(connection);

// Listen on the connection
connection.listen();
