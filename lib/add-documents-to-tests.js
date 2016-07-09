const through = require('throo')

const combine = (test, yaml) => {
  test.value+= '\n' + yaml.value
  Object.assign(test.parsed, yaml.parsed)
  return test
}

const addDocumentsToTests = () => {

  let waitingTestChunk = undefined

  const sendAndResetWaitingTestChunk = (push) => {
    push(waitingTestChunk)
    waitingTestChunk = undefined
  }

  return through.obj(
    (push, chunk, enc, cb) => {

      // previous chunk was a test and this one isn't yaml
      if (waitingTestChunk && chunk.type !== 'yaml') {
        // send last through
        sendAndResetWaitingTestChunk(push)
      }

      // pass all other types through
      if (!['test', 'yaml'].includes(chunk.type)) {
        return cb(null, chunk)
      }

      if (chunk.type === 'test') {
        waitingTestChunk = chunk
        return cb()
      }

      if (chunk.type === 'yaml') {

        /* this yaml chunk isn't preceded by a test, pass it through
         * but... this shouldn't ever happen
         * yaml is supposed to follow a test, or be `unknown`
         */
        if (!waitingTestChunk) {
          return cb(null, chunk)
        }

        if (waitingTestChunk) {
          push(combine(waitingTestChunk, chunk))
          waitingTestChunk = undefined
          return cb()
        }
      }

    },
    (push, cb) => {
      if (waitingTestChunk) {
        sendAndResetWaitingTestChunk(push)
      }
      cb()
    }
  )
}

module.exports = addDocumentsToTests
