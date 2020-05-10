#!/usr/bin/env node

const handwritten = require('./index.js');
const fs = require("fs");

const [, , ...args] = process.argv;

async function main(e) {
  try {
    let txt = fs.readFileSync(e);
    let output = await handwritten(txt);
    if (output) {
        output.write("output.jpg");
    } else {
      fs.writeFileSync("output.jpg", "");
    }
    console.log("Saved as 'output.jpg'!");
  } catch (err) {
    console.log(`File '${e}' does not exist!`);
  }
}

if (args.length > 1) {
  console.log('Excessive arguments were provided!');
  console.log(`Needs 1 arguments but was provided with ${args.length}!`);
} else if (args.length < 1) {
  console.log('Insufficient arguments were provided!');
  console.log(`Needs 1 arguments but was provided with ${args.length}!`);
} else {
  main(args[0]);
}
