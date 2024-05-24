import {
  CompletionItem,
  CompletionItemKind,
  InsertTextFormat,
} from "vscode-languageserver";
import * as predefined_snippets from "../snippets/sentinel-snippet.json";
var snippetCompletion: CompletionItem;
export function snippet_completion(line: string): CompletionItem[] {
  if (/=\s*func\b.*$/.test(line)) {
    snippetCompletion = {
      label: predefined_snippets["Function Snippet TypeA"].description,
      kind: CompletionItemKind.Snippet,
      insertText: predefined_snippets["Function Snippet TypeA"].body.join("\n"),
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
}

function removeFirstElement<T>(obj: Record<string, T>): Record<string, T> {
  const { [Object.keys(obj)[0]]: _, ...rest } = obj;
  return rest;
}
