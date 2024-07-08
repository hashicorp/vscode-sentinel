import * as fs from "fs";
import * as vscode from "vscode";
export function createDirectory(dirPath: string) {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
    } else {
      vscode.window.showInformationMessage(`Directory already exists: ${dirPath}`);
    }
  }
  