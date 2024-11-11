module.exports = async _0x14aada => {
  const {
    client: _0x3854a1,
    m: _0x55033a,
    text: _0x3d2959
  } = _0x14aada;
  const _0x2baa53 = require("yt-search");
  const _0x431780 = require("node-fetch");
  try {
    if (!_0x3d2959 || _0x3d2959.trim().length === 0) {
      return _0x55033a.reply("What song do you want to download?");
    }
    const _0x2278d0 = await _0x2baa53(_0x3d2959);
    if (_0x2278d0 && _0x2278d0.videos.length > 0) {
      const _0x171358 = _0x2278d0.videos[0];
      const _0x5d09c4 = _0x171358.url;
      const _0x1f3417 = _0x55033a.chat;
      const _0x56ef60 = await _0x431780("https://apis.ibrahimadams.us.kg/api/download/ytmp3?url=" + encodeURIComponent(_0x5d09c4) + "&apikey=cracker");
      const _0x8f5207 = await _0x56ef60.json();
      if (_0x8f5207.status === 200 && _0x8f5207.success) {
        const _0x582d12 = _0x8f5207.result.download_url;
        await _0x3854a1.sendMessage(_0x1f3417, {
          'text': "*Downloading...*"
        }, {
          'quoted': _0x55033a
        });
        const _0x4baf32 = {
          'image': {
            'url': _0x171358.thumbnail
          },
          'caption': "*KEITH-MD AUDIO PLAYER*\n\n╭───────────────◆\n│ *Title:* " + _0x8f5207.result.title + "\n│ *Duration:* " + _0x171358.timestamp + "\n│ *Artist:* " + _0x171358.author.name + "\n╰────────────────◆"
        };
        await _0x3854a1.sendMessage(_0x1f3417, _0x4baf32, {
          'quoted': _0x55033a
        });
        await _0x3854a1.sendMessage(_0x1f3417, {
          'audio': {
            'url': _0x582d12
          },
          'mimetype': "audio/mp3"
        }, {
          'quoted': _0x55033a
        });
        await _0x3854a1.sendMessage(_0x1f3417, {
          'document': {
            'url': _0x582d12
          },
          'mimetype': "audio/mp3",
          'fileName': _0x8f5207.result.title + ".mp3"
        }, {
          'quoted': _0x55033a
        });
        await _0x55033a.reply('*' + _0x8f5207.result.title + "*\n\n*Downloaded successfully. Keep using Keith MD*");
      } else {
        _0x55033a.reply("Failed to download audio. Please try again later.");
      }
    } else {
      _0x55033a.reply("No audio found.");
    }
  } catch (_0x4a1ad5) {
    _0x55033a.reply("Download failed\n" + _0x4a1ad5);
  }
};
