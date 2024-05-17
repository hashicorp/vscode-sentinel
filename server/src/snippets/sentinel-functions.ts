import { CompletionItem, CompletionItemKind } from "vscode-languageserver";
export const sentinel_functions = {
  strings: [
    {
      label: "has_prefix()",
      kind: CompletionItemKind.Method,
      data: "string.1",
    },
    {
      label: "has_suffix()",
      kind: CompletionItemKind.Method,
      data: "string.2",
    },
    {
      label: "join()",
      kind: CompletionItemKind.Method,
      data: "string.3",
    },
    {
      label: "trim_prefix()",
      kind: CompletionItemKind.Method,
      data: "string.4",
    },
    {
      label: "to_lower()",
      kind: CompletionItemKind.Method,
      data: "string.5",
    },
    {
      label: "to_upper()",
      kind: CompletionItemKind.Method,
      data: 6,
    },
    {
      label: "split()",
      kind: CompletionItemKind.Method,
      data: 7,
    },
  ],
  json: [
    {
      label: "marshal()",
      kind: CompletionItemKind.Method,
      data: 1,
    },
    {
      label: "unmarshal()",
      kind: CompletionItemKind.Method,
      data: 2,
    },
  ],
  http: [
    {
      label: "get()",
      kind: CompletionItemKind.Method,
      data: 1,
    },
    {
      label: "request()",
      kind: CompletionItemKind.Method,
      data: 2,
    },
    {
      label: "post()",
      kind: CompletionItemKind.Method,
      data: 3,
    },
    {
      label: "client",
      kind: CompletionItemKind.Field,
      data: 4,
    },
    {
      label: "accept_status_codes",
      kind: CompletionItemKind.Function,
      data: 5,
    },
  ],
  types: [
    {
      label: "type_of()",
      kind: CompletionItemKind.Method,
      data: 1,
    },
  ],
  base64: [
    {
      label: "encode()",
      kind: CompletionItemKind.Method,
      data: 1,
    },
    {
      label: "decode()",
      kind: CompletionItemKind.Method,
      data: 2,
    },
    {
      label: "urlencode()",
      kind: CompletionItemKind.Method,
      data: 3,
    },
    {
      label: "urldecode()",
      kind: CompletionItemKind.Method,
      data: 4,
    },
  ],
  time: [
    {
      label: "now",
      kind: CompletionItemKind.Keyword,
      data: 1,
    },
    {
      label: "load()",
      kind: CompletionItemKind.Method,
      data: 2,
    },
    {
      label: "second",
      kind: CompletionItemKind.Field,
      data: 3,
    },
    {
      label: "millisecond",
      kind: CompletionItemKind.Field,
      data: 4,
    },
    {
      label: "nanosecond",
      kind: CompletionItemKind.Field,
      data: 5,
    },
    {
      label: "microsecond",
      kind: CompletionItemKind.Field,
      data: 6,
    },
    {
      label: "minute",
      kind: CompletionItemKind.Field,
      data: 7,
    },
    {
      label: "hour",
      kind: CompletionItemKind.Field,
      data: 8,
    },
  ],
  decimal: [
    {
      label: "infinity()",
      kind: CompletionItemKind.Method,
      data: 1,
    },
    {
      label: "new()",
      kind: CompletionItemKind.Method,
      data: 2,
    },
    {
      label: "is_nan()",
      kind: CompletionItemKind.Method,
      data: 3,
    },
    {
      label: "nan",
      kind: CompletionItemKind.Field,
      data: 4,
    },
    {
      label: "is_infinite()",
      kind: CompletionItemKind.Method,
      data: 5,
    },
    {
      label: "string",
      kind: CompletionItemKind.Field,
      data: 6,
    },
    {
      label: "sign",
      kind: CompletionItemKind.Field,
      data: 7,
    },
    {
      label: "coefficient",
      kind: CompletionItemKind.Field,
      data: 8,
    },
    {
      label: "exponent",
      kind: CompletionItemKind.Field,
      data: 9,
    },
    {
      label: "float",
      kind: CompletionItemKind.Field,
      data: 10,
    },
    {
      label: "is()",
      kind: CompletionItemKind.Method,
      data: 11,
    },
    {
      label: "is_not()",
      kind: CompletionItemKind.Method,
      data: 12,
    },
    {
      label: "less_than()",
      kind: CompletionItemKind.Method,
      data: 13,
    },
    {
      label: "less_than_or_equals()",
      kind: CompletionItemKind.Method,
      data: 14,
    },
    {
      label: "greater_than()",
      kind: CompletionItemKind.Method,
      data: 15,
    },
    {
      label: "greater_than_or_equals()",
      kind: CompletionItemKind.Method,
      data: 16,
    },
    {
      label: "add()",
      kind: CompletionItemKind.Method,
      data: 17,
    },
    {
      label: "substract()",
      kind: CompletionItemKind.Method,
      data: 17,
    },
    {
      label: "multiply()",
      kind: CompletionItemKind.Method,
      data: 18,
    },
    {
      label: "divide()",
      kind: CompletionItemKind.Method,
      data: 19,
    },
    {
      label: "modulo()",
      kind: CompletionItemKind.Method,
      data: 20,
    },
    {
      label: "power()",
      kind: CompletionItemKind.Method,
      data: 21,
    },
    {
      label: "loge()",
      kind: CompletionItemKind.Method,
      data: 22,
    },
    {
      label: "sqaure_root()",
      kind: CompletionItemKind.Method,
      data: 23,
    },
    {
      label: "ceiling()",
      kind: CompletionItemKind.Method,
      data: 24,
    },
    {
      label: "floor()",
      kind: CompletionItemKind.Method,
      data: 25,
    },
    {
      label: "absolute()",
      kind: CompletionItemKind.Method,
      data: 26,
    },
    {
      label: "negate()",
      kind: CompletionItemKind.Method,
      data: 26,
    },
  ],
  rest_variables: [
    {
      label: "as",
      kind: CompletionItemKind.Keyword,
      data: "as",
    },
    {
      label: "if",
      kind: CompletionItemKind.Keyword,
      data: "if",
    },
    {
      label: "break",
      kind: CompletionItemKind.Keyword,
      data: "break",
    },
    {
      label: "continue",
      kind: CompletionItemKind.Keyword,
      data: "continue",
    },
    {
      label: "in",
      kind: CompletionItemKind.Keyword,
      data: "in",
    },
    {
      label: "null",
      kind: CompletionItemKind.Keyword,
      data: "null",
    },
    {
      label: "param",
      kind: CompletionItemKind.Keyword,
      data: "param",
    },
    {
      label: "default",
      kind: CompletionItemKind.Keyword,
      data: "default",
    },
    {
      label: "map",
      kind: CompletionItemKind.Keyword,
      data: "map",
    },
    {
      label: "strings",
      kind: CompletionItemKind.Keyword,
      data: "strings",
    },
    {
      label: "json",
      kind: CompletionItemKind.Keyword,
      data: "json",
    },
    {
      label: "http",
      kind: CompletionItemKind.Keyword,
      data: "http",
    },
    {
      label: "types",
      kind: CompletionItemKind.Keyword,
      data: "types",
    },
    {
      label: "decimal",
      kind: CompletionItemKind.Keyword,
      data: "decimal",
    },
    {
      label: "base64",
      kind: CompletionItemKind.Keyword,
      data: "base64",
    },
    {
      label: "time",
      kind: CompletionItemKind.Keyword,
      data: "time",
    },
    {
      label: "error()",
      kind: CompletionItemKind.Method,
      data: "error",
    },
    {
      label: "length()",
      kind: CompletionItemKind.Method,
      data: "length",
    },
    {
      label: "append()",
      kind: CompletionItemKind.Method,
      data: "append",
    },
    {
      label: "delete()",
      kind: CompletionItemKind.Method,
      data: "delete",
    },
    {
      label: "range()",
      kind: CompletionItemKind.Method,
      data: "range",
    },
    {
      label: "keys()",
      kind: CompletionItemKind.Method,
      data: "keys",
    },
    {
      label: "values()",
      kind: CompletionItemKind.Method,
      data: "values",
    },
    {
      label: "int()",
      kind: CompletionItemKind.Method,
      data: "int",
    },
    {
      label: "string()",
      kind: CompletionItemKind.Method,
      data: "string",
    },
    {
      label: "float()",
      kind: CompletionItemKind.Method,
      data: "float",
    },
    {
      label: "bool()",
      kind: CompletionItemKind.Method,
      data: "bool",
    },
    {
      label: "case",
      kind: CompletionItemKind.Method,
      data: "case",
    },
    {
      label: "when",
      kind: CompletionItemKind.Method,
      data: "when",
    },
    {
      label: "all",
      kind: CompletionItemKind.Method,
      data: "all",
    },
    {
      label: "return",
      kind: CompletionItemKind.Keyword,
      data: "return",
    },
    {
      label: "undefined",
      kind: CompletionItemKind.Keyword,
      data: "undefined",
    },
  ],
};
