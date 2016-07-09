const yaml = require('js-yaml')
const lineParsers = require('tap-line-parsers')

const parsers = Object.assign({}, lineParsers, {
  yaml: block => {
    const lines = block.split('\n')
    const doc = lines.slice(1, lines.length - 1).join('\n')
    return {document: yaml.safeLoad(doc)}
  }
})

module.exports = parsers
