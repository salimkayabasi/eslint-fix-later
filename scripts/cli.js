#!/usr/bin/env node

const later = require('..');
const { readFile } = require('../src/fs');

const ignoredArgs = [
  '-o',
  '--output-file',
  '-f',
  '--format',
  '--color',
  '--no-color',
];
const args = process.argv.slice(2);

let index = 0;

const params = [];

while (index < args.length) {
  const arg = args[index];
  if (ignoredArgs.includes(arg)) {
    index += 2;
  } else {
    params.push(arg);
    index += 1;
  }
}

if (!params.length) {
  const file = `${process.cwd()}/package.json`;
  const content = readFile(file);
  if (content) {
    try {
      const { scripts = {} } = JSON.parse(content);
      const lint = scripts.lint || scripts.eslint;
      if (lint) {
        const eslint = 'eslint';
        const start = lint.indexOf(eslint) + eslint.length + 1;
        const end = lint.indexOf('&&', start);
        params.push(lint.slice(start, end).trim());
      }
    } catch (e) {
      // ignore
    }
  }
}

later(params.join(' '));
