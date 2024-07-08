import {
  DocumentDiagnosticReport,
  DocumentDiagnosticReportKind,
  TextDocuments,
} from "vscode-languageserver";
import { validateTextDocument } from "./validate";

export let showDiagnostics = async (documents, params) => {
  const document = documents.get(params.textDocument.uri);
  if (document !== undefined) {
    let diag = await validateTextDocument(document);
    return {
      kind: DocumentDiagnosticReportKind.Full,
      items: diag,
    } satisfies DocumentDiagnosticReport;
  } else {
    return {
      kind: DocumentDiagnosticReportKind.Full,
      items: [],
    } satisfies DocumentDiagnosticReport;
  }
};
