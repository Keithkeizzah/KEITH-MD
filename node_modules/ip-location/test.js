var test = require('tape')
var ipLocation = require('./')

test('should fetch location', function (t) {
  t.plan(3)

  ipLocation('google.com', function (err, data) {
    t.ifError(err, 'no error')
    t.is(typeof data, 'object', 'data is object')
    t.is(data.country_code, 'US', 'has fields')
    t.end()
  })
})

test('should fetch location with promise', function (t) {
  t.plan(2)

  ipLocation('google.com')
  .then(function (data) {
    t.true(typeof data, 'object', 'data is object')
    t.is(data.country_code, 'US', 'has fields')
    t.end()
  })
  .catch(function (err) {
    t.fail(err)
  })
})
