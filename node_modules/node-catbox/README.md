<p align="center">
	<table>
		<tbody>
			<td align="center">
				<h1>node-catbox</h1>
				<p>A library for interacting with Catbox.moe written in TypeScript with no dependencies.</p>
				<p>
					<a href="https://www.npmjs.com/package/node-catbox"><img src="https://img.shields.io/npm/v/node-catbox?color=crimson&label=node-catbox&logo=npm"></a>
					<a href="https://www.npmjs.com/package/node-catbox"><img src="https://img.shields.io/npm/dt/node-catbox?color=crimson&logo=npm"></a>
					<a href="https://www.npmjs.com/package/node-catbox"><img src="https://img.shields.io/librariesio/release/npm/node-catbox?color=crimson&logo=npm"></a>
				</p>
				<p>
					<a href="https://github.com/depthbomb/node-catbox/releases/latest"><img src="https://img.shields.io/github/release-date/depthbomb/node-catbox.svg?label=Released&logo=github"></a>
					<a href="https://github.com/depthbomb/node-catbox/releases/latest"><img src="https://img.shields.io/github/release/depthbomb/node-catbox.svg?label=Stable&logo=github"></a>
					<a href="https://github.com/depthbomb/node-catbox"><img src="https://img.shields.io/github/repo-size/depthbomb/node-catbox.svg?label=Repo%20Size&logo=github"></a>
				</p>
				<img width="2000" height="0">
			</td>
		</tbody>
	</table>
</p>

This library aims to be a sort of successor to [https://www.npmjs.com/package/catbox.moe](https://www.npmjs.com/package/catbox.moe).

# Requirements

- \>= Node.js 19

# Installation

```sh
npm i node-catbox

# or

yarn add node-catbox
```

# Usage

### Uploading to Catbox

```ts
import { Catbox } from 'node-catbox';

const catbox = new Catbox();

try {
	const response = await catbox.uploadFile({
		path: '/path/to/my/file.ext'
	});
	// or to upload from direct file URL
	const response = await catbox.uploadURL({
		url: 'https://i.imgur.com/8rR6IZn.png'
	});

	console.log(response); // -> https://files.catbox.moe/XXXXX.ext
} catch (err) {
	console.error(err); // -> error message from server
}
```

### User Hash

Some operations require your account's user hash which can be set on instantiation with
```ts
const catbox = new Catbox('098f6bcd4621d373cade4e832');
```
... or later with
```ts
const catbox = new Catbox();

const catbox.setUserHash('098f6bcd4621d373cade4e832');
```

### Deleting Files

```ts
import { Catbox } from 'node-catbox';

// user hash required
const catbox = new Catbox('098f6bcd4621d373cade4e832');

await catbox.deleteFiles({
	files: ['XXXXX.ext']
});
```

### Creating an album

```ts
import { Catbox } from 'node-catbox';

// user hash only required if you plan to edit or delete the album later
const catbox = new Catbox('098f6bcd4621d373cade4e832');

const albumURL = await catbox.createAlbum({
	title: 'album title',
	description: 'album description', // optional
	files: ['XXXXX.ext'] // optional
});
```

### Editing an album

```ts
import { Catbox } from 'node-catbox';

// user hash required
const catbox = new Catbox('098f6bcd4621d373cade4e832');

await catbox.editAlbum({
	id: 'YYYYY',
	title: 'new title',
	description: 'new description', // optional
	files:  ['WWWWW.ext', 'VVVVV.ext'] // optional
});
```

> **Warning**
> This is a potentially destructive method where values are applied to the album directly. Consider using the method below if you are only adding/removing files from an album.

### Adding and removing files from an album

```ts
import { Catbox } from 'node-catbox';

// user hash required
const catbox = new Catbox('098f6bcd4621d373cade4e832');

await catbox.addFilesToAlbum({
	id: 'YYYYY',
	files: ['ZZZZZ.ext']
});
await catbox.removeFilesFromAlbum({
	id: 'YYYYY',
	files: ['ZZZZZ.ext']
});
```

### Deleting an album

```ts
import { Catbox } from 'node-catbox';

// user hash required
const catbox = new Catbox('098f6bcd4621d373cade4e832');

await catbox.deleteAlbum({
	id: 'YYYYY'
});
```

### Uploading to Litterbox

```ts
import { Litterbox } from 'node-catbox';

const litterbox = new Litterbox();

await litterbox.upload({
	path: '/path/to/my/file.ext',
	duration: '12h' // or omit to default to 1h
});
```

# Logging requests

As of 3.2.0, `node:diagnostics_channel` may be utilized to retrieve the request info that is sent to the API. The example below shows how to log the request info:

```ts
import { subscribe } from 'diagnostics_channel';
import { kCatboxRequestCreate } from 'node-catbox';
// kLitterboxRequestCreate is also available

subscribe(kCatboxRequestCreate, (data: any) => {
	const request: RequestInit = data.request;

	console.log(request);
});
```

# Testing

Before you test the library you need to provide your Catbox account's user hash. Create a `.env` file in the project root and set the `USER_HASH` value to your account's user hash.
