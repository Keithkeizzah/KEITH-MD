module.exports = async _0x4d2435 => {
  const {
    client: _0x4d8115,
    m: _0x2e81f7,
    text: _0x3b1599,
    mime: _0x5567ea,
    uploadtoimgur: _0xaa24e9
  } = _0x4d2435;
  const {
    GoogleGenerativeAI: _0x817910
  } = require("@google/generative-ai");
  const _0xc0423b = require("axios");
  try {
    if (!_0x2e81f7.quoted) {
      return _0x2e81f7.reply("Send the image then tag it with the instruction.");
    }
    if (!_0x3b1599) {
      return _0x2e81f7.reply("Provide some instruction. This vision AI is powered by gemini-pro-vision.");
    }
    if (!/image/.test(_0x5567ea)) {
      return _0x2e81f7.reply("That is not an image, try again while quoting an actual image.");
    }
    let _0x3439a2 = await _0x4d8115.downloadAndSaveMediaMessage(_0x2e81f7.quoted);
    let _0x3dfb7c = await _0xaa24e9(_0x3439a2);
    _0x2e81f7.reply("A moment, keith is analyzing contents of the image. . .");
    const _0x4e9e6a = new _0x817910("AIzaSyCcZqDMBa8FcAdBxqE1o6YYvzlygmpBx14");
    async function _0x309a3c(_0x1400ed, _0x1a081e) {
      const _0x53e4b2 = {
        responseType: "arraybuffer"
      };
      const _0x1175d9 = await _0xc0423b.get(_0x1400ed, _0x53e4b2);
      const _0x2a4862 = Buffer.from(_0x1175d9.data).toString("base64");
      const _0x2f6e31 = {
        data: _0x2a4862,
        mimeType: _0x1a081e
      };
      const _0x14b65d = {
        inlineData: _0x2f6e31
      };
      return _0x14b65d;
    }
    const _0x22a6bb = {
      model: "gemini-1.5-flash"
    };
    const _0x42849d = _0x4e9e6a.getGenerativeModel(_0x22a6bb);
    const _0x2c743f = [await _0x309a3c(_0x3dfb7c, "image/jpeg")];
    const _0xcf53e3 = await _0x42849d.generateContent([_0x3b1599, ..._0x2c743f]);
    const _0x195f9c = await _0xcf53e3.response;
    const _0x3db5a3 = _0x195f9c.text();
    await _0x2e81f7.reply(_0x3db5a3);
  } catch (_0x4b3921) {
    _0x2e81f7.reply("I am unable to analyze images at the moment\n" + _0x4b3921);
  }
};
