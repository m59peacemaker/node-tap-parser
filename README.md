# tap_parser

Stream that receives TAP, parses it, and emits objects of parsed TAP.

Adheres strictly and entirely to the [TAP13 Specification](https://testanything.org/tap-version-13-specification.html).

## install

```sh
npm install tap_parser
```

## example

```js
const parser = require('tap_parser')
const though = require('throo')

process.stdin
  .pipe(parser())
  .pipe(through((push, chunk, enc, cb) => {
    chunk // object of parsed TAP
  }))
```

```sh
# output parsed TAP as JSON
npm test | tap_parser
```

## parsed TAP

All objects have this structure:

- type: Type of TAP (version, plan, test, etc)
- value: The original TAP that was input
- parsed: Object representation of TAP (see below)

Lines that are not TAP will have `type: 'unknown'` and will not have a "parsed" property.

### version

- version: `string`

### plan

- start: `number`
- end: `number`
- skip: `string`

### test

- ok: `boolean`
- point: `number`
- description: `string`
- skip: `boolean | string` Will be `string` if there is a message, `true` if not
- todo: `boolean | string` Will be `string` if there is a message, `true` if not
- document: `object` Parsed YAML document

### bailout

- reason: `string`

### diagnostic

- message: `string`

### unknown

## notes

Test lines may or may not be followed by an associated document. The parser will hold test lines until the next line comes in so that the document can be parsed and added to the test. This is usually not important to know, but this can be a "gotcha" in some cases. For example, a test that writes a test line to the stream and nothing afterward will hang waiting for another line.
