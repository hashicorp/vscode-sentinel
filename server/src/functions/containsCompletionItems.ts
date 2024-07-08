import { CompletionItem } from "vscode-languageserver";

export function containsCompletionItem(
  array: CompletionItem[],
  item: CompletionItem
): boolean {
  return array.some((existingItem) => existingItem.label === item.label);
}
