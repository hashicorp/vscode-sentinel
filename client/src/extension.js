"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
var path = require("path");
var folder_structure_create_1 = require("./vscode-sentinel_init/folder_structure_create");
var vscode_1 = require("vscode");
var vscode = require("vscode");
var node_1 = require("vscode-languageclient/node");
var client;
function activate(context) {
    var serverModule = context.asAbsolutePath(path.join("server", "out", "server.js"));
    var serverOptions = {
        run: { module: serverModule, transport: node_1.TransportKind.ipc },
        debug: {
            module: serverModule,
            transport: node_1.TransportKind.ipc,
        },
    };
    var clientOptions = {
        documentSelector: [{ scheme: "file", language: "sentinel" }],
        synchronize: {
            fileEvents: vscode_1.workspace.createFileSystemWatcher("**/.clientrc"),
        },
    };
    client = new node_1.LanguageClient("languageServerExample", "Language Server Example", serverOptions, clientOptions);
    //Init Command
    var init = vscode.commands.registerCommand("vscode-sentinel-folder-structure.init", folder_structure_create_1.create_folder_structure);
    context.subscriptions.push(init);
    client.start();
}
exports.activate = activate;
function deactivate() {
    // run(info);
    if (!client) {
        return undefined;
    }
    return client.stop();
}
exports.deactivate = deactivate;
