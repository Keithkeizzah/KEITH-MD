<br />

[![Issues](https://img.shields.io/github/issues/arthurfiorette/tinylibs?logo=github&label=Issues)](https://github.com/arthurfiorette/tinylibs/issues)
[![Stars](https://img.shields.io/github/stars/arthurfiorette/tinylibs?logo=github&label=Stars)](https://github.com/arthurfiorette/tinylibs/stargazers)
[![License](https://img.shields.io/github/license/arthurfiorette/tinylibs?logo=githu&label=License)](https://github.com/arthurfiorette/tinylibs/blob/main/LICENSE)
[![Codecov](https://codecov.io/gh/arthurfiorette/tinylibs/branch/main/graph/badge.svg?token=ML0KGCU0VM)](https://codecov.io/gh/arthurfiorette/tinylibs)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Farthurfiorette%2Ftinylibs.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Farthurfiorette%2Ftinylibs?ref=badge_shield)
[![Join the chat at https://gitter.im/tinylibs-js-org/community](https://badges.gitter.im/tinylibs-js-org/community.svg)](https://gitter.im/tinylibs-js-org/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Speed Blazing](https://img.shields.io/badge/speed-blazing%20%F0%9F%94%A5-brightgreen.svg)](https://twitter.com/acdlite/status/974390255393505280)

[![Latest Version](https://img.shields.io/npm/v/cache-parser)](https://www.npmjs.com/package/cache-parser)
[![Downloads](https://img.shields.io/npm/dw/cache-parser)](https://www.npmjs.com/package/cache-parser)
[![JsDelivr](https://data.jsdelivr.com/v1/package/npm/cache-parser/badge?style=rounded)](https://www.jsdelivr.com/package/npm/cache-parser)
[![Bundlephobia](https://img.shields.io/bundlephobia/minzip/cache-parser/latest?style=flat)](https://bundlephobia.com/package/cache-parser@latest)
[![Packagephobia](https://packagephobia.com/badge?p=cache-parser@latest)](https://packagephobia.com/result?p=cache-parser@latest)

<br />

<div align="center">
  <pre>
  <h1>⌛<br />Cache Parser</h1>
  </pre>
  <br />
</div>

<h3 align="center">
  <code>Cache Parser</code> is a minimal parser for the <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control" target="_blank">Cache-Control</a> header.
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
  - [Usage](#usage)
- [License](#license)

<br />

## Installing

### Node

```sh
npm install cache-parser # or yarn add cache-parser
```

```js
const { parse, tokenize } = require('cache-parser');
import { parse, tokenize } from 'cache-parser';
```

### Browser

```html
<script
  crossorigin
  src="https://cdn.jsdelivr.net/npm/cache-parser@latest/dist/index.umd.js"
></script>
```

```js
const { parse, tokenize } = window.cacheParser;
```

### Url Import

```ts
import { parse, tokenize } from 'https://cdn.skypack.dev/cache-parser@latest';
```

<br />

## Getting Started

This package is a parser and builder for all Cache-Control directives. You can parse a
string with [`parse()`](./src/parse.ts) and build a http ready header with
[`tokenize()`](./src/tokenize.ts).

All needed documentation is available in form of `TSDoc` comments.

### Usage

```ts
import { parse, CacheControl } from 'cache-parser';

const rawHeader = 'public, max-age=3600';

const {
  public, // true
  maxAge, // 3600
  immutable // undefined
} = parse(rawHeader);

const cacheProperties: CacheControl = { public: true, maxAge: 3600 };

// ['public', 'max-age=3600']
const cacheTokens = tokenize(cacheProperties);

// 'public, max-age=3600'
const httpHeader = tokens.join(', ');
```

<br />

## License

Licensed under the **MIT**. See [`LICENSE`](LICENSE) for more informations.

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Farthurfiorette%2Ftinylibs.svg?type=small)](https://app.fossa.com/projects/git%2Bgithub.com%2Farthurfiorette%2Ftinylibs?ref=badge_small)

<br />
