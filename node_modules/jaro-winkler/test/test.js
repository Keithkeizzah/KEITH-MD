var distance = typeof require === 'function' ? require('..') : window.distance;
var assert = typeof require === 'function' ? require('chai').assert : window.chai.assert;

describe('distance', function() {
  it('should return a number', function() {
    var value = distance('JARO', 'ORAJ');
    assert.typeOf(value, 'number');
  });

  it('should return the right distance', function() {
    // See for basis of expected values:
    // http://en.wikipedia.org/wiki/Jaro–Winkler_distance

    var value1 = distance('MARTHA', 'MARHTA');
    assert.closeTo(value1, 0.961, 0.001);

    var value2 = distance('DWAYNE', 'DUANE');
    assert.closeTo(value2, 0.84, 0.001);

    var value3 = distance('DIXON', 'DICKSONX');
    assert.closeTo(value3, 0.814, 0.001);
  });

  it('should ignore case when asked', function() {
    var on  = distance('jArO', 'JaRo', { caseSensitive: false });
    var off = distance('jaro', 'jaro');
    assert.equal(on, off);
  });
});
