const log4js = require('log4js');
const { name } = require('../package.json');

const level =
  process.env.NODE_ENV === 'test' ? 'off' : process.env.LOG_LEVEL || 'info';

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
      level,
    },
  },
});

module.exports = log4js;
