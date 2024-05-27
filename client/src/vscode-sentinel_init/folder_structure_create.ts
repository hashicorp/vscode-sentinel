import * as vscode from "vscode";
import * as path from "path";
import { structure, files } from "./folder_structure_template";
import { createDirectory } from "./create_directory";
import { createFile } from "./create_files";
import * as fs from "fs";
export function create_folder_structure() {
  vscode.window
    .showInputBox({
      prompt: "Enter the name of the project",
      placeHolder: "Project Name",
    })
    .then((dirname) => {
      const workspaceFolders = vscode.workspace.workspaceFolders;
      if (workspaceFolders && workspaceFolders.length > 0) {
        const pwdPath = workspaceFolders[0].uri.fsPath;
        const dirPath = path.join(pwdPath, dirname!);
        if (!fs.existsSync(dirPath)) {
          createDirectory(dirPath);
          structure.forEach((dir) => {
            const folderDirPath = path.join(dirPath, dir);
            createDirectory(folderDirPath);
          });
          files.forEach(([filePath, content]) => {
            const fullFilePath = path.join(dirPath, filePath);
            createFile(fullFilePath, content);
          });
        } else {
          vscode.window.showErrorMessage("Directory Already Exist!");
        }
      } else {
        vscode.window.showErrorMessage("No working Directory");
      }
    });
}
