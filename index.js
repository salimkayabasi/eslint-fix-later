const { existsSync, unlinkSync } = require('fs');
const logger = require('./src/logger').getLogger('fix-later');

const outputFile = '.fix-later';

const later = (param) => {
  const cmd = `eslint ${param} -f ${outputFile}`;
  logger.info(cmd);
  if (existsSync(outputFile)) {
    unlinkSync(outputFile);
  }
};

module.exports = later;
