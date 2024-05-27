"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_folder_structure = void 0;
var vscode = require("vscode");
var path = require("path");
var folder_structure_template_1 = require("./folder_structure_template");
var create_directory_1 = require("./create_directory");
var create_files_1 = require("./create_files");
var fs = require("fs");
function create_folder_structure() {
    vscode.window
        .showInputBox({
        prompt: "Enter the name of the project",
        placeHolder: "Project Name",
    })
        .then(function (dirname) {
        var workspaceFolders = vscode.workspace.workspaceFolders;
        if (workspaceFolders && workspaceFolders.length > 0) {
            var pwdPath = workspaceFolders[0].uri.fsPath;
            var dirPath_1 = path.join(pwdPath, dirname);
            if (!fs.existsSync(dirPath_1)) {
                (0, create_directory_1.createDirectory)(dirPath_1);
                folder_structure_template_1.structure.forEach(function (dir) {
                    var folderDirPath = path.join(dirPath_1, dir);
                    vscode.window.showInformationMessage(folderDirPath);
                    (0, create_directory_1.createDirectory)(folderDirPath);
                });
                folder_structure_template_1.files.forEach(function (_a) {
                    var filePath = _a[0], content = _a[1];
                    var fullFilePath = path.join(dirPath_1, filePath);
                    (0, create_files_1.createFile)(fullFilePath, content);
                });
            }
            else {
                vscode.window.showErrorMessage("Directory Already Exist!");
            }
        }
        else {
            vscode.window.showErrorMessage("No working Directory");
        }
    });
}
exports.create_folder_structure = create_folder_structure;
