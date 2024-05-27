import { TextDocument } from "vscode-languageserver-textdocument";
import { Diagnostic, DiagnosticSeverity } from "vscode-languageserver/node";
import * as url from "url";
import * as fs from "fs";
import * as os from "os";
import { exec,execSync } from "child_process";
import path = require('path');
export async function validateTextDocument(
  textDocument: TextDocument
): Promise<Diagnostic[]> {
  const text = textDocument.getText();
  const file_name = textDocument.uri;
  const uri = url.fileURLToPath(url.parse(textDocument.uri).href);
  let path_id = uri.replace(/\s/g, "");
  path_id = path_id.replace(/\//g, "-").replace(/\\/g,"-").replace(/\.sentinel$/, "");
  const platform = os.platform();
  let removeCmd;
  if(platform=='win32')
  {
    path_id = path.join(os.tmpdir(),`${path_id}`);
    removeCmd = `del /Q ${path_id}`
  }
  else 
  {
    path_id = `/tmp/run${path_id}`;
    removeCmd = `rm ${path_id}`
  }
  try {
    let command = `sentinel apply "${uri}" > ${path_id}`;
    execSync(command);
  } catch (error){}
  const diagnostics: Diagnostic[] = [];
  let output = fs.readFileSync(`${path_id}`).toString();
  if (output.slice(0, 4) == "Pass") {
    exec(removeCmd);
    return diagnostics;
  }
  const { position, content } = extractInfo(output);
  if (!position && !content) {
    return diagnostics;
  }
  const diagnostic: Diagnostic = {
    severity: DiagnosticSeverity.Error,
    range: {
      start: { line: position[0] - 1, character: position[1] - 1 },
      end: { line: position[0] - 1, character: position[1] + 4 },
    },
    message: content,
    source: "Sentinel apply",
  };
  diagnostics.push(diagnostic);
  exec(removeCmd);
  return diagnostics;
}

type ExtractedInfo = {
  position: number[] | null;
  content: string;
};
function extractInfo(input: string): ExtractedInfo {
  const sentinelPattern = /\.sentinel(:\d+:\d+)?/g;
  let match: RegExpExecArray | null = null;
  let lastMatch: RegExpExecArray | null = null;

  // Iterate over all matches to find the last one
  while ((match = sentinelPattern.exec(input)) !== null) {
    lastMatch = match;
  }
  let position: number[] | null = null;
  let content: string = "";
  if (!lastMatch) {
    return { position, content };
  }

  if (lastMatch[1]) {
    position = lastMatch[1]
      .substring(1) // Remove the leading colon
      .split(":") // Split by colon to get line and column numbers
      .map((num) => parseInt(num, 10)); // Convert each part to an integer
  }

  content = input.substring(lastMatch.index! + lastMatch[0].length).trim();

  return {
    position,
    content,
  };
}
