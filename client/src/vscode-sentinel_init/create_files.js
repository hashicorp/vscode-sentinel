"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFile = void 0;
var fs = require("fs");
function createFile(filePath, content) {
    if (content === void 0) { content = ""; }
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, content);
    }
    else {
        console.log("File already exists: ".concat(filePath));
    }
}
exports.createFile = createFile;
