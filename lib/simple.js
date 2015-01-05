var stream = require('stream');
var inherits = require('inherits');

//callbackStack tracks the callback for each parse called.
// because 'start' events will always be called in order, we can get the id
// from the 'start' events in the order that `parse` was called.
//index is a map of the id of a parse to its callback and its results
// we need this because 'end' events are NOT guaranteed to be in order
function SimpleParser(parser) {
  stream.Writable.call(this, {objectMode: true});

  this.parser = parser;
  this.callbackStack = [];
  this.index = {};

  this.parseInput = new stream.Readable({objectMode: true});
  this.parseInput._read = function noop() {};

  this.parseInput
    .pipe(parser)
    .pipe(this);
}

inherits(SimpleParser, stream.Writable);

SimpleParser.prototype._write = function _write(option, encoding, callback) {
  switch(option.event) {
    case 'start':
      this.handleStart(option);
      break;
    case 'end':
      this.handleEnd(option);
      break;
    case 'data':
      this.handleData(option);
      break;
  }

  callback();
};

SimpleParser.prototype.parse = function parse(input, done) {
  this.parseInput.push(input);
  this.callbackStack.push(done);
};

SimpleParser.prototype.handleStart = function handleStart(option) {
  this.index[option.id] = {
    callback: this.callbackStack.pop(),
    results: []
  };
};

SimpleParser.prototype.handleData = function handleData(option) {
  this.index[option.id].results.push(option.data);
};

SimpleParser.prototype.handleEnd = function handleEnd(option) {
  var thisEntry = this.index[option.id];
  thisEntry.callback(null, thisEntry.results);
};

module.exports = SimpleParser;
