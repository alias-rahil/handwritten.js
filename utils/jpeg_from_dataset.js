const Jimp = require('jimp')
const dataset = require('../src/dataset.json')
const symbols = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~'.split('').concat(['margin'])


async function process() {
    for (i in symbols) {
        for (let j = 0 ; j < 6 ; j ++) {
            console.log(i,j)
            const img = await Jimp.read(Buffer.from(dataset[i][j]))
            await img.write(`images/${i}_${j}.jpeg`)
        }
    }
}

process()

