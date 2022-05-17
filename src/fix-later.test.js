const later = require('./fix-later');
const exec = require('./exec');
const fs = require('./fs');
const parser = require('./parser');
const ignore = require('./ignore');
const { outputFile } = require('./consts');

jest.mock('./exec');
jest.mock('./fs');
jest.mock('./parser');
jest.mock('./ignore');

const param = 'test-params';
const output = [
  {
    test: true,
  },
];

describe('fix-later', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should remove the temporary file', () => {
    later(param);
    expect(fs.removeFile).toHaveBeenCalledWith(outputFile);
  });

  test('should pass the param to eslint', () => {
    later(param);
    expect(exec).toHaveBeenCalledWith(
      `node_modules/.bin/eslint ${param} -f json -o .fix-later --quiet`,
    );
  });

  test('should read the output file', () => {
    later(param);
    expect(fs.readFile).toHaveBeenCalledWith(outputFile);
  });

  test('should not invoke parser if there is output file', () => {
    later(param);
    expect(parser).not.toHaveBeenCalled();
  });

  test('should ignore if output file is not well formed', () => {
    fs.readFile.mockReturnValue('invalid format to be parsed as json');
    later(param);
    expect(parser).toHaveBeenCalledWith({});
  });

  describe('with valid output file', () => {
    beforeEach(() => {
      fs.readFile.mockReturnValue(JSON.stringify(output));
    });

    test('should pass the content of the output file to parser', () => {
      later(param);
      expect(parser).toHaveBeenCalledWith(output);
    });

    test('should pass the result of the parsing to ignore', () => {
      later(param);
      expect(ignore).toHaveBeenCalledWith(parser.mock.results[0].value[0]);
    });
  });
});
