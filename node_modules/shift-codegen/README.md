Shift Code Generator
====================

## About

This module provides a code generator for [Shift format](https://github.com/shapesecurity/shift-spec) ASTs.

## Status

[Stable](http://nodejs.org/api/documentation.html#documentation_stability_index).


## Installation

```sh
npm install shift-codegen
```


## Usage

```js
import codegen from "shift-codegen";
let programSource = codegen(/* Shift format AST */);
```

Location information is available in environments which support WeakMap via an alternative interface:
```js
let tree = parseScript('foo(); bar;');

import { codeGenWithLocation } from "shift-codegen";
let { source, locations } = codeGenWithLocation(tree);
source; // 'foo();bar';
locations.get(tree.statements[0].expression); // { start: { line: 1, column: 0, offset: 0 }, end: { line: 1, column: 5, offset: 5 } }
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
