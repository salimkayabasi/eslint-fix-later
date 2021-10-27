#!/usr/bin/env node

const later = require('..');

const ignoredArgs = ['-f', '--format', '--output-file', '-o'];
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

later(params.join(' '));
