"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var node_1 = require("vscode-languageserver/node");
var vscode_languageserver_textdocument_1 = require("vscode-languageserver-textdocument");
var sentinel_functions_1 = require("./snippets/sentinel-functions");
var validate_1 = require("./functions/validate");
var url = require("url");
var connection = (0, node_1.createConnection)(node_1.ProposedFeatures.all);
// Create a simple text document manager.
var documents = new node_1.TextDocuments(vscode_languageserver_textdocument_1.TextDocument);
var hasConfigurationCapability = false;
var hasWorkspaceFolderCapability = false;
var hasDiagnosticRelatedInformationCapability = false;
connection.onInitialize(function (params) {
    var capabilities = params.capabilities;
    hasConfigurationCapability = !!(capabilities.workspace && !!capabilities.workspace.configuration);
    hasWorkspaceFolderCapability = !!(capabilities.workspace && !!capabilities.workspace.workspaceFolders);
    hasDiagnosticRelatedInformationCapability = !!(capabilities.textDocument &&
        capabilities.textDocument.publishDiagnostics &&
        capabilities.textDocument.publishDiagnostics.relatedInformation);
    var result = {
        capabilities: {
            textDocumentSync: node_1.TextDocumentSyncKind.Incremental,
            // Tell the client that this server supports code completion.
            completionProvider: {
                resolveProvider: true,
                triggerCharacters: [".", "="]
            },
            diagnosticProvider: {
                interFileDependencies: false,
                workspaceDiagnostics: false
            }
        }
    };
    if (hasWorkspaceFolderCapability) {
        result.capabilities.workspace = {
            workspaceFolders: {
                supported: true
            }
        };
    }
    return result;
});
connection.onInitialized(function () {
    if (hasConfigurationCapability) {
        // Register for all configuration changes.
        connection.client.register(node_1.DidChangeConfigurationNotification.type, undefined);
    }
    if (hasWorkspaceFolderCapability) {
        connection.workspace.onDidChangeWorkspaceFolders(function (_event) {
            connection.console.log("Workspace folder change event received.");
        });
    }
});
var defaultSettings = { maxNumberOfProblems: 1000 };
var globalSettings = defaultSettings;
// Cache the settings of all open documents
var documentSettings = new Map();
connection.onDidChangeConfiguration(function (change) {
    if (hasConfigurationCapability) {
        // Reset all cached document settings
        documentSettings.clear();
    }
    else {
        globalSettings = ((change.settings.languageServerExample || defaultSettings));
    }
    connection.languages.diagnostics.refresh();
});
function getDocumentSettings(resource) {
    if (!hasConfigurationCapability) {
        return Promise.resolve(globalSettings);
    }
    var result = documentSettings.get(resource);
    if (!result) {
        result = connection.workspace.getConfiguration({
            scopeUri: resource,
            section: "languageServerExample"
        });
        documentSettings.set(resource, result);
    }
    return result;
}
var global_path_id;
documents.onDidOpen(function (e) {
    var uri = url.fileURLToPath(url.parse(e.document.uri).href);
    var path_id = uri.replace(/\s/g, "");
    path_id = path_id.replace(/\//g, "-").replace(/\.sentinel$/, "");
    global_path_id = path_id;
    console.log(global_path_id);
    variables[global_path_id] = [];
});
// Only keep settings for open documents
documents.onDidClose(function (e) {
    variables[global_path_id] = [];
    documentSettings["delete"](e.document.uri);
});
var showDiag = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var document, diag;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                document = documents.get(params.textDocument.uri);
                if (!(document !== undefined)) return [3 /*break*/, 2];
                return [4 /*yield*/, (0, validate_1.validateTextDocument)(document)];
            case 1:
                diag = _a.sent();
                return [2 /*return*/, {
                        kind: node_1.DocumentDiagnosticReportKind.Full,
                        items: diag
                    }];
            case 2: return [2 /*return*/, {
                    kind: node_1.DocumentDiagnosticReportKind.Full,
                    items: []
                }];
        }
    });
}); };
connection.languages.diagnostics.on(function (params) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, showDiag(params)];
        case 1: return [2 /*return*/, _a.sent()];
    }
}); }); });
documents.onDidSave(function (data) {
    connection.languages.diagnostics.refresh();
});
documents.onDidChangeContent(function (change) {
    //connection.languages.diagnostics.refresh();
});
connection.onDidChangeWatchedFiles(function (_change) {
    // Monitored files have change in VSCode
    connection.console.log("We received a file change event");
});
var variables = {};
var functions_list = [
    "strings",
    "json",
    "http",
    "types",
    "base64",
    "time",
    "decimal",
];
// This handler provides the initial list of the completion items.
connection.onCompletion(function (_textDocumentPosition) {
    var uri = url.fileURLToPath(url.parse(_textDocumentPosition.textDocument.uri).href);
    var path_id = uri.replace(/\s/g, "");
    path_id = path_id.replace(/\//g, "-").replace(/\.sentinel$/, "");
    global_path_id = path_id;
    var document = documents.get(_textDocumentPosition.textDocument.uri);
    if (!document) {
        return [];
    } // Ensure the document is available
    var line = document.getText({
        start: { line: _textDocumentPosition.position.line, character: 0 },
        end: _textDocumentPosition.position
    });
    for (var _i = 0, functions_list_1 = functions_list; _i < functions_list_1.length; _i++) {
        var func = functions_list_1[_i];
        var regex_1 = new RegExp("".concat(func, ".s*$"));
        if (regex_1.test(line)) {
            return sentinel_functions_1.sentinel_functions[func];
        }
    }
    if (/^(.*?)=+$/.test(line)) {
        var variable = line.replace(/^(.*?)=+$/, "$1").trim();
        var variable_completion = {
            label: variable,
            kind: node_1.CompletionItemKind.Keyword,
            data: variable
        };
        variables[global_path_id].push(variable_completion);
    }
    var regex = /func\s+(\w+)\s+\(/;
    if (regex.test(line)) {
        console.log("Matched");
    }
    return __spreadArray(__spreadArray([], variables[global_path_id], true), sentinel_functions_1.sentinel_functions["rest_variables"], true);
});
connection.onCompletionResolve(function (item) {
    if (item.data === 1) {
        item.detail = "Import plugin or standard library";
        item.documentation = "Import keyword allow us to import libraries";
    }
    return item;
});
documents.listen(connection);
// Listen on the connection
connection.listen();
