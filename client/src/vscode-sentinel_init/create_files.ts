import * as fs from "fs";
import * as vscode from "vscode";
export function createFile(filePath: string, content: string = "") {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
  } else {
    vscode.window.showInformationMessage(`File already exists: ${filePath}`);
  }
}
