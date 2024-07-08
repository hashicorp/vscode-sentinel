import * as path from "path";
import { create_folder_structure } from "./vscode-sentinel_init/folder_structure_create";
import { workspace, ExtensionContext } from "vscode";
import * as vscode from "vscode";
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind,
} from "vscode-languageclient/node";
let client: LanguageClient;

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
