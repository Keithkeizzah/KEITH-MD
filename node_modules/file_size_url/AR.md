# file_size_url

[![NPM version](https://img.shields.io/npm/v/file_size_url.svg?style=flat)](https://www.npmjs.com/package/file_size_url)
[![NPM monthly downloads](https://img.shields.io/npm/dm/file_size_url.svg?style=flat)](https://npmjs.org/package/file_size_url)
[![NPM total downloads](https://img.shields.io/npm/dt/file_size_url.svg?style=flat)](https://npmjs.org/package/file_size_url)

`file_size_url` هي مكتبة بسيطة في Node.js لجلب حجم ملف من عنوان URL محدد باستخدام بروتوكولات `HTTP` أو `HTTPS`. تُرجع المكتبة حجم الملف بتنسيق سهل القراءة مثل "1.23 MB".

**بدون تبعيات.**

## التثبيت

يمكنك تثبيت المكتبة عبر npm:

```bash
npm install file_size_url
```

بدلاً من ذلك، إذا كنت تمتلك الشيفرة المصدرية، يمكنك استخدام الدالة مباشرة في مشروع Node.js الخاص بك:

```bash
# ببساطة انسخ ملف الشيفرة المصدرية إلى مجلد المشروع الخاص بك
```

## الاستخدام

### الاستيراد واستخدام المكتبة

```javascript
import fileSizeUrl from 'file_size_url';

fileSizeUrl("https://example.com/file.zip")
  .then(size => console.log(`حجم الملف: ${size}`))
  .catch(error => console.error(`خطأ: ${error.message}`));
```

### مثال مع `telegraf` (بوت Telegram)

يمكنك دمج `file_size_url` مع `telegraf` لجلب وعرض أحجام الملفات في بوت Telegram الخاص بك:

```javascript
import { Telegraf } from 'telegraf';
import fileSizeUrl from 'file_size_url';

const bot = new Telegraf('<YOUR_BOT_TOKEN>');

bot.command('filesize', async (ctx) => {
  const url = ctx.message.text.split(' ')[1];
  if (!url) return ctx.reply('يرجى توفير عنوان URL.');

  try {
    const size = await fileSizeUrl(url);
    ctx.reply(`حجم الملف: ${size}`);
  } catch (error) {
    ctx.reply(`خطأ: ${error.message}`);
  }
});

bot.launch();
```

### مثال مع `express.js`

يمكنك استخدام `file_size_url` في خادم `express.js` للحصول على أحجام الملفات عبر API:

```javascript
import express from 'express';
import fileSizeUrl from 'file_size_url';

const app = express();

app.get('/filesize', (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).send('معامل URL مطلوب');

  fileSizeUrl(url)
    .then(size => res.send(`حجم الملف: ${size}`))
    .catch(error => res.status(500).send(`خطأ: ${error.message}`));
});

app.listen(3000, () => {
  console.log('الخادم يعمل على المنفذ 3000');
});
```

### استخدام `file_size_url` في حلقة

يمكنك استخدام `file_size_url` داخل حلقة لجلب أحجام الملفات من عناوين URL متعددة:

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
    console.log(`حجم الملف لـ ${url}: ${size}`);
  } catch (error) {
    console.error(`خطأ في جلب الحجم لـ ${url}: ${error.message}`);
  }
});
```

### استخدام `file_size_url` مع `Promise.all`

جلب أحجام الملفات بشكل متزامن لعدة عناوين URL باستخدام `Promise.all`:

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
      console.log(`حجم الملف لـ ${urls[index]}: ${size}`);
    });
  })
  .catch(error => console.error(`خطأ: ${error.message}`));
```

## مرجع API

### `fileSizeUrl(url)`

جلب حجم الملف من عنوان URL المحدد.

#### المعاملات

- **url** (`string`): عنوان URL للملف.

#### القيمة المعادة

- **Promise<string>**: يُرجع Promise يحتوي على حجم الملف بتنسيق مُنسق (مثل "1.23 MB"). إذا حدث خطأ، يتم رفض الـ Promise برسالة خطأ.

#### مثال

```javascript
fileSizeUrl("https://example.com/file.zip")
  .then(size => console.log(`حجم الملف: ${size}`))
  .catch(error => console.error(`خطأ: ${error.message}`));
```

### التعامل مع الأخطاء

- `Invalid URL`: إذا كان عنوان URL غير صالح أو مفقود.
- `The address should be http or https`: إذا كان البروتوكول غير مدعوم.
- `Failed to get file size, status code: <statusCode>`: إذا لم يكن رمز الحالة HTTP هو 200.
- `Couldn't retrieve file size from headers`: إذا كانت ترويسة `content-length` مفقودة أو غير صالحة.

### `formatBytes(bytes)`

تنسيق البايتات إلى سلسلة سهلة القراءة.

#### المعاملات

- **bytes** (`number`): عدد البايتات.

#### القيمة المعادة

- **string**: سلسلة الحجم المُنسق (مثل "1.23 MB").

#### مثال

```javascript
console.log(formatBytes(12345678)); // الناتج: "11.77 MB"
```

## ملاحظات

- تأكد من أن عنوان URL يبدأ بـ `http://` أو `https://`.
- المكتبة مصممة للعمل فقط في بيئات Node.js التي تدعم الوحدات الأصلية `http` و`https`.

## الترخيص

تتوفر هذه المكتبة تحت [رخصة MIT](https://opensource.org/licenses/MIT).

---

[English Documentation](/README.md)