const handwritten = require('./src/index.js')
const fs = require('fs')
const rawtext = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque id semper neque. Nullam cursus eros vel sapien pretium, id ultrices enim lacinia. Vestibulum nec condimentum neque. Nulla ut diam ac sapien luctus luctus sed ut odio. Aliquam sollicitudin condimentum tellus, a suscipit lectus sagittis nec. Nulla neque turpis, lacinia a felis tempor, fringilla ultricies lorem. Ut aliquam enim id nisi efficitur, vel feugiat erat pellentesque. Sed ultricies semper suscipit. Vestibulum egestas arcu sed magna tincidunt, a consequat arcu porta. Aliquam consequat mi a dui tincidunt sollicitudin vitae non libero.
`
handwritten(rawtext, {vector:true}).then((converted) => {
    converted.pipe(fs.createWriteStream('output.pdf'))
}).then(()=> console.log('ended'))
