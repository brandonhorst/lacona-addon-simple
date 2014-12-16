lacona-addon-simple
===================

[![Build Status](https://travis-ci.org/lacona/lacona-addon-simple.svg?branch=master)](https://travis-ci.org/lacona/lacona-addon-simple)
[![Coverage Status](https://img.shields.io/coveralls/lacona/lacona-addon-simple.svg)](https://coveralls.io/r/lacona/lacona-addon-simple)

By default, the [lacona](http://github.com/lacona/lacona) parser behaves like a stream outputting parse results in the order that they are computed. However, sometimes for simple applications you do not need this complex behavior. `lacona-addon-simple` simplifies the results of the parser to return all parse results in a callback.

```javascript
var lacona = require('lacona');
var Simple = require('lacona-addon-simple');
var laconaParser = new lacona.Parser();

var simpleParser = new Simple(laconaParser);

assert(simpleParser.parser === laconaParser);

simpleParser.parse('input', function (err, data) {
  data.forEach(console.log);
});
```

##Installation

```sh
npm install lacona-addon-simple
```

##Use

`lacona-addon-simple` exports a single constructor. The constructor must be invoked using `new`. It accepts a single argument, a `lacona.Parser` instance.

The returned object has one property and one method:

- `property parser` - the instance of `lacona.Parser` passed to the constructor. Can be modified at will.
- `method parse` - a function that takes an input string and a callback. It will parse the input string using `parser` and return an array of all results to the callback, or an error.
