#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';

// Update package.json
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.info(`🫡 Update package name, author, email`);
const packageJsonFilePath = path.join(__dirname, 'package.json');

const packageJsonFileData = JSON.parse(
  await fs.promises.readFile(packageJsonFilePath, {
    encoding: 'utf8',
  }),
);

// update name
packageJsonFileData.name = __dirname.split('/').pop();

// update author
// Read author info from .gitconfig file
let authorName = null;
let authorEmail = null;
try {
  const homePath = process.env.HOME;

  if (!homePath) {
    throw new Error('Home path does not exist');
  }

  const gitConfigPath = `${homePath}/.gitconfig`;

  if (!fs.existsSync(gitConfigPath)) {
    throw new Error('Gitconfig does not exist');
  }

  const gitConfigFileData = await fs.promises.readFile(gitConfigPath, { encoding: 'utf-8' });

  const parsedGitConfig = gitConfigFileData.split('\n')
    .map(
      configLine => configLine
        .split(' ').join('')
        .split('\t').join('')
    )
    .filter(
      configLine => {
        if (configLine.startsWith('[')) {
          return false;
        }

        if (configLine.startsWith('#')) {
          return false;
        }

        if (!configLine.includes('=')) {
          return false;
        }

        return true;
      }
    );

  parsedGitConfig.forEach(configLine => {
    const [key, value] = configLine.split('=');

    if (key.toLowerCase() === 'name') {
      authorName = value;
    }

    if (key.toLowerCase() === 'email') {
      authorEmail = value;
    }
  });

} catch (err) {
  // nothing happens
}

if (authorName && authorEmail) {
  packageJsonFileData.author = `${authorName}(${authorEmail})`;
} else if (authorName) {
  packageJsonFileData.author = `${authorName}`;
} else if (authorEmail) {
  packageJsonFileData.author = `${authorEmail}`;
}


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
