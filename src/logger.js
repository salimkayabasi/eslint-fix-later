const log4js = require('log4js');
const {name} = require('../package.json');
log4js.configure({
  appenders: {
    out: {
      type: 'stdout',
      layout: {
        type: 'pattern',
        pattern: `%[${name}:%] %m`
      }
    }
  },
  categories: {
    default: {
      appenders: ['out'],
      level: 'info'
    }
  }
});

module.exports = log4js;
