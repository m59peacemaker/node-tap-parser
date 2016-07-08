const Parser  = require('../lib/parser')
const through = require('through2')

process.stdin
  .pipe(Parser())
  .pipe(process.stdout)
