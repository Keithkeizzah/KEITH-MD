var http = require('http')
var https = require('https')
var url = require('url')

function httpGet (uri, callback) {
  var urlData = url.parse(uri)
  var http_ = urlData.protocol === 'https:' ? https : http

  var doneCalled = false
  var done = function (err, result) {
    if (doneCalled) return
    doneCalled = true
    callback(err, result)
  }

  var req = http_.request(urlData, function (res) {
    var data = ''
    res.on('data', function (buffer) {
      data += buffer.toString('utf8')
    })

    res.on('end', function () {
      res.body = data
      done(null, res)
    })
  })

  req.on('error', done)

  req.end()
}

module.exports = httpGet
