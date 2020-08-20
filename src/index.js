const unidecode = require('unidecode-plus')
const mergeImg = require('merge-img')
const Pdfkit = require('pdfkit')
const dataset = require('./dataset.json')

function randint() {
    return Math.floor(Math.random() * 6)
}
async function fillemptyspace(paragraph, width) {
    for (let i = 0; i < paragraph.length; i += 1) {
        while (paragraph[i].length !== width) {
            paragraph[i].push(Buffer.from(dataset['space'][randint()]))
        }
    }
    const k = []
    for (let i = 0; i < paragraph.length; i += 1) {
        const img = await mergeImg(paragraph[i])
        k.push(img)
    }
    const blankLine = []
    while (blankLine.length !== width) {
        blankLine.push(Buffer.from(dataset['space'][randint()]))
    }
    const bl = await mergeImg(blankLine)
    while (k.length % batchSize !== 0) {
        k.push(bl)
    }
    return k
}

function getwidth(paragraph) {
    let width = batchSize
    for (let i = 0; i < paragraph.length; i += 1) {
        width = Math.max(paragraph[i].length, width)
    }
    return width
}

function getparagraph(text) {
    const paragraph = []
    let line = []
    for (let i = 0; i < text.length; i += 1) {
        if (alphanum.includes(text[i])) {
            line.push(Buffer.from(dataset[text[i]][randint()]))
        } else if (symbols.includes(text[i])) {
            line.push(
                Buffer.from(dataset[`symbol${symbols.indexOf(text[i])}`][randint()])
            )
        } else if (text[i] === ' ') {
            if (line.length > batchSize - 1) {
                paragraph.push(line)
                line = []
            } else {
                line.push(Buffer.from(dataset['space'][randint()]))
            }
        } else if (text[i] === '\n') {
            paragraph.push(line)
            line = []
        }
    }
    paragraph.push(line)
    return paragraph
}

function getbatchsize() {
    let batchSize = 32
    while ([true, false][Math.floor(Math.random() * 2)]) {
        batchSize += 1
    }
    return batchSize
}

function createbatches(k) {
    return new Array(Math.ceil(k.length / batchSize)).fill().map((
            _) => k
        .splice(0, batchSize))
}

function cleantext(rawText) {
    return unidecode(rawText.replace('\t', '    '), {
        german: true,
        smartSpacing: true
    }).trim()
}

function getbufferasync(image, outputType) {
    return new Promise((resolve, reject) => {
        image.getBuffer(`image/${outputType}`, (err,
            buf) => {
            if (err) {
                reject(err)
            } else {
                resolve(buf)
            }
        })
    })
}

function getbas64async(image, outputType) {
    return new Promise((resolve, reject) => {
        image.getBase64(`image/${outputType}`, (err,
            buf) => {
            if (err) {
                reject(err)
            } else {
                resolve(buf)
            }
        })
    })
}
async function getimages(result, outputType, cb) {
    const imgArr = []
    for (let i = 0; i < result.length; i += 1) {
        const image = (await mergeImg(result[i], {
            direction: true
        })).resize(2380, 3408)
        imgArr.push(await cb(image, outputType))
    }
    return imgArr
}

function generatepdf(imgArr) {
    const doc = new Pdfkit({
        size: [2480, 3508],
        margins: {
            top: 50,
            bottom: 50,
            left: 50,
            right: 50
        }
    })
    for (let i = 0; i < imgArr.length; i += 1) {
        doc.image(imgArr[i], 50, 50)
        if (i !== imgArr.length - 1) {
            doc.addPage()
        }
    }
    doc.end()
    return doc
}

function checkargtype(rawText, outputType) {
    if (typeof(rawText) !== 'string') {
        return false
    } else if (outputType && typeof(outputType) !== 'string') {
        return false
    } else {
        return true
    }
}
async function getRet(text, outputType) {
    const paragraph = getparagraph(text)
    const width = getwidth(paragraph)
    const k = await fillemptyspace(paragraph, width)
    const result = createbatches(k)
    if (!outputType || outputType === 'pdf') {
        const type = supportedOutputTypes[Math.floor(Math
            .random() *
            supportedOutputTypes.length)]
        let imgArr
        if (type.slice(-4, 0) === '/b64') {
            imgArr = await getimages(result, type.slice(0, -4),
                getbas64async)
        } else {
            imgArr = await getimages(result, type.slice(0, -4),
                getbufferasync)
        }
        return generatepdf(imgArr)
    } else {
        if (outputType.slice(-4, 0) === '/buf') {
            return await getimages(result, outputType.slice(0, -4),
                getbufferasync)
        } else {
            return await getimages(result, outputType.slice(0, -4),
                getbas64async)
        }
    }
}

function isargvalid(outputType) {
    return outputType && !supportedOutputTypes.concat('pdf')
        .includes(
            outputType)
}
const batchSize = getbatchsize()
const symbols = '!?"()@&*[]<>{}.,:;-\'~`$#%+\\/|_^='
const alphanum = 'qwertyuiopasdfghjklzxcvbnm1234567890QWERTYUIOPASDFGHJKLZXCVBNM'
const supportedOutputTypes = ['jpeg/buf', 'png/buf', 'jpeg/b64',
    'png/b64'
]
async function main(rawText, outputType) {
    if (!checkargtype(rawText, outputType)) {
        throw {
            error: 'arguments must be of type string!'
        }
    } else {
        if (isargvalid(outputType)) {
            throw {
                error: `Invalid output type "${outputType}"!`,
                supportedOutputTypes: supportedOutputTypes
                    .concat(
                        'pdf'),
                default: 'pdf'
            }
        } else {
            const text = cleantext(rawText)
            if (text.length === 0) {
                if (!outputType || outputType === 'pdf') {
                    return generatepdf([])
                } else {
                    return []
                }
            } else {
                return await getRet(text, outputType)
            }
        }
    }
}
module.exports = main