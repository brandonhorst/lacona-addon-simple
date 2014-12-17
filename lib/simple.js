var EventEmitter = require('events').EventEmitter;
var inherits = require('inherits');

function SimpleParser(parser) {
  this.parser = parser;
  parser
    .on('start', this.handleStart.bind(this))
    .on('data', this.handleData.bind(this))
    .on('end', this.handleEnd.bind(this))
    .on('error', this.handleError.bind(this));
}

inherits(SimpleParser, EventEmitter);

SimpleParser.prototype.parse = function parse(input, done) {
  this.currentCallback = done;
  this.parser.parse(input);
};

SimpleParser.prototype.handleStart = function handleStart() {
  this.currentResults = [];
  this.currentlyActive = true;
};

SimpleParser.prototype.handleData = function handleData(data) {
  this.currentResults.push(data);
};

SimpleParser.prototype.handleEnd = function handleEnd() {
  if (this.currentlyActive) {
    this.currentlyActive = false;
    this.currentCallback(null, this.currentResults);
  }
};

SimpleParser.prototype.handleError = function handleError(err) {
  if (this.currentlyActive) {
    this.currentlyActive = false;
    this.currentCallback(err);
  }
};

module.exports = SimpleParser;
