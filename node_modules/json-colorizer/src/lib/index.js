const lexer = require('./lexer');
const colorizer = require('./colorizer');

module.exports = function colorizeJson(json, options) {
  return colorizer.colorize(lexer.getTokens(json, options), options);
};
