#!/usr/bin/env node

/* eslint no-console: "off" */

const {
  program,
} = require('commander');
const fs = require('fs');
const handwritten = require('./index.js');
const packagedetails = require('../package.json');

program.version(packagedetails.version).description(
  packagedetails.description,
).requiredOption(
  '-f, --file <file-name>', 'input file name',
).requiredOption(
  '-o, --output <name>', 'specify output file/folder name',
)
  .option(
    '-r, --ruled', 'use ruled paper as the background image',
  )
  .option(
    '-i, --images <png|jpeg>', 'get output as images instead of pdf',
  )
  .parse(
    process.argv,
  );

function removeDir(path) {
  if (fs.existsSync(path)) {
    if (fs.statSync(path).isDirectory()) {
      const files = fs.readdirSync(path);
      if (files.length > 0) {
        files.forEach((filename) => {
          removeDir(`${path}/${filename}`);
        });
        fs.rmdirSync(path);
      } else {
        fs.rmdirSync(path);
      }
    } else {
      fs.unlinkSync(path);
    }
  }
}
const optionalargs = {};
let error;
if (program.images) {
  if (program.images !== 'png' && program.images !== 'jpeg') {
    error = true;
    console.error({
      error: 'Invalid image mime type. Supported types are png and jpeg!',
    });
  } else if ([true, false][Math.floor(Math.random() * 2)]) {
    optionalargs.outputtype = `${program.images}/buf`;
  } else {
    optionalargs.outputtype = `${program.images}/b64`;
  }
}
if (program.ruled) {
  optionalargs.ruled = true;
}

async function main(file, optional, output) {
  try {
    const rawtext = fs.readFileSync(file).toString();
    const out = await handwritten(rawtext, optional);
    if (!optional.outputtype) {
      out.pipe(fs.createWriteStream(output));
      console.log({
        success: `Saved pdf as "${output}"!`,
      });
    } else {
      removeDir(output);
      fs.mkdirSync(output);
      let cb;
      if (optional.outputtype.slice(-4, optional.outputtype
        .length) === '/buf') {
        cb = fs.writeFileSync;
      } else {
        cb = (name, img) => {
          const data = img.replace(/^data:image\/\w+;base64,/,
            '');
          fs.writeFileSync(name, Buffer.from(data, 'base64'));
        };
      }
      for (let i = 0; i < out.length; i += 1) {
        cb(`${output}/${i}.${optional.outputtype.slice(0, -4)}`,
          out[i]);
      }
      console.log({
        success: `Saved the images in "${output}"!`,
      });
    }
  } catch (e) {
    console.error(e);
  }
}
if (!error) {
  main(program.file, optionalargs, program.output);
}
