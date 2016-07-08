const parser  = require('./lib/parser')
const through = require('through2')

var argv = require('yargs')
  .boolean('reverse')
  .alias('reverse', 'r')
  .argv

const filterTypes = argv._
const {reverse} = argv

process.stdin
  .pipe(parser())
  .pipe(through.obj(function (chunk, enc, cb) {
    const includes = filterTypes.includes(chunk.type)
    if (reverse ? !includes : includes) {
      this.push(chunk.value)
    }
    cb()
  }))
  .pipe(process.stdout)
