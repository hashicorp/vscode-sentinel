"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sentinel_prefix = void 0;
var vscode_languageserver_1 = require("vscode-languageserver");
exports.sentinel_prefix = {
    strings: [
        {
            label: "has_prefix()",
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            data: "string.1",
        },
        {
            label: "has_suffix()",
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            data: "string.2",
        },
        {
            label: "join()",
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            data: "string.3",
        },
        {
            label: "trim_prefix()",
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            data: "string.4",
        },
        {
            label: "to_lower()",
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            data: "string.5",
        },
        {
            label: "to_upper()",
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            data: 6,
        },
        {
            label: "split()",
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            data: 7,
        },
    ],
    json: [
        {
            label: "marshal()",
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            data: 1,
        },
        {
            label: "unmarshal()",
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            data: 2,
        },
    ],
    http: [
        {
            label: "get()",
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            data: 1,
        },
        {
            label: "request()",
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            data: 2,
        },
        {
            label: "post()",
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            data: 3,
        },
        {
            label: "client",
            kind: vscode_languageserver_1.CompletionItemKind.Field,
            data: 4,
        },
        {
            label: "accept_status_codes",
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            data: 5,
        },
    ],
    types: [
        {
            label: "type_of()",
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            data: 1,
        },
    ],
    base64: [
        {
            label: "encode()",
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            data: 1,
        },
        {
            label: "decode()",
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            data: 2,
        },
        {
            label: "urlencode()",
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            data: 3,
        },
        {
            label: "urldecode()",
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            data: 4,
        },
    ],
    time: [
        {
            label: "now",
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            data: 1,
        },
        {
            label: "load()",
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            data: 2,
        },
        {
            label: "second",
            kind: vscode_languageserver_1.CompletionItemKind.Field,
            data: 3,
        },
        {
            label: "millisecond",
            kind: vscode_languageserver_1.CompletionItemKind.Field,
            data: 4,
        },
        {
            label: "nanosecond",
            kind: vscode_languageserver_1.CompletionItemKind.Field,
            data: 5,
        },
        {
            label: "microsecond",
            kind: vscode_languageserver_1.CompletionItemKind.Field,
            data: 6,
        },
        {
            label: "minute",
            kind: vscode_languageserver_1.CompletionItemKind.Field,
            data: 7,
        },
        {
            label: "hour",
            kind: vscode_languageserver_1.CompletionItemKind.Field,
            data: 8,
        },
    ],
    decimal: [
        {
            label: "infinity()",
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            data: 1,
        },
        {
            label: "new()",
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            data: 2,
        },
        {
            label: "is_nan()",
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            data: 3,
        },
        {
            label: "nan",
            kind: vscode_languageserver_1.CompletionItemKind.Field,
            data: 4,
        },
        {
            label: "is_infinite()",
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            data: 5,
        },
        {
            label: "string",
            kind: vscode_languageserver_1.CompletionItemKind.Field,
            data: 6,
        },
        {
            label: "sign",
            kind: vscode_languageserver_1.CompletionItemKind.Field,
            data: 7,
        },
        {
            label: "coefficient",
            kind: vscode_languageserver_1.CompletionItemKind.Field,
            data: 8,
        },
        {
            label: "exponent",
            kind: vscode_languageserver_1.CompletionItemKind.Field,
            data: 9,
        },
        {
            label: "float",
            kind: vscode_languageserver_1.CompletionItemKind.Field,
            data: 10,
        },
        {
            label: "is()",
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            data: 11,
        },
        {
            label: "is_not()",
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            data: 12,
        },
        {
            label: "less_than()",
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            data: 13,
        },
        {
            label: "less_than_or_equals()",
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            data: 14,
        },
        {
            label: "greater_than()",
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            data: 15,
        },
        {
            label: "greater_than_or_equals()",
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            data: 16,
        },
        {
            label: "add()",
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            data: 17,
        },
        {
            label: "substract()",
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            data: 17,
        },
        {
            label: "multiply()",
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            data: 18,
        },
        {
            label: "divide()",
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            data: 19,
        },
        {
            label: "modulo()",
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            data: 20,
        },
        {
            label: "power()",
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            data: 21,
        },
        {
            label: "loge()",
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            data: 22,
        },
        {
            label: "sqaure_root()",
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            data: 23,
        },
        {
            label: "ceiling()",
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            data: 24,
        },
        {
            label: "floor()",
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            data: 25,
        },
        {
            label: "absolute()",
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            data: 26,
        },
        {
            label: "negate()",
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            data: 26,
        },
    ],
    rest_variables: [
        {
            label: "as",
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            data: "as",
        },
        {
            label: "if",
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            data: "if",
        },
        {
            label: "break",
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            data: "break",
        },
        {
            label: "continue",
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            data: "continue",
        },
        {
            label: "in",
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            data: "in",
        },
        {
            label: "null",
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            data: "null",
        },
        {
            label: "param",
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            data: "param",
        },
        {
            label: "default",
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            data: "default",
        },
        {
            label: "map",
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            data: "map",
        },
        {
            label: "strings",
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            data: "strings",
        },
        {
            label: "json",
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            data: "json",
        },
        {
            label: "http",
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            data: "http",
        },
        {
            label: "types",
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            data: "types",
        },
        {
            label: "decimal",
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            data: "decimal",
        },
        {
            label: "base64",
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            data: "base64",
        },
        {
            label: "time",
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            data: "time",
        },
        {
            label: "error()",
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            data: "error",
        },
        {
            label: "length()",
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            data: "length",
        },
        {
            label: "append()",
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            data: "append",
        },
        {
            label: "delete()",
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            data: "delete",
        },
        {
            label: "range()",
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            data: "range",
        },
        {
            label: "keys()",
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            data: "keys",
        },
        {
            label: "values()",
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            data: "values",
        },
        {
            label: "int()",
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            data: "int",
        },
        {
            label: "string()",
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            data: "string",
        },
        {
            label: "float()",
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            data: "float",
        },
        {
            label: "bool()",
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            data: "bool",
        },
        {
            label: "case",
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            data: "case",
        },
        {
            label: "when",
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            data: "when",
        },
        {
            label: "all",
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            data: "all",
        },
        {
            label: "return",
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            data: "return",
        },
        {
            label: "undefined",
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            data: "undefined",
        },
        {
            label: "import",
            kind: vscode_languageserver_1.CompletionItemKind.Snippet,
            data: "import",
        },
    ],
};
