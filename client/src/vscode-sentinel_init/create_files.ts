import * as fs from 'fs';
export function createFile(filePath: string, content: string = "") {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, content);
    } else {
      console.log(`File already exists: ${filePath}`);
    }
  }