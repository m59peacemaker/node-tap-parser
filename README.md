# @m59/tap-parser

Stream that receives TAP, parses it, and emits JavaScript objects of parsed TAP.

## Install

```sh
npm install @m59/tap-parser
```

## Usage

```js
const parser = require('@m59/tap-parser')
const though = require('throo')

process.stdin
  .pipe(parser())
  .pipe(through((push, chunk, enc, cb) => {
    chunk // object of parsed TAP
  }))
```
