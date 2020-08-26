#!/usr/bin/env node

const fs = require('fs')
const handwritten = require('./index.js')
const [arg1, arg2, ...args] = process.argv
async function main (inputfile, optionalargs = {}) {
  try {
    const ruled = optionalargs.ruled || false
    const filename = optionalargs.outputfile || 'output.pdf'
    const txt = String(fs.readFileSync(inputfile))
    const output = await handwritten(txt, {
      ruled: ruled
    })
    console.log({
      success: `Saved file as "${filename}"!`
    })
    output.pipe(fs.createWriteStream(filename))
  } catch (err) {
    console.log(err)
  }
}
if (args.length === 1 || (args.length === 2 && args[1] === 'ruled=false')) {
  main(args[0])
} else if (args.length === 2 && args[1] === 'ruled=true') {
  main(args[0], {
    ruled: true
  })
} else if ((args.length === 2 && args[1].slice(0, 11) === 'outputfile=') || (args
  .length === 3 && args[1].slice(0, 11) === 'outputfile=' && args[2] ===
        'ruled=false')) {
  main(args[0], {
    outputfile: args[1].slice(11, args[1].length)
  })
} else if (args.length === 3 && args[1].slice(0, 11) === 'outputfile=' && args[
  2] === 'ruled=true') {
  main(args[0], {
    outputfile: args[1].slice(11, args[1].length),
    ruled: true
  })
} else if (args.length === 3 && args[2].slice(0, 11) === 'outputfile=' && args[
  1] === 'ruled=true') {
  main(args[0], {
    outputfile: args[2].slice(11, args[1].length),
    ruled: true
  })
} else if (args.length === 3 && args[2].slice(0, 11) === 'outputfile=' && args[
  1] === 'ruled=false') {
  main(args[0], {
    outputfile: args[2].slice(11, args[1].length)
  })
} else {
  console.log({
    error: 'invalid command-line arguments!',
    usage: `${arg1} ${arg2} path/to/inputfile.txt [outputfile=path/to/outputfile.pdf] [ruled=true|false]`,
    default: 'outputfile=output.pdf and ruled=false'
  })
}
