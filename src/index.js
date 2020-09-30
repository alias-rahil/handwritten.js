const Pdfkit = require('pdfkit');
const unidecode = require('unidecode-plus');
const Jimp = require('jimp');
const dataset = require('./dataset.json');

const supportedOutputTypes = ['jpeg/buf', 'png/buf', 'jpeg/b64', 'png/b64'];
const symbols = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~'
  .split('').concat(['margin']);

const jimpObjectPromises = [];

for (let i = 0; i < symbols.length; i += 1) {
  for (let j = 0; j < 6; j += 1) {
    jimpObjectPromises.push(Jimp.read(Buffer.from(dataset[i][j])));
  }
}

let jimpObjects;

function wrapText(str, width) {
  if (str.length > width) {
    let p = width;
    while (p > 0 && str[p] !== ' ') {
      p -= 1;
    }
    if (p > 0) {
      const left = str.substring(0, p);
      const right = str.substring(p + 1);
      return `${left}\n${wrapText(right, width)}`;
    }
  }
  return str;
}

function findMaxLen(lines) {
  let width = lines[0] ? lines[0].length : 0;
  for (let i = 1; i < lines.length; i += 1) {
    if (lines[i] && lines[i].length > width) {
      width = lines[i].length;
    }
  }
  return width;
}

function padText(str, batchSize) {
  const lines = str.split('\n');
  const padding = Array.from({ length: batchSize + 1 }).join(' ');
  let paddedLines = [];
  const paddedParagraphs = [];
  lines.forEach((element) => {
    if (element) {
      paddedLines.push((element + padding).substring(0, batchSize));
    } else {
      paddedLines.push(padding);
    }
    if (paddedLines.length === batchSize) {
      paddedParagraphs.push(paddedLines);
      paddedLines = [];
    }
  });
  if (paddedLines.length !== 0) {
    while (paddedLines.length !== batchSize) {
      paddedLines.push(padding);
    }
    paddedParagraphs.push(paddedLines);
  }
  return paddedParagraphs;
}

function cleanText(rawText) {
  return unidecode(rawText, {
    german: true,
    smartSpacing: true,
  }).trim();
}

function randInt(n) {
  return Math.floor(Math.random() * n);
}

function getBatchSize() {
  let batchSize = 10;
  for (let i = 0; i < 176; i += 1) {
    if (randInt(8) === 1) {
      batchSize += 1;
    }
  }
  return batchSize;
}

function processText(rawText) {
  const batchSize = getBatchSize();
  const str = cleanText(rawText
    .replace('\t', '     ')
    .replace('\r', '\n')
    .replace('\f', '\n')
    .replace('\v', '\n'));
  const maxLen = findMaxLen(str.replace('\n', ' ').split(' '));
  const width = maxLen > batchSize ? maxLen : batchSize;
  const wrappedText = [];
  str.split('\n').forEach((element) => {
    wrappedText.push(wrapText(element, width));
  });
  return [padText(wrappedText.join('\n'), width), width];
}

async function generatePdf(imageArray) {
  const promisesToKeep = [];
  imageArray.forEach((image) => {
    if (randInt(2) === 1) {
      promisesToKeep.push(image.getBufferAsync(Jimp.AUTO));
    } else {
      promisesToKeep.push(image.getBase64Async(Jimp.AUTO));
    }
  });
  const imgArray = await Promise.all(promisesToKeep);
  const doc = new Pdfkit({
    size: [2480, 3508],
    margins: {
      top: 50,
      bottom: 50,
      left: 50,
      right: 50,
    },
  });
  for (let i = 0; i < imgArray.length; i += 1) {
    doc.image(imgArray[i], 50, 50);
    if (i !== imgArray.length - 1) {
      doc.addPage();
    }
  }
  doc.end();
  return doc;
}

