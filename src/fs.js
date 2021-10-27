const { existsSync, unlinkSync, readFileSync } = require('fs');

const fileOptions = { encoding: 'utf8' };

const removeFile = (file) => {
  if (existsSync(file)) {
    unlinkSync(file);
  }
};

const readFile = (file) => {
  if (existsSync(file)) {
    return readFileSync(file, fileOptions);
  }
  return undefined;
};

module.exports = {
  readFile,
  removeFile,
};
