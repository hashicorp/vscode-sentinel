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
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTextDocument = void 0;
var node_1 = require("vscode-languageserver/node");
var url = require("url");
var fs = require("fs");
var child_process_1 = require("child_process");
function validateTextDocument(textDocument) {
    return __awaiter(this, void 0, void 0, function () {
        var text, file_name, uri, path_id, command, diagnostics, output, command, _a, position, content, diagnostic, command;
        return __generator(this, function (_b) {
            text = textDocument.getText();
            file_name = textDocument.uri;
            uri = url.fileURLToPath(url.parse(textDocument.uri).href);
            path_id = uri.replace(/\s/g, "");
            path_id = path_id.replace(/\//g, "-").replace(/\.sentinel$/, "");
            try {
                command = "sentinel apply \"".concat(uri, "\" &> /tmp/run").concat(path_id);
                (0, child_process_1.execSync)(command);
            }
            catch (error) {
                error.status;
                error.message;
                error.stderr;
                error.stdout;
            }
            diagnostics = [];
            output = fs.readFileSync("/tmp/run".concat(path_id)).toString();
            if (output.slice(0, 4) == "Pass") {
                try {
                    command = "rm /tmp/run".concat(path_id);
                    (0, child_process_1.execSync)(command);
                }
                catch (error) {
                    error.status;
                    error.message;
                    error.stderr;
                    error.stdout;
                }
                return [2 /*return*/, diagnostics];
            }
            _a = extractInfo(output), position = _a.position, content = _a.content;
            if (!position && !content) {
                return [2 /*return*/, diagnostics];
            }
            diagnostic = {
                severity: node_1.DiagnosticSeverity.Error,
                range: {
                    start: { line: position[0] - 1, character: position[1] - 1 },
                    end: { line: position[0] - 1, character: position[1] + 4 },
                },
                message: content,
                source: "Sentinel apply",
            };
            diagnostics.push(diagnostic);
            try {
                command = "rm /tmp/run".concat(path_id);
                (0, child_process_1.execSync)(command);
            }
            catch (error) {
                error.status;
                error.message;
                error.stderr;
                error.stdout;
            }
            return [2 /*return*/, diagnostics];
        });
    });
}
exports.validateTextDocument = validateTextDocument;
function extractInfo(input) {
    var sentinelPattern = /\.sentinel(:\d+:\d+)?/g;
    var match = null;
    var lastMatch = null;
    // Iterate over all matches to find the last one
    while ((match = sentinelPattern.exec(input)) !== null) {
        lastMatch = match;
    }
    var position = null;
    var content = "";
    if (!lastMatch) {
        return { position: position, content: content };
    }
    if (lastMatch[1]) {
        position = lastMatch[1]
            .substring(1) // Remove the leading colon
            .split(":") // Split by colon to get line and column numbers
            .map(function (num) { return parseInt(num, 10); }); // Convert each part to an integer
    }
    content = input.substring(lastMatch.index + lastMatch[0].length).trim();
    return {
        position: position,
        content: content,
    };
}
