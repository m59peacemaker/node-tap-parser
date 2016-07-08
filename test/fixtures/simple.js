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
    value: '1..1',
    parsed: {
      start: 1,
      end: 1,
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
  }
]
