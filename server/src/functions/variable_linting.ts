import { CompletionItem, CompletionItemKind } from "vscode-languageserver";
import { containsCompletionItem } from "./containsCompletionItems";
interface variables_object {
  [key: string]: CompletionItem[];
}
export const variable_linting = (
  line: string,
  variables: variables_object,
  global_path_id: string
) => {
  if (/^(.*?)=+$/.test(line)) {
    const variable = line.replace(/^(.*?)=+$/, "$1").trim();
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
};
