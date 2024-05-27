"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
var path = require("path");
var Mocha = require("mocha");
var glob = require("glob");
function run() {
    // Create the mocha test
    var mocha = new Mocha({
        ui: 'tdd',
        color: true
    });
    mocha.timeout(100000);
    var testsRoot = __dirname;
    return new Promise(function (resolve, reject) {
        glob('**.test.js', { cwd: testsRoot }, function (err, files) {
            if (err) {
                return reject(err);
            }
            // Add files to the test suite
            files.forEach(function (f) { return mocha.addFile(path.resolve(testsRoot, f)); });
            try {
                // Run the mocha test
                mocha.run(function (failures) {
                    if (failures > 0) {
                        reject(new Error("".concat(failures, " tests failed.")));
                    }
                    else {
                        resolve();
                    }
                });
            }
            catch (err) {
                console.error(err);
                reject(err);
            }
        });
    });
}
exports.run = run;
