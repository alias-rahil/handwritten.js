#!/usr/bin/env node

const fs = require('fs')
const handwritten = require('./index.js')

const [, , ...args] = process.argv

async function main(e, f) {
    try {
        let filename
        if (!f) {
            filename = 'output.pdf'
        } else {
            filename = f
        }
        const txt = String(fs.readFileSync(e))
        const output = await handwritten(txt)
        console.log(`Success! Saved file as '${filename}'!`)
        output.pipe(fs.createWriteStream(filename))
    } catch (err) {
        console.log(err)
    }
}

if (args.length > 2) {
    console.log(`Excess arguments were provided!\nNeeds either 1 or 2 arguments but was provided with ${args.length}!`)
} else if (args.length < 1) {
    console.log(`Insufficient arguments were provided!\nNeeds either 1 or 2 arguments but was provided with ${args.length}!`)
} else {
    main(args[0], args[1])
}