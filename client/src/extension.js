"use strict";
/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
exports.__esModule = true;
exports.deactivate = exports.activate = void 0;
var path = require("path");
var folder_structure_create_1 = require("./vscode-sentinel_init/folder_structure_create");
var vscode_1 = require("vscode");
var vscode = require("vscode");
var node_1 = require("vscode-languageclient/node");
var client;
// interface ExtensionInfo {
//   name: string;
//   extensionVersion: string;
//   syntaxVersion: string;
//   preview: false;
// }
// function getExtensionInfo(): ExtensionInfo {
//   // eslint-disable-next-line @typescript-eslint/no-var-requires
//   const pjson = require("../package.json");
//   return {
//     name: pjson.name,
//     extensionVersion: pjson.version,
//     syntaxVersion: pjson.syntax.version,
//     preview: pjson.preview,
//   };
// }
// async function run(info: ExtensionInfo) {
//   const release = `v${info.syntaxVersion}`;
//   const fileName = `${info.name}.tmGrammar.json`;
//   const url = `https://github.com/hashicorp/syntax/releases/download/${release}/${fileName}`;
//   console.log(`Downloading: ${url}`);
//   const cwd = path.resolve(__dirname);
//   const buildDir = path.basename(cwd);
//   const repoDir = cwd.replace(buildDir, "");
//   const installPath = path.join(repoDir, "syntaxes");
//   const fpath = path.join(installPath, fileName);
//   if (fs.existsSync(installPath)) {
//     fs.rmSync(installPath, { recursive: true, force: true });
//   }
//   fs.mkdirSync(installPath);
//   const content = await got({ url }).text();
//   fs.writeFileSync(fpath, content);
//   console.log(`Download completed: ${fpath}`);
// }
// const info = getExtensionInfo();
// run(info);
function activate(context) {
    var serverModule = context.asAbsolutePath(path.join("server", "out", "server.js"));
    var serverOptions = {
        run: { module: serverModule, transport: node_1.TransportKind.ipc },
        debug: {
            module: serverModule,
            transport: node_1.TransportKind.ipc
        }
    };
    var clientOptions = {
        documentSelector: [{ scheme: "file", language: "sentinel" }],
        synchronize: {
            fileEvents: vscode_1.workspace.createFileSystemWatcher("**/.clientrc")
        }
    };
    client = new node_1.LanguageClient("languageServerExample", "Language Server Example", serverOptions, clientOptions);
    vscode.window.showInformationMessage("Client Launched");
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