function checkArgType(rawText, optionalArgs) {
  if (typeof (optionalArgs) !== 'object') {
    return false;
  }
  if (typeof (rawText) !== 'string') {
    return false;
  }
  if (typeof (optionalArgs.outputtype) !== 'string' && typeof (optionalArgs
    .outputtype) !== 'undefined') {
    return false;
  }
  if (typeof (optionalArgs.ruled) !== 'boolean' && typeof (optionalArgs
    .ruled) !== 'undefined') {
    return false;
  }
  if (typeof (optionalArgs.ruled) === 'boolean' && typeof (optionalArgs
    .outputtype) === 'string' && Object.keys(optionalArgs).length
        !== 2) {
    return false;
  }
  if (typeof (optionalArgs.ruled) === 'boolean' && typeof (optionalArgs
    .outputtype) === 'undefined' && Object.keys(optionalArgs).length
        !== 1) {
    return false;
  }
  if (typeof (optionalArgs.ruled) === 'undefined' && typeof (optionalArgs
    .outputtype) === 'string' && Object.keys(optionalArgs).length
        !== 1) {
    return false;
  }
  if (typeof (optionalArgs.ruled) === 'undefined' && typeof (optionalArgs
    .outputtype) === 'undefined' && Object.keys(optionalArgs).length
        !== 0) {
    return false;
  }
  return true;
}

function isArgValid(outputType) {
  return supportedOutputTypes.concat(['pdf']).includes(outputType);
}

function generateImageArray(str, ruled, width) {
  const imgArray = [];
  str.forEach((page) => {
    const baseImage = new Jimp(18 * width, 50 * width);
    let y = 0;
    page.forEach((line) => {
      let x = 0;
      line.split('').forEach((character) => {
        if (symbols.includes(character)) {
          baseImage.composite(jimpObjects[symbols.indexOf(character)][randInt(6)], x, y);
        } else {
          baseImage.composite(jimpObjects[symbols.indexOf(' ')][randInt(6)], x, y);
        }
        if (ruled) {
          baseImage.composite(jimpObjects[symbols.indexOf('margin')][randInt(6)], x, y);
        }
        x += 18;
      });
      y += 50;
    });
    imgArray.push(baseImage.resize(2380, 3408));
  });
  return imgArray;
}

function generateImages(imageArray, outputType) {
  const promisesToKeep = [];
  imageArray.forEach((image) => {
    if (outputType.slice(-4, outputType.length) === '/buf') {
      promisesToKeep.push(image.getBufferAsync(`image/${outputType.slice(0, -4)}`));
    } else {
      promisesToKeep.push(image.getBase64Async(`image/${outputType.slice(0, -4)}`));
    }
  });
  return Promise.all(promisesToKeep);
}

async function main(rawText = '', optionalArgs = {}) {
  if (!checkArgType(rawText, optionalArgs)) {
    throw Object.assign(new Error('Invalid arguments!'), {});
  } else {
    const outputType = optionalArgs.outputtype || 'pdf';
    const ruled = optionalArgs.ruled || false;
    if (!isArgValid(outputType)) {
      throw Object.assign(new Error(
        `Invalid output type "${outputType}"!`,
      ), {
        supportedOutputTypes: supportedOutputTypes.concat([
          'pdf',
        ]),
        default: 'pdf',
      });
    } else {
      if (typeof (jimpObjects) === 'undefined') {
        const resolvedPromises = await Promise.all(jimpObjectPromises);
        jimpObjects = {};
        for (let i = 0; i < symbols.length; i += 1) {
          jimpObjects[i] = [];
          for (let j = 0; j < 6; j += 1) {
            jimpObjects[i].push(resolvedPromises[6 * i + j]);
          }
        }
      }
      const [str, width] = processText(rawText);
      const imageArray = generateImageArray(str, ruled, width);
      if (outputType === 'pdf') {
        return generatePdf(imageArray);
      }
      return generateImages(imageArray, outputType);
    }
  }
}

module.exports = main;
