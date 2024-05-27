"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.snippet_completion = void 0;
var vscode_languageserver_1 = require("vscode-languageserver");
var predefined_snippets = require("../snippets/sentinel-snippet.json");
var snippetCompletion;
function snippet_completion(line) {
    if (/=\s*func\b.*$/.test(line)) {
        snippetCompletion = {
            label: predefined_snippets["Function Snippet TypeA"].description,
            kind: vscode_languageserver_1.CompletionItemKind.Snippet,
            insertText: predefined_snippets["Function Snippet TypeA"].body.join("\n"),
            insertTextFormat: vscode_languageserver_1.InsertTextFormat.Snippet,
        };
        return [snippetCompletion];
    }
    var rest_snippets = removeFirstElement(predefined_snippets);
    for (var _i = 0, _a = Object.keys(rest_snippets); _i < _a.length; _i++) {
        var snippet = _a[_i];
        var reg_exp = new RegExp("".concat(rest_snippets[snippet].prefix, "s*$"));
        if (reg_exp.test(line)) {
            snippetCompletion = {
                label: rest_snippets[snippet].description,
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                insertText: rest_snippets[snippet].body.join("\n"),
                insertTextFormat: vscode_languageserver_1.InsertTextFormat.Snippet,
            };
            return [snippetCompletion];
        }
    }
}
exports.snippet_completion = snippet_completion;
function removeFirstElement(obj) {
    var _a = obj, _b = Object.keys(obj)[0], _ = _a[_b], rest = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
    return rest;
}
