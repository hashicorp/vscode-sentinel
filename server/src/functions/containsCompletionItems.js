"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.containsCompletionItem = void 0;
function containsCompletionItem(array, item) {
    return array.some(function (existingItem) { return existingItem.label === item.label; });
}
exports.containsCompletionItem = containsCompletionItem;
