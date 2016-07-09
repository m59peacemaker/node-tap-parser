const yamlTest = `not ok 2
  ---
  message: 'First line invalid'
  severity: fail
  data:
    got: 'Flirble'
    expect: 'Fnible'
  ...`

module.exports = [
  {
    type: 'version',
    value: 'TAP version 13',
    parsed: {
      version: '13'
    }
  },
  {
    type: 'plan',
    value: '1..2',
    parsed: {
      start: 1,
      end: 2,
    }
  },
  {
    type: 'test',
    value: 'ok 1 should be truthy',
    parsed: {
      ok: true,
      point: 1,
      description: 'should be truthy',
    }
  },
  {
    type: 'test',
    value: yamlTest,
    parsed: {
      ok: false,
      point: 2,
      document: {
        message: 'First line invalid',
        severity: 'fail',
        data: {
          got: 'Flirble',
          expect: 'Fnible'
        }
      }
    }
  }
]
