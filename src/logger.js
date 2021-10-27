const log4js = require('log4js');
const { name } = require('../package.json');

log4js.configure({
  appenders: {
    out: {
      type: 'stdout',
      layout: {
        type: 'pattern',
        pattern: `%[${name}:%] %m`,
      },
    },
  },
  categories: {
    default: {
      appenders: ['out'],
      level: process.env.LOG_LEVEL || 'info',
    },
  },
});

module.exports = log4js;
