<br />

[![Issues](https://img.shields.io/github/issues/arthurfiorette/tinylibs?logo=github&label=Issues)](https://github.com/arthurfiorette/tinylibs/issues)
[![Stars](https://img.shields.io/github/stars/arthurfiorette/tinylibs?logo=github&label=Stars)](https://github.com/arthurfiorette/tinylibs/stargazers)
[![License](https://img.shields.io/github/license/arthurfiorette/tinylibs?logo=githu&label=License)](https://github.com/arthurfiorette/tinylibs/blob/main/LICENSE)
[![Codecov](https://codecov.io/gh/arthurfiorette/tinylibs/branch/main/graph/badge.svg?token=ML0KGCU0VM)](https://codecov.io/gh/arthurfiorette/tinylibs)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Farthurfiorette%2Ftinylibs.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Farthurfiorette%2Ftinylibs?ref=badge_shield)
[![Join the chat at https://gitter.im/tinylibs-js-org/community](https://badges.gitter.im/tinylibs-js-org/community.svg)](https://gitter.im/tinylibs-js-org/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Speed Blazing](https://img.shields.io/badge/speed-blazing%20%F0%9F%94%A5-brightgreen.svg)](https://twitter.com/acdlite/status/974390255393505280)

[![Latest Version](https://img.shields.io/npm/v/fast-defer)](https://www.npmjs.com/package/fast-defer)
[![Downloads](https://img.shields.io/npm/dw/fast-defer)](https://www.npmjs.com/package/fast-defer)
[![JsDelivr](https://data.jsdelivr.com/v1/package/npm/fast-defer/badge?style=rounded)](https://www.jsdelivr.com/package/npm/fast-defer)
[![Bundlephobia](https://img.shields.io/bundlephobia/minzip/fast-defer/latest?style=flat)](https://bundlephobia.com/package/fast-defer@latest)
[![Packagephobia](https://packagephobia.com/badge?p=fast-defer@latest)](https://packagephobia.com/result?p=fast-defer@latest)

<br />

<div align="center">
  <pre>
  <h1>🏃<br />Fast Defer</h1>
  </pre>
  <br />
</div>

<h3 align="center">
  <code>Fast Defer</code> is a fast and minimal deferred implementation for javascript.
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
- [Browser Compatibility](#browser-compatibility)
- [License](#license)

<br />

## Installing

### Node

```sh
npm install fast-defer # or yarn add fast-defer
```

```js
const { deferred } = require('fast-defer');
import { deferred } from 'fast-defer';
```

### Browser

```html
<script
  crossorigin
  src="https://cdn.jsdelivr.net/npm/fast-defer@latest/dist/index.umd.js"
></script>
```

```js
const { deferred } = window.fastDefer;
```

### Url Import

```ts
import { deferred } from 'https://cdn.skypack.dev/fast-defer@latest';
```

<br />

## Getting Started

A deferred is nothing more than a promise with `.resolve()` and a `.reject()` method. You
can use it to create a promise that will be resolved or rejected at some point in the
future and, probably, in another scope.

```js
import { deferred, isDeferred } from 'fast-defer';

const waitingSomething = deferred();

waitingSomething.then((val) => {
  console.log('Resolved');
});

waitingSomething.catch((error) => {
  console.log('Rejected');
});

// Other file, function or etc
someCallback((response, error) => {
  if (error) {
    waitingSomething.reject(error);
  } else {
    waitingSomething.resolve(response);
  }
});
```

<br />

## Browser Compatibility

|                                                                                                                                         | Chrome | Edge | Firefox | Internet Explorer | Opera | Safari | Node.js | Deno | WebView Android | Chrome Android | Firefox for Android | Opera Android | Safari on iOS | Samsung Internet |
| --------------------------------------------------------------------------------------------------------------------------------------- | ------ | ---- | ------- | ----------------- | ----- | ------ | ------- | ---- | --------------- | -------------- | ------------------- | ------------- | ------------- | ---------------- |
| [Promise() constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise#browser_compatibility) | 32     | 12   | 29\*    | X                 | 19    | 8      | 0.12    | 1.0  | 4.4.3           | 32             | 29\*                | 19            | 8\*           | 2.0              |
| [Symbol() constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol#browser_compatibility)   | 38     | 12   | 36      | X                 | 25    | 9      | 0.12    | 1.0  | 38              | 38             | 36                  | 25            | 9             | 3.0              |

<br />

## License

Licensed under the **MIT**. See [`LICENSE`](LICENSE) for more informations.

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Farthurfiorette%2Ftinylibs.svg?type=small)](https://app.fossa.com/projects/git%2Bgithub.com%2Farthurfiorette%2Ftinylibs?ref=badge_small)

<br />
