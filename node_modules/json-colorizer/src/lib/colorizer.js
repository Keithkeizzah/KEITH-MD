const chalk = require('chalk');
const get = require('lodash.get');

const defaultColors = {
  BRACE: 'gray',
  BRACKET: 'gray',
  COLON: 'gray',
  COMMA: 'gray',
  STRING_KEY: 'magenta',
  STRING_LITERAL: 'yellow',
  NUMBER_LITERAL: 'green',
  BOOLEAN_LITERAL: 'cyan',
  NULL_LITERAL: 'white'
};

exports.colorize = function colorize(tokens, options = {}) {
  const colors = options.colors || {};

  return tokens.reduce((acc, token) => {
    const colorKey = colors[token.type] || defaultColors[token.type];
    const colorFn = colorKey && colorKey[0] === '#' ? chalk.hex(colorKey) : get(chalk, colorKey);

    return acc + (colorFn ? colorFn(token.value) : token.value);
  }, '');
};
