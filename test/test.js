var Simple = require('..');

var lacona = require('lacona');
var chai = require('chai');
var expect = chai.expect;

describe('lacona-addon-stateful', function () {
  var simpleParser;

  beforeEach(function () {
    var grammar = {
      phrases: [{
        name: 'test',
        root: 'test'
      }]
    };

    var parser = new lacona.Parser({sentences: ['test']});

    parser.understand(grammar);

    simpleParser = new Simple(parser);
  });

  it('outputs a single event with one value', function (done) {
    simpleParser.parse('t', function(err, results) {
      expect(err).to.not.exist();
      expect(results).to.have.length(1);
      expect(results[0].suggestion.words[0].string).to.equal('test');
      done();
    });

  });

  it('outputs an error if one occurs', function (done) {
    simpleParser.parse(123, function(err) {
      expect(err).to.exist();
      done();
    });

  });
});
