"use strict";
exports.__esModule = true;
exports.createDirectory = void 0;
var fs = require("fs");
var vscode = require("vscode");
function createDirectory(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
    }
    else {
        vscode.window.showInformationMessage("Directory already exists: ".concat(dirPath));
    }
}
exports.createDirectory = createDirectory;
