const yamlTests = [
  `not ok 2
  ---
  message: 'First line invalid'
  severity: fail
  data:
    got: 'Flirble'
    expect: 'Fnible'
  ...`,
  `ok 5 meh
  ---
  message: 'a'
  stuff: b
  data:
    a: 'c'
    b: 'd'
  ...`
]

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
    value: '1..6',
    parsed: {
      start: 1,
      end: 6,
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
    value: yamlTests[0],
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
  },
  {
    type: 'test',
    value: 'ok 3 should be truthy',
    parsed: {
      ok: true,
      point: 3,
      description: 'should be truthy'
    }
  },
  {
    type: 'diagnostic',
    value: '# hey hey hey',
    parsed: {
      message: 'hey hey hey'
    }
  },
  {
    type: 'test',
    value: 'ok 4',
    parsed: {
      ok: true,
      point: 4
    }
  },
  {
    type: 'test',
    value: yamlTests[1],
    parsed: {
      ok: true,
      point: 5,
      description: 'meh',
      document: {
        message: 'a',
        stuff: 'b',
        data: {
          a: 'c',
          b: 'd'
        }
      }
    }
  },
  {
    type: 'test',
    value: 'ok 6',
    parsed: {
      ok: true,
      point: 6
    }
  }
]
