Shift Parser
============


## About

This module provides an [ECMAScript](http://www.ecma-international.org/publications/standards/Ecma-262.htm)
parser that produces a [Shift format](https://github.com/shapesecurity/shift-spec) AST.


## Status

[Stable](http://nodejs.org/api/documentation.html#documentation_stability_index).

The parser supports version 6 (release candidate 2) of the ECMA-262 standard.


## Installation

```sh
npm install shift-parser
```


## Usage

```es6
import parse from "shift-parser";
let ast = parse("/* ECMAScript program text */");
```

```es6
import {parseScript, parseModule} from "shift-parser";
let scriptAST = parseScript("/* ECMAScript Script text */");
let moduleAST = parseModule("/* ECMAScript Module text */");
```

Or in node.js:

```js
var parseScript = require("shift-parser").parseScript;
var scriptAST = parseScript("/* ECMAScript Script text */");
```


Location information is available in environments which support `WeakMap` via an alternative interface:

```js
let {parseScriptWithLocation, parseModuleWithLocation} = require("shift-parser");
let {tree, locations, comments} = parseScriptWithLocation("2 + 3 /* = 5 */");
let threeNode = tree.statements[0].expression.right;
locations.get(threeNode); // { start: { line: 1, column: 4, offset: 4 }, end: { line: 1, column: 5, offset: 5 } }
comments; // [ { text: ' = 5 ', type: 'MultiLine', start: { line: 1, column: 6, offset: 6 }, end: { line: 1, column: 15, offset: 15 } } ]
```


## Contributing

* Open a Github issue with a description of your desired change. If one exists already, leave a message stating that you are working on it with the date you expect it to be complete.
* Fork this repo, and clone the forked repo.
* Install dependencies with `npm install`.
* Build and test in your environment with `npm run build && npm test`.
* Create a feature branch. Make your changes. Add tests.
* Build and test in your environment with `npm run build && npm test`.
* Make a commit that includes the text "fixes #*XX*" where *XX* is the Github issue.
* Open a Pull Request on Github.


## License

    Copyright 2014 Shape Security, Inc.

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
