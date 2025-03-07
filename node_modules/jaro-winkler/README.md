# Jaro-Winkler

A string similarity function using the Jaro-Winkler distance metric. Returns a
number between 0 and 1. A 0 being no similarity and a 1 being an exact match.

Read more about it [on Wikipedia](http://en.wikipedia.org/wiki/Jaro–Winkler_distance).

## Install

Install in your Node project using npm as usual; `npm install jaro-winkler`. It
also works in the browser, just include the source within `index.js` in your
project however you prefer. Note that the `distance` function will be added to
the global scope if it's not included with a tool like [Browserify](http://browserify.org).

## Example Usage

```
var distance = require('jaro-winkler');

distance('MARTHA', 'MARHTA');
// 0.961

distance('DWAYNE', 'DUANE');
// 0.84

distance('DIXON', 'DICKSONX');
// 0.814


// Case Insensitive

distance('MARTHA', 'MARTHA');
// 1

distance('mArThA', 'MaRtHa', { caseSensitive: false });
// 1
```

## Sample App

Here's contrived sample of how you might utilize a distance metric in your own
app. This shows how you might offer a helpful message when a user fat-fingers a
command.

```
#!/usr/bin/env node

'use strict';

var distance = require('jaro-winkler');
var commands = ['open', 'close', 'save', 'revert', 'select', 'copy', 'duplicate', 'add', 'subtract'];
var rated    = [];
var args     = process.argv.slice(2);

commands.forEach(function(command) {
  rated.push({
    command: command,
    distance: distance(args[0], command)
  });
});

rated.sort(function(a, b) {
  if (a.distance < b.distance) {
    return 1;
  } else if (a.distance > b.distance) {
      return -1;
  } else {
    return 0;
  }
});

if (rated[0].distance === 1) {
  console.log("Running " + rated[0].command + "!");
} else {
  console.log("Did you mean " + rated[0].command + "?");
}

process.exit(0);
```
