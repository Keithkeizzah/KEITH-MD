[![NPM Version](https://img.shields.io/npm/v/infobox-parser.svg)](https://www.npmjs.com/package/infobox-parser)
[![Build Status](https://travis-ci.org/dijs/infobox-parser.svg)](https://travis-ci.org/dijs/infobox-parser)

<a href="https://www.buymeacoffee.com/2tmRKi9" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-yellow.png" alt="Buy Me A Coffee" height="41" width="174"></a>

## Infobox Parser

This was originally written as a companion module for `wikijs`. But it can work great on it's own as well. The main function of this module is parsing wikipedia article's infobox data. The infobox source is in wikitext format and
difficult to parse. This module analyzes it and outputs JSON for you.

### Usage

```js
var parseInfo = require("infobox-parser")

parseInfo(`
{{Infobox Batman
|name      = Bruce Wayne
|hero      = y
}}`);
// Outputs {
	general: {
		hero: true,
		name: 'Bruce Wayne'
	}
}
```

### Parsing Options

```js
/**
 * Parse Wiki Infobox Text
 * @param {string} source - Infobox source text
 * @param {Object} options - Parsing options
 * @param {boolean} [options.simplifyDataValues=true] - Only use primary data values
 * @param {boolean} [options.removeSmall=false] - Remove <small>...</small> chunks of source data
 * @param {boolean} [options.removeReferences=true] - Remove <ref>...</ref> chunks of source data
 * @returns {Object} Structured information from source text
 */
const info = parseInfo(source, options);
```

### Support

It supports many of wikipedia features, but not all yet. If there is a feature you need it to support, but it does not. Please create an issue and I will add the functionality.
