# json-colorizer
A library for colorizing JSON strings

![](https://raw.githubusercontent.com/joeattardi/json-colorizer/master/screenshot.png)

This package is a simple console syntax highlighter for JSON.

## Installation
`npm install --save json-colorizer`

## Usage

```js
const colorize = require('json-colorizer');
console.log(colorize({ "foo": "bar" });
```

If you pass a string to the colorize function, it will treat it as pre-serialized JSON. This can be used in order to colorize pretty-printed JSON:

```js
const colorize = require('json-colorizer');
const json = JSON.stringify({"foo": "bar"}, null, 2);
console.log(colorize(json);
```

## Pretty-printing output

To pretty-print the resulting JSON, pass the `pretty: true` option to the options object:

```js
const colorize = require('json-colorizer');
const json = '{"foo": "bar"}';
console.log(colorize(json, { pretty: true }));
```

## Specifying colors

__NOTE__: Prior to version 2.x, the colors were specified by referencing `chalk` color functions directly. This required requiring `chalk` into the file. Starting with version 2.x, the colors are specified as a string which is the name (or property path) to the desired color function.

You can specify a color to use for coloring individual tokens by providing a `colors` object in the options object. This should map token types to the names of color functions (see the [chalk styles reference](https://www.npmjs.com/package/chalk#styles)).

A color can also be specified as a hex value starting with the `#` symbol.

```js
const colorize = require('json-colorizer');
console.log(colorize({ "foo": "bar" }, {
  colors: {
    STRING_KEY: 'green',
    STRING_LITERAL: 'magenta.bold',
    NUMBER_LITERAL: '#FF0000'
  }
}));
```

The tokens available are:

* `BRACE`
* `BRACKET`
* `COLON`
* `COMMA`
* `STRING_KEY`
* `STRING_LITERAL`
* `NUMBER_LITERAL`
* `BOOLEAN_LITERAL`
* `NULL_LITERAL`
