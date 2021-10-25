/* globals describe, it */
const assert = require("assert");
const Pdfkit = require("pdfkit");
const main = require("../src/index");

describe("Testing main function", () => {
  it("input text to pdf with no modification", () => {
    main("Sample text ").then((ret) => {
      assert.equal(ret instanceof Pdfkit, true);
    });
  });
  it("input text to pdf with ruled", () => {
    main("Sample text", { ruled: true }).then((ret) => {
      assert.equal(ret instanceof Pdfkit, true);
    });
  });
  it("input text to pdf with custom ink color", () => {
    main("Sample text", { inkColor: "#0000FF" }).then((ret) => {
      assert.equal(ret instanceof Pdfkit, true);
    });
  });
});
