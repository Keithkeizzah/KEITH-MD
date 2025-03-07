<br />

[![Issues](https://img.shields.io/github/issues/arthurfiorette/tinylibs?logo=github&label=Issues)](https://github.com/arthurfiorette/tinylibs/issues)
[![Stars](https://img.shields.io/github/stars/arthurfiorette/tinylibs?logo=github&label=Stars)](https://github.com/arthurfiorette/tinylibs/stargazers)
[![License](https://img.shields.io/github/license/arthurfiorette/tinylibs?logo=githu&label=License)](https://github.com/arthurfiorette/tinylibs/blob/main/LICENSE)
[![Codecov](https://codecov.io/gh/arthurfiorette/tinylibs/branch/main/graph/badge.svg?token=ML0KGCU0VM)](https://codecov.io/gh/arthurfiorette/tinylibs)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Farthurfiorette%2Ftinylibs.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Farthurfiorette%2Ftinylibs?ref=badge_shield)
[![Join the chat at https://gitter.im/tinylibs-js-org/community](https://badges.gitter.im/tinylibs-js-org/community.svg)](https://gitter.im/tinylibs-js-org/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Speed Blazing](https://img.shields.io/badge/speed-blazing%20%F0%9F%94%A5-brightgreen.svg)](https://twitter.com/acdlite/status/974390255393505280)

[![Latest Version](https://img.shields.io/npm/v/object-code)](https://www.npmjs.com/package/object-code)
[![Downloads](https://img.shields.io/npm/dw/object-code)](https://www.npmjs.com/package/object-code)
[![JsDelivr](https://data.jsdelivr.com/v1/package/npm/object-code/badge?style=rounded)](https://www.jsdelivr.com/package/npm/object-code)
[![Bundlephobia](https://img.shields.io/bundlephobia/minzip/object-code/latest?style=flat)](https://bundlephobia.com/package/object-code@latest)
[![Packagephobia](https://packagephobia.com/badge?p=object-code@latest)](https://packagephobia.com/result?p=object-code@latest)

<br />

<div align="center">
  <pre>
  <h1>⛓️<br />Object Code</h1>
  </pre>
  <br />
</div>

<h3 align="center">
  <code>Object Code</code> is a blazing fast hash code generator that supports every possible javascript value.
  <br />
  <br />
</h3>

<br />

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Installing](#installing)
  - [Node](#node)
  - [Browser](#browser)
  - [Url Import](#url-import)
- [Getting Started](#getting-started)
- [Compatibility](#compatibility)
- [Benchmark](#benchmark)
- [License](#license)

<br />

## Installing

### Node

```sh
npm install object-code # or yarn add object-code
```

```js
const { hash } = require('object-code');
import { hash } from 'object-code';
```

### Browser

```html
<script
  crossorigin
  src="https://cdn.jsdelivr.net/npm/object-code@latest/dist/index.umd.js"
></script>
```

```js
const { hash } = window.objectCode;
```

### Url Import

```ts
import { hash } from 'https://cdn.skypack.dev/object-code@latest';
```

<br />

## Getting Started

Object code is a blazing fast hash code generator. It generates unique signed integers for
objects, arrays, functions, symbols and etc.

You can ise it to index object in a collection, compare objects or just generate unique
identifiers.

```js
import { hash } from 'object-code';

const myWeirdObject = {
  name: 'Arthur',
  age: 20,
  address: {
    private: true
  },
  sayHello: function () {
    console.log('Hello!');
  },
  id: Symbol('arthur'),
  birth: new Date(2005, 02, 27),
  tags: ['person', 'male', 'programmer']
  recursive: myWeirdObject,
  // etc
};

const hash = hash(myWeirdObject);
// -1352827948
```

## Compatibility

See all unique values at [`test/values.ts`](test/values.ts)

This package is always seeking for a faster implementation. This means that we don't
guarantee that the hash will be the same for two different versions of this package. There
will be an warning on the release notes if the hash generation changed.

You shouldn't rely on cross version compatibility, and even if so, you can run some tests
before pushing to production :)

<br />

## Benchmark

This is the result of a [benchmark](./benchmark/benchmark.js) between `object-hash` and
`object-code`:

```txt
  Object Code:
    492 919 ops/s, ±0.90%     | 84.72% slower

  Object Hash:
    48 311 ops/s, ±0.89%      | slowest, 98.5% slower

  Object Code (Jsonified Object):
    401 901 ops/s, ±0.75%     | 87.54% slower

  Object Hash (Jsonified Object):
    213 819 ops/s, ±0.48%     | 93.37% slower

  Object Code (String):
    3 225 590 ops/s, ±1.94%   | fastest

  Object Hash (String):
    424 569 ops/s, ±2.88%     | 86.84% slower
```

<br />

## License

Licensed under the **MIT**. See [`LICENSE`](LICENSE) for more informations.

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Farthurfiorette%2Ftinylibs.svg?type=small)](https://app.fossa.com/projects/git%2Bgithub.com%2Farthurfiorette%2Ftinylibs?ref=badge_small)

<br />
