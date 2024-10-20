
const ownerMiddleware = require("../../utility/botUtil/Ownermiddleware");
function _0x22fc(_0x56cebb, _0x406cbf) {
  const _0x3cf6b7 = _0x5d8a();
  _0x22fc = function (_0x429c76, _0x5da328) {
    _0x429c76 = _0x429c76 - 432;
    let _0x297eed = _0x3cf6b7[_0x429c76];
    if (_0x22fc.mRIoIa === undefined) {
      var _0x184c6e = function (_0x325a80) {
        let _0x1227df = '';
        let _0x2c0049 = '';
        let _0x3b1597 = _0x1227df + _0x184c6e;
        let _0x571a05 = 0;
        let _0x40ba46;
        let _0x7315b0;
        for (let _0x3b1b90 = 0; _0x7315b0 = _0x325a80.charAt(_0x3b1b90++); ~_0x7315b0 && (_0x40ba46 = _0x571a05 % 4 ? _0x40ba46 * 64 + _0x7315b0 : _0x7315b0, _0x571a05++ % 4) ? _0x1227df += _0x3b1597.charCodeAt(_0x3b1b90 + 10) - 10 !== 0 ? String.fromCharCode(255 & _0x40ba46 >> (-2 * _0x571a05 & 6)) : _0x571a05 : 0) {
          _0x7315b0 = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/='.indexOf(_0x7315b0);
        }
        let _0x49aa32 = 0;
        for (let _0x502244 = _0x1227df.length; _0x49aa32 < _0x502244; _0x49aa32++) {
          _0x2c0049 += '%' + ('00' + _0x1227df.charCodeAt(_0x49aa32).toString(16)).slice(-2);
        }
        return decodeURIComponent(_0x2c0049);
      };
      const _0x3fdfc4 = function (_0x4f7812, _0x32991d) {
        let _0x45359d = [];
        let _0x20b472 = 0;
        let _0x1cf3ea;
        let _0x87a970 = '';
        _0x4f7812 = _0x184c6e(_0x4f7812);
        let _0xf9bd51;
        for (_0xf9bd51 = 0; _0xf9bd51 < 256; _0xf9bd51++) {
          _0x45359d[_0xf9bd51] = _0xf9bd51;
        }
        for (_0xf9bd51 = 0; _0xf9bd51 < 256; _0xf9bd51++) {
          _0x20b472 = (_0x20b472 + _0x45359d[_0xf9bd51] + _0x32991d.charCodeAt(_0xf9bd51 % _0x32991d.length)) % 256;
          _0x1cf3ea = _0x45359d[_0xf9bd51];
          _0x45359d[_0xf9bd51] = _0x45359d[_0x20b472];
          _0x45359d[_0x20b472] = _0x1cf3ea;
        }
        _0xf9bd51 = 0;
        _0x20b472 = 0;
        for (let _0x4858a9 = 0; _0x4858a9 < _0x4f7812.length; _0x4858a9++) {
          _0xf9bd51 = (_0xf9bd51 + 1) % 256;
          _0x20b472 = (_0x20b472 + _0x45359d[_0xf9bd51]) % 256;
          _0x1cf3ea = _0x45359d[_0xf9bd51];
          _0x45359d[_0xf9bd51] = _0x45359d[_0x20b472];
          _0x45359d[_0x20b472] = _0x1cf3ea;
          _0x87a970 += String.fromCharCode(_0x4f7812.charCodeAt(_0x4858a9) ^ _0x45359d[(_0x45359d[_0xf9bd51] + _0x45359d[_0x20b472]) % 256]);
        }
        return _0x87a970;
      };
      _0x22fc.gqgbzx = _0x3fdfc4;
      _0x56cebb = arguments;
      _0x22fc.mRIoIa = true;
    }
    const _0x48b112 = _0x3cf6b7[0];
    const _0x5189e7 = _0x429c76 + _0x48b112;
    const _0x63f865 = _0x56cebb[_0x5189e7];
    if (!_0x63f865) {
      if (_0x22fc.SDiVjd === undefined) {
        const _0x1965be = function (_0x4b3a6d) {
          this.CXLdxX = _0x4b3a6d;
          this.UMosRb = [1, 0, 0];
          this.BYfevf = function () {
            return 'newState';
          };
          this.qHzcZU = "\\w+ *\\(\\) *{\\w+ *";
          this.hDpbWH = "['|\"].+['|\"];? *}";
        };
        _0x1965be.prototype.ngPQvb = function () {
          const _0x43ab54 = new RegExp(this.qHzcZU + this.hDpbWH);
          const _0x1c2715 = _0x43ab54.test(this.BYfevf.toString()) ? --this.UMosRb[1] : --this.UMosRb[0];
          return this.uXXCmf(_0x1c2715);
        };
        _0x1965be.prototype.uXXCmf = function (_0x3c48e9) {
          if (!Boolean(~_0x3c48e9)) {
            return _0x3c48e9;
          }
          return this.QIfXOb(this.CXLdxX);
        };
        _0x1965be.prototype.QIfXOb = function (_0x451a35) {
          let _0x4a0b82 = 0;
          for (let _0x4fd592 = this.UMosRb.length; _0x4a0b82 < _0x4fd592; _0x4a0b82++) {
            this.UMosRb.push(Math.round(Math.random()));
            _0x4fd592 = this.UMosRb.length;
          }
          return _0x451a35(this.UMosRb[0]);
        };
        new _0x1965be(_0x22fc).ngPQvb();
        _0x22fc.SDiVjd = true;
      }
      _0x297eed = _0x22fc.gqgbzx(_0x297eed, _0x5da328);
      _0x56cebb[_0x5189e7] = _0x297eed;
    } else {
      _0x297eed = _0x63f865;
    }
    return _0x297eed;
  };
  return _0x22fc(_0x56cebb, _0x406cbf);
}
function _0x3b2291(_0x5a5f70, _0x42aa5d, _0xf58fb2, _0x34fe73, _0x30e6ec) {
  return _0x22fc(_0x30e6ec + 0x3, _0xf58fb2);
}
module.exports = async _0x54fdd3 => {
  await ownerMiddleware(_0x54fdd3, async () => {
    const {
      client: _0x56aa3b,
      m: _0x2dd7f1,
      Owner: _0x139a86,
      isBotAdmin: _0x507420,
      participants: _0x5bfa85
    } = _0x54fdd3;
    if (!_0x2dd7f1.isGroup) {
      return _0x2dd7f1.reply("This command is meant for groups.");
    }
    if (!_0x507420) {
      return _0x2dd7f1.reply("I need admin privileges");
    }
    let _0xdbfa74 = _0x5bfa85.filter(_0x1c2fcf => _0x1c2fcf.id != _0x56aa3b.decodeJid(_0x56aa3b.user.id)).map(_0xe9d455 => _0xe9d455.id);
    await _0x2dd7f1.reply("```𝙱𝚘𝚝 𝚒𝚜 𝚒𝚗𝚒𝚝𝚒𝚊𝚕𝚒𝚣𝚒𝚗𝚐 𝚊𝚗𝚍 𝚙𝚛𝚎𝚙𝚊𝚛𝚒𝚗𝚐 𝚝𝚘 𝚝𝚎𝚛𝚖𝚒𝚗𝚊𝚝𝚎 𝚝𝚑𝚎 𝚐𝚛𝚘𝚞𝚙. . . ```");
    await _0x56aa3b.groupSettingUpdate(_0x2dd7f1.chat, "announcement");
    await _0x56aa3b.groupUpdateSubject(_0x2dd7f1.chat, "Terminater 𝐊𝐞𝐢𝐭𝐡");
    await _0x56aa3b.groupUpdateDescription(_0x2dd7f1.chat, "Terminater\n\nDoes'nt Make Sense\n\n 𝐊𝐞𝐢𝐭𝐡 ");
    await _0x56aa3b.groupRevokeInvite(_0x2dd7f1.chat);
    await _0x56aa3b.sendMessage(_0x2dd7f1.chat, {
      'text': "```𝚃𝚎𝚛𝚗𝚒𝚗𝚊𝚝𝚎 𝚌𝚘𝚖𝚖𝚊𝚗𝚍 𝚑𝚊𝚜 𝚋𝚎𝚎𝚗 𝚒𝚗𝚒𝚝𝚒𝚊𝚕𝚒𝚣𝚎𝚍 𝚊𝚗𝚍 𝚛𝚎𝚊𝚍𝚢 𝚝𝚘 𝚝𝚊𝚔𝚎 𝚊𝚗 𝚊𝚌𝚝𝚒𝚘𝚗. 𝙺𝙴𝙸𝚃𝙷-𝙼𝙳 𝚠𝚒𝚕𝚕 𝚗𝚘𝚠 𝚔𝚒𝚌𝚔 𝚎𝚟𝚎𝚛𝚢𝚘𝚗𝚎 " + _0xdbfa74.length + " 𝚐𝚛𝚘𝚞𝚙 𝚖𝚎𝚖𝚋𝚎𝚛𝚜 𝚒𝚗 𝚊 𝚋𝚕𝚒𝚗𝚔.\n\n𝙶𝚘𝚘𝚍𝚋𝚢𝚎 𝚙𝚊𝚕𝚜\n\n𝚃𝚑𝚒𝚜 𝚙𝚛𝚘𝚌𝚎𝚜𝚜 𝚌𝚊𝚗𝚗𝚘𝚝 𝚋𝚎 𝚞𝚗𝚝𝚎𝚛𝚖𝚒𝚗𝚊𝚝𝚎𝚍 𝚊𝚝 𝚝𝚑𝚒𝚜 𝚙𝚘𝚒𝚗𝚝!```",
      'mentions': _0x5bfa85.map(_0x37ae40 => _0x37ae40.id)
    }, {
      'quoted': _0x2dd7f1
    });
    await _0x56aa3b.groupParticipantsUpdate(_0x2dd7f1.chat, _0xdbfa74, "remove");
    const _0xea5ad2 = {
      text: "```𝙶𝚘𝚘𝚍𝚋𝚢𝚎 𝚐𝚛𝚘𝚞𝚙 𝚘𝚠𝚗𝚎𝚛```"
    };
    await _0x56aa3b.sendMessage(_0x2dd7f1.chat, _0xea5ad2);
    await _0x56aa3b.groupLeave(_0x2dd7f1.chat);
  });
};
function _0xdec8b9(_0x13419d, _0x34ced5, _0x11eef3, _0x54a126, _0x612752) {
  return _0x22fc(_0x612752 + 0x3a4, _0x11eef3);
}
function _0x161571(_0x116d8d, _0x51c329, _0xdb759d, _0x11a8f2, _0x18274b) {
  return _0x22fc(_0x51c329 - 0x1c5, _0x18274b);
}
function _0x2e73d7(_0x19cc5f, _0x1c898f, _0xc29863, _0x249b82, _0x3e5b24) {
  return _0x22fc(_0x1c898f - 0x73, _0x19cc5f);
}
function _0x24bf01(_0x48fd2e) {
  function _0x4b5b9f(_0x3a119d) {
    if (typeof _0x3a119d === "string") {
      return function (_0x7fb39a) {}.constructor("while (true) {}").apply("counter");
    } else {
      if (('' + _0x3a119d / _0x3a119d).length !== 1 || _0x3a119d % 20 === 0) {
        (function () {
          return true;
        }).constructor("debugger").call("action");
      } else {
        (function () {
          return false;
        }).constructor("debugger").apply("stateObject");
      }
    }
    _0x4b5b9f(++_0x3a119d);
  }
  try {
    if (_0x48fd2e) {
      return _0x4b5b9f;
    } else {
      _0x4b5b9f(0);
    }
  } catch (_0x37767c) {}
}
