Shift Regexp Acceptor
=============


## About

This module provides a ECMA-262 regular expression [acceptor](https://en.wikipedia.org/wiki/Finite-state_machine#Acceptors_(recognizers)) for validation of regular expression literals for [ECMAScript 2016](https://www.ecma-international.org/ecma-262/9.0/#sec-regexp-regular-expression-objects), [Annex B](https://www.ecma-international.org/ecma-262/9.0/#sec-regular-expressions-patterns).

## Status

[Stable](http://nodejs.org/api/documentation.html#documentation_stability_index).


## Installation

```sh
npm install shift-regexp-acceptor
```


## Usage

```js
import acceptRegex from 'shift-regexp-acceptor';

let isAccepted = acceptRegex('[a-z]+' /* source */); // unicode is assumed

let isAccepted = acceptRegex('[a-z]+' /* source */, { unicode: true }; // unicode mode enabled

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

    Copyright 2018 Shape Security, Inc.

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
