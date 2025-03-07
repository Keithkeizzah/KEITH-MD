var httpGet = require('./http-get')

module.exports = ipLocation
ipLocation.httpGet = httpGet // so it can be overwritten
ipLocation.Promise = typeof Promise === 'function' ? Promise : null // maybe you want to use Bluebird

function _ipLocation (hostnameOrIP, callback) {
  ipLocation.httpGet('https://freegeoip.net/json/' + hostnameOrIP, function (err, res) {
    if (err) return callback(err)
    if (!res) return callback(new Error('empty response'))
    try {
      var data = JSON.parse(res.body)
      return callback(null, data)
    } catch (err2) {
      return callback(err2)
    }
  })
}

function ipLocation (hostnameOrIP, callback) {
  callback = callback || function () {}
  if (!ipLocation.Promise) return _ipLocation(hostnameOrIP, callback)
  return new Promise(function (resolve, reject) {
    _ipLocation(hostnameOrIP, function (err, data) {
      callback(err, data)
      if (err) return reject(err)
      else return resolve(data)
    })
  })
}
