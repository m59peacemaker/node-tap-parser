const duplex  = require('duplexer')
const lexer   = require('tap-lexer')
const parsingTransform = require('./lib/parsing-transform')
const addDocumentsToTests = require('./lib/add-documents-to-tests')

const Parser = () => {
  const lexerStream = lexer()
  const fullyParsed = lexerStream
    .pipe(parsingTransform())
    .pipe(addDocumentsToTests())
  return duplex(lexerStream, fullyParsed)
}

module.exports = Parser
