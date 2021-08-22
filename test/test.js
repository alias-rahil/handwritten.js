const assert = require('assert')
const main = require('../src/index')
const Pdfkit = require('pdfkit')

describe('Testing main function', function () {
  it('input text to pdf', function () {
    main('Sample text').then((ret) => {
      assert.equal(ret instanceof Pdfkit, true)
    })
  })
})