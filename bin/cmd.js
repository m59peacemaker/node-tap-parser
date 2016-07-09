#!/usr/bin/env node

const Parser  = require('../')
const through = require('throo')

process.stdin
  .pipe(Parser())
  .pipe(through.obj((push, chunk, enc, cb) => {
    cb(null, JSON.stringify(chunk) + '\n')
  }))
  .pipe(process.stdout)
