module.exports = async _0x2121d6 => {
  const {
    client: _0x111dc9,
    m: _0x32b996,
    text: _0x106ca6
  } = _0x2121d6;
  const _0x10e895 = require("yt-search");
  const _0x372f70 = require("node-fetch");
  try {
    if (!_0x106ca6 || _0x106ca6.trim().length === 0) {
      return _0x32b996.reply("What song do you want to download?");
    }
    const _0x519914 = await _0x10e895(_0x106ca6);
    if (_0x519914 && _0x519914.videos.length > 0) {
      const _0x579137 = _0x519914.videos[0];
      const _0x4cfdb5 = _0x579137.url;
      const _0x14c1d9 = _0x32b996.chat;
      const _0x383465 = await _0x372f70("https://apis.ibrahimadams.us.kg/api/download/ytmp4?url=" + encodeURIComponent(_0x4cfdb5) + "&apikey=cracker");
      const _0x4a9fa5 = await _0x383465.json();
      if (_0x4a9fa5.status === 200 && _0x4a9fa5.success) {
        const _0x221bd9 = _0x4a9fa5.result.download_url;
        await _0x111dc9.sendMessage(_0x14c1d9, {
          'text': "*Downloading...*"
        }, {
          'quoted': _0x32b996
        });
        const _0xbe0786 = {
          'image': {
            'url': _0x579137.thumbnail
          },
          'caption': "*KEITH-MD VIDEO PLAYER*\n\n╭───────────────◆\n│ *Title:* " + _0x4a9fa5.result.title + "\n│ *Duration:* " + _0x579137.timestamp + "\n│ *Artist:* " + _0x579137.author.name + "\n╰────────────────◆"
        };
        await _0x111dc9.sendMessage(_0x14c1d9, _0xbe0786, {
          'quoted': _0x32b996
        });
        await _0x111dc9.sendMessage(_0x14c1d9, {
          'video': {
            'url': _0x221bd9
          },
          'mimetype': "video/mp4"
        }, {
          'quoted': _0x32b996
        });
        await _0x111dc9.sendMessage(_0x14c1d9, {
          'document': {
            'url': _0x221bd9
          },
          'mimetype': "video/mp4"
        }, {
          'quoted': _0x32b996
        });
        await _0x32b996.reply('*' + _0x4a9fa5.result.title + "*\n\n*Downloaded successfully. Keep using Keith MD*");
      } else {
        _0x32b996.reply("Failed to retrieve download URL.");
      }
    } else {
      _0x32b996.reply("No video found for the specified query.");
    }
  } catch (_0x218bac) {
    _0x32b996.reply("Download failed\n" + _0x218bac);
  }
};
