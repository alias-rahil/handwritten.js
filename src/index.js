const getbatchsize = function() {
    let batchsize = 32
    while ([true, false][Math.floor(Math.random() * 2)]) {
        batchsize += 1
    }
    return batchsize
}
const randint = function() {
    return Math.floor(Math.random() * 6)
}
const cleantext = function(rawtext) {
    return unidecode(rawtext.replace('\t', '    '), {
        german: true,
        smartSpacing: true
    }).trim()
}
const getbufferasync = function(image, outputtype) {
    return new Promise((resolve, reject) => {
        image.getBuffer(`image/${outputtype}`, (err, buf) => {
            if (err) {
                reject(err)
            } else {
                resolve(buf)
            }
        })
    })
}
const getbas64async = function(image, outputtype) {
    return new Promise((resolve, reject) => {
        image.getBase64(`image/${outputtype}`, (err, buf) => {
            if (err) {
                reject(err)
            } else {
                resolve(buf)
            }
        })
    })
}
const getwidth = function(paragraph) {
    let width = batchsize
    for (let i = 0; i < paragraph.length; i += 1) {
        if (width < paragraph[i].length) {
            width = paragraph[i].length
        }
    }
    return width
}
const generatepdf = function(imgarr) {
    const doc = new pdfkit({
        size: [2480, 3508],
        margins: {
            top: 50,
            bottom: 50,
            left: 50,
            right: 50
        }
    })
    for (let i = 0; i < imgarr.length; i += 1) {
        doc.image(imgarr[i], 50, 50)
        if (i !== imgarr.length - 1) {
            doc.addPage()
        }
    }
    doc.end()
    return doc
}
const createbatches = function(k) {
    return new Array(Math.ceil(k.length / batchsize)).fill().map((_) => k
        .splice(0, batchsize))
}
const getimages = async function(result, outputtype, cb) {
    const imgarr = []
    for (let i = 0; i < result.length; i += 1) {
        const image = (await mergeimg(result[i], {
            direction: true
        })).resize(2380, 3408)
        imgarr.push(await cb(image, outputtype))
    }
    return imgarr
}
const checkargtype = function(rawtext, outputtype) {
    if (typeof(rawtext) !== 'string') {
        return false
    } else if (outputtype && typeof(outputtype) !== 'string') {
        return false
    } else {
        return true
    }
}
const isargvalid = function(outputtype) {
    return outputtype && !supportedoutputtypes.concat('pdf').includes(
        outputtype)
}
const getparagraph = function(text) {
    const paragraph = []
    let line = []
    for (let i = 0; i < text.length; i += 1) {
        if (alphanum.includes(text[i])) {
            line.push(Buffer.from(dataset[text[i]][randint()]))
        } else if (symbols.includes(text[i])) {
            line.push(Buffer.from(dataset[
                `symbol${symbols.indexOf(text[i])}`][randint()]))
        } else if ((text[i] === ' ' && line.length > batchsize - 2) || text[
                i] === '\n') {
            paragraph.push(line)
            line = []
        } else {
            line.push(Buffer.from(dataset['space'][randint()]))
        }
    }
    paragraph.push(line)
    return paragraph
}
const fillemptyspace = async function(paragraph, width) {
    for (let i = 0; i < paragraph.length; i += 1) {
        while (paragraph[i].length !== width) {
            paragraph[i].push(Buffer.from(dataset['space'][randint()]))
        }
    }
    const k = []
    for (let i = 0; i < paragraph.length; i += 1) {
        const img = await mergeimg(paragraph[i])
        k.push(img)
    }
    const blankline = []
    while (blankline.length !== width) {
        blankline.push(Buffer.from(dataset['space'][randint()]))
    }
    const bl = await mergeimg(blankline)
    while (k.length % batchsize !== 0) {
        k.push(bl)
    }
    return k
}
const getret = async function(text, outputtype) {
    const paragraph = getparagraph(text)
    const width = getwidth(paragraph)
    const k = await fillemptyspace(paragraph, width)
    const result = createbatches(k)
    if (!outputtype || outputtype === 'pdf') {
        const type = supportedoutputtypes[Math.floor(Math.random() *
            supportedoutputtypes.length)]
        let imgarr
        if (type.slice(-4, 0) === '/b64') {
            imgarr = await getimages(result, type.slice(0, -4),
                getbas64async)
        } else {
            imgarr = await getimages(result, type.slice(0, -4),
                getbufferasync)
        }
        return generatepdf(imgarr)
    } else {
        if (outputtype.slice(-4, 0) === '/buf') {
            return await getimages(result, outputtype.slice(0, -4),
                getbufferasync)
        } else {
            return await getimages(result, outputtype.slice(0, -4),
                getbas64async)
        }
    }
}
const main = async function(rawtext, outputtype) {
    if (!checkargtype(rawtext, outputtype)) {
        throw {
            error: 'arguments must be of type string!'
        }
    } else {
        if (isargvalid(outputtype)) {
            throw {
                error: `Invalid output type "${outputtype}"!`,
                supportedoutputtypes: supportedoutputtypes.concat(
                    'pdf'),
                default: 'pdf'
            }
        } else {
            const text = cleantext(rawtext)
            if (text.length === 0) {
                if (!outputtype || outputtype === 'pdf') {
                    return generatepdf([])
                } else {
                    return []
                }
            } else {
                return await getret(text, outputtype)
            }
        }
    }
}
const batchsize = getbatchsize()
const dataset = require('./dataset.json')
const unidecode = require('unidecode-plus')
const mergeimg = require('merge-img')
const symbols = '!?"()@&*[]<>{}.,:;-\'~`$#%+\\/|_^='
const alphanum =
    'qwertyuiopasdfghjklzxcvbnm1234567890QWERTYUIOPASDFGHJKLZXCVBNM'
const supportedoutputtypes = ['jpeg/buf', 'png/buf', 'jpeg/b64', 'png/b64']
const pdfkit = require('pdfkit')
module.exports = main