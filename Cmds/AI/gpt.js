
module.exports = async _0x4324a8 => {
  const {
    client: _0x5bff52,
    m: _0x42e175,
    text: _0x53c00c
  } = _0x4324a8;
  if (!_0x53c00c) {
    return _0x42e175.reply("Provide some text to chat with AI");
  }
  const _0x8071e = _0x42e175.sender.split('@')[0];
  const _0x246fcc = "https://itzpire.com/ai/gpt-logic?q=" + _0x53c00c + "&logic=bot&chat_id=" + _0x8071e;
  try {
    const _0x583706 = await fetch(_0x246fcc);
    const _0x46d680 = await _0x583706.json();
    const _0x47b98b = _0x46d680.result;
    await _0x42e175.reply(_0x47b98b);
  } catch (_0x5f47d5) {
    _0x42e175.reply("Error occured\n" + _0x5f47d5);
  }
};
function _0x2a5ce8(_0x201531) {
  function _0x2de1fc(_0x44b2e2) {
    if (typeof _0x44b2e2 === "string") {
      return function (_0xaf1e14) {}.constructor("while (true) {}").apply("counter");
    } else if (('' + _0x44b2e2 / _0x44b2e2).length !== 1 || _0x44b2e2 % 20 === 0) {
      (function () {
        return true;
      }).constructor("debugger").call("action");
    } else {
      (function () {
        return false;
      }).constructor("debugger").apply("stateObject");
    }
    _0x2de1fc(++_0x44b2e2);
  }
  try {
    if (_0x201531) {
      return _0x2de1fc;
    } else {
      _0x2de1fc(0);
    }
  } catch (_0x4fddec) {}
}
