# WIKIPEDIA [![build](https://github.com/dopecodez/Wikipedia/workflows/build/badge.svg)](https://github.com/dopecodez/Wikipedia/actions) [![Test Coverage](https://api.codeclimate.com/v1/badges/a44c826dbef8c7f5ea45/test_coverage)](https://codeclimate.com/github/dopecodez/Wikipedia/test_coverage) [![Contributions](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dopecodez/Wikipedia/issues) [![npm version](https://badge.fury.io/js/wikipedia.svg)](https://badge.fury.io/js/wikipedia)

Wikipedia for node. Works in the browser as well.

Implements [legacy](https://www.mediawiki.org/wiki/API:Main_page) wiki endpoints and also the newer 
[REST API](https://en.wikipedia.org/api/rest_v1/#/).

Try out the new [`summary()`][9] REST endpoint for a introduction to your page and the main images optimized for browsers and mobile!

You can also now get the events which happened on a particular day using the [`onThisDay()`][8] api, which supports filtering by [event types][7] as well.

Built with latest ES6 and native support for async/await and promises.

Built with TypeScript - exports all the types used.

# INSTALLATION

```
$ npm install wikipedia
```

## Highlights

- [What can it do](#what-can-it-do)
- [Usage](#Usage)
- [Options](#Options)
- [Result Types](#result-types)
- [Contributing](#contributing)

For detailed documentation of methods available on `wiki` and `page`,
- [wiki][4]
- [Page][2]

## What can it do?

- Get a summary for a page which contains the intro and main image optimized for web and mobile with the new wikipedia [REST APIs](https://en.wikipedia.org/api/rest_v1/#/)
- Fetch article content
- Find all links/images/categories in a page
- Gets all the relevant events that happened on a particular day. You can further filter this by [event type][7]
- Find related articles from the given article
- Find articles by geographical location
- Get a wikipedia page as a pdf document
- Supports switching languages
- Parses infoboxes using [infobox-parser](https://github.com/dijs/infobox-parser)

## Usage

```js
const wiki = require('wikipedia');

(async () => {
	try {
		const page = await wiki.page('Batman');
		console.log(page);
		//Response of type @Page object
		const summary = await page.summary();
		console.log(summary);
		//Response of type @wikiSummary - contains the intro and the main image
	} catch (error) {
		console.log(error);
		//=> Typeof wikiError
	}
})();
```
The page method returns a [Page][2] class object which has fields like `pageid`, `title`, `parentid`, `revisionid` and methods like `summary()`, `intro()`, `images()`, `html()` and more.

All the page methods can take a title parameter or a pageId. Read up on the [Page documentation][2] here to see a detailed overview of the methods available in page.

You can also call methods like `summary()` on the `wiki` object directly. [Read up here][3] to see when you should use the `page` object and when you should call `summary()` directly. There's a performance difference! Long story short, use the method directly if you are using only the `summary` of the page and are not expecting to use any of the other `page` attributes.

```js
const wiki = require('wikipedia');

(async () => {
	try {
		const summary = await wiki.summary('Batman');
		console.log(summary);
		//Response of type @wikiSummary - contains the intro and the main image
	} catch (error) {
		console.log(error);
		//=> Typeof wikiError
	}
})();
```
You can now get the events which happened on a particular day using the new `onThisDay()` api on the wiki object.

```js
const wiki = require('wikipedia');

(async () => {
	try {
		const events = await wiki.onThisDay();
		const deaths = await wiki.onThisDay({type:'deaths', month:'2', day:'28'});
		console.log(events); // returns all the events which happened today
		console.log(deaths); // returns all deaths which happened on Feb 28
	} catch (error) {
		console.log(error);
		//=> Typeof wikiError
	}
})();
```

There are other methods like `search()`, `geoSearch()`, `suggest()`, `setLang()`, `setUserAgent()` which should be called on the wiki object directly. Read up on the [wiki documentation][4] to see a complete list of methods available on the wiki default object.

```js
const wiki = require('wikipedia');

(async () => {
	try {
		const searchResults = await wiki.search('Batma');
		console.log(searchResults);
		//Response of type @wikiSearchResult - contains results and optionally a suggestion
		const newUrl = await wiki.setLang('fr');
		console.log(newUrl);
		//Returns the api url with language changed - use `languages()` method to see a list of available langs
	} catch (error) {
		console.log(error);
		//=> Typeof wikiError
	}
})();
```

You can export types or even specific methods if you are using modern ES6 js or TypeScript.
```js
import wiki from 'wikipedia';
import { wikiSummary, summaryError } from 'wikipedia';
import { summary } from 'wikipedia';

(async () => {
	try {
        let summary: wikiSummary; //sets the object as type wikiSummary
		summary = await wiki.summary('Batman');
		console.log(summary);
        let summary2 = await summary('Batman');//using summary directly
	} catch (error) {
		console.log(error);
		//=> Typeof summaryError, helpful in case you want to handle this error separately
	}
})();
```

## Options

All methods have options you can pass them. You can find them in [optionTypes documentation][5].

## Result Types

All the returned result types are documented as well. You can find them [here][6].

## Contributing

Before opening a pull request please make sure your changes follow the [contribution guidelines][1].


## Contributors

The project would not be the way it is without these rockstars.

<!-- readme: contributors -start -->
<table>
<tr>
    <td align="center">
        <a href="https://github.com/dopecodez">
            <img src="https://avatars.githubusercontent.com/u/34269105?v=4" width="100;" alt="dopecodez"/>
            <br />
            <sub><b>Govind S</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/friendofdog">
            <img src="https://avatars.githubusercontent.com/u/8337121?v=4" width="100;" alt="friendofdog"/>
            <br />
            <sub><b>Kevin Kee</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/bumbummen99">
            <img src="https://avatars.githubusercontent.com/u/4533331?v=4" width="100;" alt="bumbummen99"/>
            <br />
            <sub><b>Patrick</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/gtibrett">
            <img src="https://avatars.githubusercontent.com/u/47423?v=4" width="100;" alt="gtibrett"/>
            <br />
            <sub><b>Brett</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/0xflotus">
            <img src="https://avatars.githubusercontent.com/u/26602940?v=4" width="100;" alt="0xflotus"/>
            <br />
            <sub><b>0xflotus</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/Greeshmareji">
            <img src="https://avatars.githubusercontent.com/u/57181018?v=4" width="100;" alt="Greeshmareji"/>
            <br />
            <sub><b>Greeshma R</b></sub>
        </a>
    </td></tr>
<tr>
    <td align="center">
        <a href="https://github.com/zactopus">
            <img src="https://avatars.githubusercontent.com/u/2591901?v=4" width="100;" alt="zactopus"/>
            <br />
            <sub><b>Zac [they/them]</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/bigmistqke">
            <img src="https://avatars.githubusercontent.com/u/10504064?v=4" width="100;" alt="bigmistqke"/>
            <br />
            <sub><b>Bigmistqke</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/yg-i">
            <img src="https://avatars.githubusercontent.com/u/148152939?v=4" width="100;" alt="yg-i"/>
            <br />
            <sub><b>Null</b></sub>
        </a>
    </td></tr>
</table>
<!-- readme: contributors -end -->

[1]: https://github.com/dopecodez/wikipedia/blob/master/CONTRIBUTING.md
[2]: https://github.com/dopecodez/wikipedia/blob/master/docs/PAGE.md
[3]: https://github.com/dopecodez/wikipedia/blob/master/docs/USAGE.md#when-to-use-page
[4]: https://github.com/dopecodez/wikipedia/blob/master/docs/wiki.md
[5]: https://github.com/dopecodez/wikipedia/blob/master/docs/optionTypes.md
[6]: https://github.com/dopecodez/wikipedia/blob/master/docs/resultTypes.md
[7]: https://github.com/dopecodez/wikipedia/blob/master/docs/optionTypes.md#eventOptions
[8]: https://github.com/dopecodez/wikipedia/blob/master/docs/wiki.md#onThisDay
[9]: https://github.com/dopecodez/wikipedia/blob/master/docs/PAGE.md#summary
