const { readFileSync, writeFileSync } = require('fs');
const logger = require('log4js').getLogger();

const eslintDisable = 'eslint-disable';
const cwd = `${process.cwd()}/`;

const ignore = ({ filePath, rules }) => {
  const file = readFileSync(filePath, { encoding: 'utf8' });
  let uniqueIds;

  const firstLine = file.split('\n')[0];
  if (firstLine.includes(eslintDisable)) {
    const matched = firstLine.match(/eslint-disable(.*)\*\//);
    const existing = matched[1].split(',').map((item) => item.trim());
    uniqueIds = [...new Set([...rules, ...existing])].sort();
    writeFileSync(
      filePath,
      file.replace(/^.*\n/, `/* ${eslintDisable} ${uniqueIds.join(',')} */\n`),
    );
  } else {
    uniqueIds = rules.sort();
    writeFileSync(
      filePath,
      `/* ${eslintDisable} ${uniqueIds.join(',')} */\n${file}`,
    );

    const fileShortPath = filePath.replace(cwd, '');
    logger.info(`Ignore ${uniqueIds.length} error(s) on ${fileShortPath}`);
  }
};

module.exports = ignore;
