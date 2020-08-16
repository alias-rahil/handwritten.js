const unidecode = require('unidecode-plus');
const mergeImg = require('merge-img');
const jimp = require('jimp');
const pdfkit = require('pdfkit');
const path = `${__dirname}/dataset/`;

function randint() {
    return Math.floor(Math.random() * 6) + 1;
}
async function fillemptyspace(paragraph, width) {
    for (let i = 0; i < paragraph.length; i += 1) {
        while (paragraph[i].length !== width) {
            paragraph[i].push(`${path}space${randint()}.jpg`);
        }
    }
    const k = [];
    for (let i = 0; i < paragraph.length; i += 1) {
        const img = await mergeImg(paragraph[i]);
        k.push(img);
    }
    const blank_line = [];
    while (blank_line.length !== width) {
        blank_line.push(`${path}space${randint()}.jpg`);
    }
    const bl = await mergeImg(blank_line);
    while (k.length % batch_size != 0) {
        k.push(bl);
    }
    return k;
}

function getwidth(paragraph) {
    let width = paragraph[0].length;
    for (let i = 1; i < paragraph.length; i += 1) {
        if (paragraph[i].length > width) {
            width = paragraph[i].length;
        }
    }
    if (width < batch_size) {
        width = batch_size;
    }
    return width;
}

function getparagraph(text) {
    const paragraph = [];
    let line = [];
    for (let i = 0; i < text.length; i += 1) {
        if (alphanuml.includes(text[i])) {
            line.push(`${path}${text[i]}${randint()}.jpg`);
        } else if (alphanumu.includes(text[i])) {
            line.push(`${path}${randint()}${text[i]}.jpg`);
        } else if (symbols.includes(text[i])) {
            line.push(
                `${path}symbol${symbols.indexOf(text[i])}${randint()}.jpg`);
        } else if (text[i] === ' ') {
            if (line.length > batch_size - 1) {
                paragraph.push(line);
                line = [];
            } else {
                line.push(`${path}space${randint()}.jpg`);
            }
        } else if (text[i] === '\n') {
            paragraph.push(line);
            line = [];
        } else {
            line.push(`${path}space${randint()}.jpg`);
        }
    }
    paragraph.push(line);
    return paragraph;
}

function getbatchsize() {
    let batch_size = 36;
    while ([true, false][Math.floor(Math.random() * 2)]) {
        batch_size += 1;
    }
    return batch_size;
}

function createbatches(k) {
    return new Array(Math.ceil(k.length / batch_size)).fill().map((_) => k
        .splice(0, batch_size));
}

function cleantext(raw_text) {
    return unidecode(raw_text.replace('\t', '    ')).trim();
}

function getbufferasync(image) {
    return new Promise((resolve, reject) => {
        image.getBuffer(jimp.AUTO, (err, buf) => {
            if (err) {
                reject(err);
            } else {
                resolve(buf);
            }
        });
    });
}
async function getimages(result) {
    const img_arr = [];
    for (let i = 0; i < result.length; i += 1) {
        const image = await mergeImg(result[i], {
            direction: true,
        });
        img_arr.push(await getbufferasync(image));
    }
    return img_arr;
}

function generatepdf(img_arr) {
    const doc = new pdfkit({
        size: [2480, 3508],
        margins: {
            top: 50,
            bottom: 50,
            left: 50,
            right: 50,
        },
    });
    for (let i = 0; i < img_arr.length; i += 1) {
        doc.image(img_arr[i], 50, 50, {
            width: 2380,
            height: 3408,
        });
        doc.addPage();
    }
    doc.end();
    return doc;
}
const batch_size = getbatchsize();
const symbols = '!?"()@&*[]<>{}.,:;-\'~`$#';
const alphanuml = 'qwertyuiopasdfghjklzxcvbnm1234567890';
const alphanumu = 'QWERTYUIOPASDFGHJKLZXCVBNM';
async function main(raw_text) {
    const text = cleantext(raw_text);
    if (text.length === 0) {
        return generatepdf([]);
    }
    const paragraph = getparagraph(text);
    const width = getwidth(paragraph);
    const k = await fillemptyspace(paragraph, width);
    const result = createbatches(k);
    const img_arr = await getimages(result);
    return generatepdf(img_arr);
}
module.exports = main;