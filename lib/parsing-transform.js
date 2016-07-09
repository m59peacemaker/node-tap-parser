const through = require('throo')
const parsers = require('./parsers')

const transform = () => {
  return through.obj((push, chunk, enc, cb) => {
    if (chunk.type !== 'unknown') {
      chunk = Object.assign({}, chunk, {parsed: parsers[chunk.type](chunk.value)})
    }
    cb(null, chunk)
  })
}

module.exports = transform
