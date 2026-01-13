/**
 * Copyright IBM Corp. 2020, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import * as fs from "fs";
import * as path from "path";
import axios from "axios";

interface ExtensionInfo {
  name: string;
  extensionVersion: string;
  syntaxVersion: string;
  preview: false;
}

function getExtensionInfo(): ExtensionInfo {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const pjson = require("../package.json");
  return {
    name: pjson.name,
    extensionVersion: pjson.version,
    syntaxVersion: pjson.syntax.version,
    preview: pjson.preview,
  };
}

async function fileFromUrl(url: string): Promise<Buffer> {
  const response = await axios.get(url, { responseType: "arraybuffer" });
  return Buffer.from(response.data, "binary");
}

async function downloadFile(url: string, installPath: string) {
  if (process.env.downloader_log === "true") {
    console.log(`Downloading: ${url}`);
  }

  const buffer = await fileFromUrl(url);
  fs.writeFileSync(installPath, buffer);
  if (process.env.downloader_log === "true") {
    console.log(`Download completed: ${installPath}`);
  }
}

async function downloadSyntax(info: ExtensionInfo) {
  const release = `v${info.syntaxVersion}`;

  const cwd = path.resolve(__dirname);
  const buildDir = path.basename(cwd);
  const repoDir = cwd.replace(buildDir, "");
  const installPath = path.join(repoDir, "syntaxes");

  if (fs.existsSync(installPath)) {
    if (process.env.downloader_log === "true") {
      console.log(`Syntax path exists at ${installPath}. Removing`);
    }
    fs.rmSync(installPath, { recursive: true });
  }

  fs.mkdirSync(installPath);

  const productName = info.name.replace("-preview", "");
  const syntaxFile = `${productName}.tmGrammar.json`;

  let url = `https://github.com/hashicorp/syntax/releases/download/${release}/sentinel.tmGrammar.json`;
  await downloadFile(url, path.join(installPath, syntaxFile));
}

async function run() {
  const extInfo = getExtensionInfo();
  if (process.env.downloader_log === "true") {
    console.log(extInfo);
  }

  await downloadSyntax(extInfo);
}

run();
