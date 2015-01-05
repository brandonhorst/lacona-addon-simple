var chai = require('chai');
var expect = chai.expect;

var lacona = require('lacona');
var Simple = require('..');

var grammar = {
  phrases: [{
    name: 'test',
    root: 'test'
  }]
};

describe('lacona-addon-simple', function () {
  var simpleParser;

  beforeEach(function () {
    var parser = new lacona.Parser({sentences: ['test']}).understand(grammar);

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
  
});
