#!/usr/bin/env node

const fs = require('fs');
const handwritten = require('./index.js');

const [, , ...args] = process.argv;

async function main(e) {
  try {
    const txt = String(fs.readFileSync(e)).trim();
    const output = await handwritten(txt);
    if (output) {
      output.write('output.jpg');
      console.log("Success! Saved file as 'output.jpg'!");
    } else {
      console.log('ERROR!');
      console.log(`File '${e}' was empty!`);
    }
  } catch (err) {
    console.log('ERROR!');
    console.log(err);
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
