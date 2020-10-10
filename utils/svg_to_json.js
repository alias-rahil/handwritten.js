const fs = require('fs')
const parser = require('svg-parser')

const symbols = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~'.split('').concat(['margin'])

const datas = []

function findGTag (svgData) {
  // return the element with tagName 'g'
  if (svgData.tagName === 'g') {
    return svgData
  }
  for (const i in svgData.children) {
    const searchResults = findGTag(svgData.children[i])
    if (searchResults) {
      return searchResults
    }
  }
  return null
}

for (const i in symbols) {
  const symb = []
  for (let j = 0; j < 6; j++) {
    const data = fs.readFileSync(`images/${i}_${j}.svg`, 'utf8')
    console.log(i, j)
    symb.push(findGTag(parser.parse(data)))
  }
  datas.push(symb)
}

fs.writeFile('svgdata.json', JSON.stringify(datas), 'utf8', () => console.log('end'))
