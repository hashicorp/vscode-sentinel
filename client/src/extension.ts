/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import * as path from "path";
import { create_folder_structure } from "./vscode-sentinel_init/folder_structure_create";
import { workspace, ExtensionContext } from "vscode";
import * as vscode from "vscode";
import * as fs from "fs";
import got from "got";
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind,
} from "vscode-languageclient/node";
let client: LanguageClient;

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

export function activate(context: ExtensionContext) {
  const serverModule = context.asAbsolutePath(
    path.join("server", "out", "server.js")
  );

  const serverOptions: ServerOptions = {
    run: { module: serverModule, transport: TransportKind.ipc },
    debug: {
      module: serverModule,
      transport: TransportKind.ipc,
    },
  };

  const clientOptions: LanguageClientOptions = {
    documentSelector: [{ scheme: "file", language: "sentinel" }],
    synchronize: {
      fileEvents: workspace.createFileSystemWatcher("**/.clientrc"),
    },
  };

  client = new LanguageClient(
    "languageServerExample",
    "Language Server Example",
    serverOptions,
    clientOptions
  );
  vscode.window.showInformationMessage("Client Launched");
  //Init Command
  const init = vscode.commands.registerCommand(
    "vscode-sentinel-folder-structure.init",
    create_folder_structure
  );
  context.subscriptions.push(init);

  client.start();
}

export function deactivate(): Thenable<void> | undefined {
  // run(info);
  if (!client) {
    return undefined;
  }
  return client.stop();
}
