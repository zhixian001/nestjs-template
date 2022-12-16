#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';

// Change package name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.info(`🫡 Update package name`);
const packageJsonFilePath = path.join(__dirname, 'package.json');

const packageJsonFileData = JSON.parse(
  await fs.promises.readFile(packageJsonFilePath, {
    encoding: 'utf8',
  }),
);

packageJsonFileData.name = __dirname.split('/').pop();

await fs.promises.writeFile(
  packageJsonFilePath,
  JSON.stringify(packageJsonFileData, null, 2),
);

console.info(`✅ Updated: ${packageJsonFileData.name}`);

// Remove and init git repo
console.info(`🫡 Reset git directory`);
fs.rmSync(`${__dirname}/.git`, { recursive: true, force: true });

exec('git init', (error, stdout, stderr) => {
  if (error) {
    console.error(`error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.info(`stdout: ${stdout}`);
});

console.info(`✅ Reset: OK`);

// Remove this file
console.info(`🫡 Remove this script file (${__filename})`);
fs.rmSync(__filename, { force: true });
console.info(`✅ Removed`);

console.info(`✨ Done`);
