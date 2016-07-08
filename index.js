const through = require('through2')
const duplex  = require('duplexer')
const lexer   = require('tap-lexer')
const yaml    = require('js-yaml')
const lineParsers = require('tap-line-parsers')

const parsers = Object.assign({}, lineParsers, {
  yaml: block => {
    const lines = block.split('\n')
    const doc = block.slice(1, lines.length - 2).join('\n')
    return {document: yaml.safeLoad(doc)}
  }
})

const Parser = () => {
  const lexerStream = lexer()
  const fullyParsed = lexerStream
    .pipe(through.obj(function (chunk, enc, cb) {
      if (chunk.type !== 'unknown') {
        chunk = Object.assign({}, chunk, {parsed: parsers[chunk.type](chunk.value)})
      }
      cb(null, chunk)
    }))
  return duplex(lexerStream, fullyParsed)
}

module.exports = Parser
