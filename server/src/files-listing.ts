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

export function file_list(line: string) {
  const regex = new RegExp(`/"\s*./\"\s*b.*$/`);
  if (regex.test(line)) {
    console.log("Import Statement detected");
    console.log(regex);
  }
}
