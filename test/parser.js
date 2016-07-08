const test = require('tape')
const glob = require('glob')
const path = require('path')
const fs   = require('fs')
const parser = require('../')

const getJsFile = tapFile => {
  const fileObj = path.parse(tapFile)
  fileObj.base = undefined
  fileObj.ext = '.js'
  const jsFile = path.format(fileObj)
  return jsFile
}

glob.sync(__dirname + '/fixtures/*.tap').forEach(tapFile => {
  const js = require(getJsFile(tapFile))
  test(path.basename(tapFile), t => {
    t.plan(js.length)
    const stream = parser()
    stream.on('data', d => {
      t.deepEqual(d, js[t.assertCount])
    })
    fs.createReadStream(tapFile).pipe(stream)
  })
})
