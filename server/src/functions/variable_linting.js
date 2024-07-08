"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.variable_linting = void 0;
var vscode_languageserver_1 = require("vscode-languageserver");
var containsCompletionItems_1 = require("./containsCompletionItems");
var variable_linting = function (line, variables, global_path_id) {
    if (/^(.*?)=+$/.test(line)) {
        var variable = line.replace(/^(.*?)=+$/, "$1").trim();
        var variable_completion = {
            label: variable,
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            data: variable,
        };
        if (!(0, containsCompletionItems_1.containsCompletionItem)(variables[global_path_id], variable_completion)) {
            variables[global_path_id].push(variable_completion);
        }
    }
};
exports.variable_linting = variable_linting;
