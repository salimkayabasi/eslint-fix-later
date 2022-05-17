const logger = require('log4js').getLogger();

const { removeFile, readFile } = require('./fs');
const exec = require('./exec');
const parser = require('./parser');
const ignore = require('./ignore');
const { outputFile } = require('./consts');

const eslintPath = 'node_modules/.bin/eslint';

const fix = (param) => {
  logger.debug('Removing temporary files');
  removeFile(outputFile);

  const baseCmd = `eslint ${param}`;
  const cmd = `${eslintPath} ${param} -f json -o ${outputFile} --quiet`;
  logger.info('Finding errors by running eslint');
  logger.info(baseCmd);
  exec(cmd);

  const fileContent = readFile(outputFile);
  if (!fileContent) {
    logger.error(
      'Something went wrong and eslint failed, please check your parameters',
    );
    return;
  }
  let payload = {};
  try {
    payload = JSON.parse(fileContent);
  } catch (e) {
    logger.error('File parsing error', e.message);
  }
  const parsed = parser(payload);
  logger.info(`${parsed.length} file(s) will be ignored`);
  parsed.forEach((file) => {
    logger.debug(`Ignoring ${file.filePath}`);
    ignore(file);
  });
};

const later = (param) => {
  try {
    fix(param);
  } finally {
    logger.debug('Removing temporary files');
    removeFile(outputFile);
    logger.info('Completed');
  }
};

module.exports = later;
