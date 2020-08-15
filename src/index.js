const unidecode = require('unidecode-plus');
const mergeImg = require('merge-img');
const jimp = require('jimp');
const pdfkit = require('pdfkit');
const symbols = '!?"()@&*[]<>{}.,:;-\'';
const alphanuml = 'qwertyuiopasdfghjklzxcvbnm1234567890';
const alphanumu = 'QWERTYUIOPASDFGHJKLZXCVBNM';
let batch_size = 36;

while ([true, false][Math.floor(Math.random() * 2)]) {
    batch_size += 1;
}

function getbuffersync(image) {
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

async function main(raw_text) {
    const text = unidecode(raw_text).trim();
    if (text.length !== 0) {
        const all = [];
        let res = [];
        for (let i = 0; i < text.length; i += 1) {
            if (alphanuml.includes(text[i])) {
                res.push(`${__dirname}/dataset/${text[i]}${Math.floor(Math.random() * 6) + 1}.jpg`);
            } else if (alphanumu.includes(text[i])) {
                res.push(`${__dirname}/dataset/${Math.floor(Math.random() * 6) + 1}${text[i]}.jpg`);
            } else if (symbols.includes(text[i])) {
                res.push(`${__dirname}/dataset/symbol${symbols.indexOf(text[i])}${Math.floor(Math.random() * 6) + 1}.jpg`);
            } else if (text[i] === ' ') {
                if (res.length > batch_size - 1) {
                    all.push(res);
                    res = [];
                } else {
                    res.push(`${__dirname}/dataset/space${Math.floor(Math.random() * 6) + 1}.jpg`);
                }
            } else if (text[i] === '\n') {
                all.push(res);
                res = [];
            } else {
                res.push(`${__dirname}/dataset/space${Math.floor(Math.random() * 6) + 1}.jpg`);
            }
        }
        all.push(res);
        let m = all[0].length;
        for (let i = 1; i < all.length; i += 1) {
            if (all[i].length > m) {
                m = all[i].length;
            }
        }
        if (m < batch_size) {
            m = batch_size;
        }
        for (let i = 0; i < all.length; i += 1) {
            while (all[i].length !== m) {
                all[i].push(`${__dirname}/dataset/space${Math.floor(Math.random() * 6) + 1}.jpg`);
            }
        }
        const k = [];
        for (let i = 0; i < all.length; i += 1) {
            const img = await mergeImg(all[i]);
            k.push(img);
        }
        const blnk_line = [];
        while (blnk_line.length !== m) {
            blnk_line.push(`${__dirname}/dataset/space${Math.floor(Math.random() * 6) + 1}.jpg`);
        }
        const bl = await mergeImg(blnk_line);
        while (k.length % batch_size != 0) {
            k.push(bl);
        }
        const result = new Array(Math.ceil(k.length / batch_size))
            .fill()
            .map(_ => k.splice(0, batch_size));
        const img_arr = [];
        for (let i = 0; i < result.length; i += 1) {
            const image = await mergeImg(result[i], {
                direction: true,
            });
            img_arr.push(await getbuffersync(image));
        }
        const doc = new pdfkit({
            size: [2480, 3508],
            margins: {
                top: 50,
                bottom: 50,
                left: 50,
                right: 50
            }
        });
        for (let i = 0; i < img_arr.length; i += 1) {
            doc.image(img_arr[i], 50, 50, {
                width: 2380,
                height: 3408
            });
            doc.addPage();
        }
        doc.end();
        return doc;
    } else {
        const doc = new pdfkit();
        doc.end();
        return doc;
    }
}
module.exports = main;