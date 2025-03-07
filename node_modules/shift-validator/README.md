Shift Validator
===============


## About

We call an AST *valid* if it represents an ECMAScript program. The
[Shift AST format](https://github.com/shapesecurity/shift-spec) was designed
to permit the fewest possible conforming ASTs that are not valid. For various
reasons, it is impossible to exclude all invalid ASTs. This module
distinguishes valid Shift format ASTs from invalid ones.


## Status

[Stable](http://nodejs.org/api/documentation.html#documentation_stability_index).

## Note on IfStatements

Most of the ways in which a well-typed AST can fail to be valid are clear from the grammar or spec. One special case is worth calling attention to: an IfStatement with an alternate nested inside the consequent of an IfStatement that lacks an alternate is not valid. No possible source text can produce this AST.


## Installation

```sh
npm install shift-validator
```


## Usage

```js
import isValid, {Validator} from "shift-validator";
isValid(myAst); // Boolean
Validator.validate(myAst); // [ValidationError]
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
