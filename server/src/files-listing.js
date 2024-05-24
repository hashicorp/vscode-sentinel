"use strict";
exports.__esModule = true;
exports.file_list = void 0;
function file_list(line) {
    var regex = new RegExp("/\"s*./\"s*b.*$/");
    if (regex.test(line)) {
        console.log("Import Statement detected");
        console.log(regex);
    }
}
exports.file_list = file_list;
