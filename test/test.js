/* globals describe, it */
const assert = require('assert')
const main = require('../src/index')
const Pdfkit = require('pdfkit')

describe('Testing main function', function () {
  it('input text to pdf with no modification', function () {
    main('Sample text ').then((ret) => {
      assert.equal(ret instanceof Pdfkit, true)
    })
  })
  it('input text to pdf with ruled', function () {
    main('Sample text', { ruled: true }).then((ret) => {
      assert.equal(ret instanceof Pdfkit, true)
    })
  })
  it('input text to pdf with custom ink color', function () {
    main('Sample text', { inkColor: '#0000FF' }).then((ret) => {
      assert.equal(ret instanceof Pdfkit, true)
    })
  })
})
