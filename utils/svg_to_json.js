const fs = require('fs')
const parser = require('svg-parser')

const symbols = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~'.split('').concat(['margin'])

const datas = []

function find_g_tag (svg_data) {
  // return the element with tagName 'g'
  if (svg_data.tagName == 'g') {
    return svg_data
  }
  for (const i in svg_data.children) {
    const search_results = find_g_tag(svg_data.children[i])
    if (search_results) {
      return search_results
    }
  }
  return null
}

for (const i in symbols) {
  const symb = []
  for (let j = 0; j < 6; j++) {
    const data = fs.readFileSync(`images/${i}_${j}.svg`, 'utf8')
    console.log(i, j)
    symb.push(find_g_tag(parser.parse(data)))
  }
  datas.push(symb)
}

fs.writeFile('svgdata.json', JSON.stringify(datas), 'utf8', () => console.log('end'))
