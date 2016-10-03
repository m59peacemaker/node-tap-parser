# tap_parser

Stream that receives TAP, parses it, and emits JavaScript objects of parsed TAP.

## Install

```sh
npm install tap_parser
```

## Usage

```js
const parser = require('tap_parser')
const though = require('throo')

process.stdin
  .pipe(parser())
  .pipe(through((push, chunk, enc, cb) => {
    chunk // object of parsed TAP
  }))
```
