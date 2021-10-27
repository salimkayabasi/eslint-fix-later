const { execSync } = require('child_process');
const logger = require('log4js').getLogger();

const exec = (cmd) => {
  try {
    logger.debug(cmd);
    execSync(cmd, { encoding: 'utf8' });
  } catch (e) {
    logger.debug(e.message);
  }
};

module.exports = exec;
