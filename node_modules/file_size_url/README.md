# file_size_url

[![NPM version](https://img.shields.io/npm/v/file_size_url.svg?style=flat)](https://www.npmjs.com/package/file_size_url)

 [![NPM monthly downloads](https://img.shields.io/npm/dm/file_size_url.svg?style=flat)](https://npmjs.org/package/file_size_url) 
 
 [![NPM total downloads](https://img.shields.io/npm/dt/file_size_url.svg?style=flat)](https://npmjs.org/package/file_size_url) 
 

`file_size_url` is a simple Node.js library for fetching the size of a file from a given URL using either `HTTP` or `HTTPS` protocols. It returns the file size in a human-readable format such as "1.23 MB".

**0 dependencies.**

## Installation

You can install the library via npm:

```bash
npm install file_size_url
```

Alternatively, if you have the source code, you can directly use the function in your Node.js project:

```bash
# Simply copy the source code file to your project directory
```

## Usage

### Importing and Using the Library

```javascript
import fileSizeUrl from 'file_size_url';

fileSizeUrl("https://example.com/file.zip")
  .then(size => console.log(`File size: ${size}`))
  .catch(error => console.error(`Error: ${error.message}`));
```

### Example with `telegraf` (Telegram Bot)

You can integrate `file_size_url` with `telegraf` to fetch and display file sizes in your Telegram bot:

```javascript
import { Telegraf } from 'telegraf';
import fileSizeUrl from 'file_size_url';

const bot = new Telegraf('<YOUR_BOT_TOKEN>');

bot.command('filesize', async (ctx) => {
  const url = ctx.message.text.split(' ')[1];
  if (!url) return ctx.reply('Please provide a URL.');

  try {
    const size = await fileSizeUrl(url);
    ctx.reply(`File size: ${size}`);
  } catch (error) {
    ctx.reply(`Error: ${error.message}`);
  }
});

bot.launch();
```

### Example with `express.js`

You can use `file_size_url` in an `express.js` server to get file sizes via an API:

```javascript
import express from 'express';
import fileSizeUrl from 'file_size_url';

const app = express();

app.get('/filesize', (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).send('URL parameter is required');

  fileSizeUrl(url)
    .then(size => res.send(`File size: ${size}`))
    .catch(error => res.status(500).send(`Error: ${error.message}`));
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

### Using `file_size_url` in a Loop

You can easily use `file_size_url` inside a loop to fetch file sizes from multiple URLs:

```javascript
import fileSizeUrl from './file_size_url.js';

const urls = [
  'https://example.com/file1.zip',
  'https://example.com/file2.zip',
  'https://example.com/file3.zip'
];

urls.forEach(async (url) => {
  try {
    const size = await fileSizeUrl(url);
    console.log(`File size for ${url}: ${size}`);
  } catch (error) {
    console.error(`Error fetching size for ${url}: ${error.message}`);
  }
});
```

### Using `file_size_url` with `Promise.all`

Fetch file sizes concurrently for multiple URLs using `Promise.all`:

```javascript
import fileSizeUrl from './file_size_url.js';

const urls = [
  'https://example.com/file1.zip',
  'https://example.com/file2.zip',
  'https://example.com/file3.zip'
];

Promise.all(urls.map(url => fileSizeUrl(url)))
  .then(sizes => {
    sizes.forEach((size, index) => {
      console.log(`File size for ${urls[index]}: ${size}`);
    });
  })
  .catch(error => console.error(`Error: ${error.message}`));
```

## API Reference

### `fileSizeUrl(url)`

Fetches the file size from a given URL.

#### Parameters

- **url** (`string`): The URL of the file.

#### Returns

- **Promise<string>**: Resolves with the file size as a formatted string (e.g., "1.23 MB"). If an error occurs, the promise is rejected with an error message.

#### Example

```javascript
fileSizeUrl("https://example.com/file.zip")
  .then(size => console.log(`File size: ${size}`))
  .catch(error => console.error(`Error: ${error.message}`));
```

### Error Handling

- `Invalid URL`: If the URL is invalid or missing.
- `The address should be http or https`: If the protocol is not supported.
- `Failed to get file size, status code: <statusCode>`: If the HTTP status code is not 200.
- `Couldn't retrieve file size from headers`: If the `content-length` header is missing or invalid.

### `formatBytes(bytes)`

Formats bytes into a human-readable string.

#### Parameters

- **bytes** (`number`): The number of bytes.

#### Returns

- **string**: The formatted size string (e.g., "1.23 MB").

#### Example

```javascript
console.log(formatBytes(12345678)); // Output: "11.77 MB"
```

## Notes

- Make sure the URL starts with `http://` or `https://`.
- The library is designed to work only in Node.js environments that support the native `http` and `https` modules.

## License

This library is available under the [MIT License](https://opensource.org/licenses/MIT).

---

[Arabic Documentation](/AR.md)