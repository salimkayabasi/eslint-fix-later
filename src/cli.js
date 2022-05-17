const { readFile } = require('./fs');
const later = require('./fix-later');

const args = process.argv.slice(2);
const ignoredArgs = [
  '-o',
  '--output-file',
  '-f',
  '--format',
  '--color',
  '--no-color',
];

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

if (params.length) {
  later(params.join(' '));
}

const file = `${process.cwd()}/package.json`;
const content = readFile(file);

const parseScript = (lint) => {
  if (!lint) {
    return undefined;
  }
  const eslint = 'eslint';
  const start = lint.indexOf(eslint) + eslint.length + 1;
  const end = lint.indexOf('&&', start);
  return lint.slice(start, end < 0 ? lint.length : end).trim();
};

if (content) {
  try {
    const { scripts = {} } = JSON.parse(content);
    const lint = parseScript(scripts.lint);
    if (lint) {
      later(lint);
    }
    later(parseScript(scripts.eslint));
  } catch (e) {
    // ignore
  }
}
