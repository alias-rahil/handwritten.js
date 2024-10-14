const Pdfkit = require("pdfkit");
const unidecode = require("unidecode-plus");
const Jimp = require("jimp");
const Joi = require("joi");
const dataset = require("./dataset.json");
const COLORS = require("./constants");

const supportedOutputTypes = ["jpeg/buf", "png/buf", "jpeg/b64", "png/b64"];
const symbols = " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~".split("").concat(["margin"]);
const resolvedPromises = [];

async function loadSymbols(color) {
  const promises = symbols.map(async (symbol, i) => {
    const symbolPromises = Array.from({ length: 6 }, async (_, j) => {
      const jimpObject = await Jimp.read(Buffer.from(dataset[i][j]));

      if (color && symbol !== "margin") {
        if (color === COLORS.RED) {
          jimpObject.color([{ apply: "red", params: [100] }]);
        } else if (color === COLORS.BLUE) {
          jimpObject.color([{ apply: "blue", params: [100] }]);
        }
      }
      resolvedPromises.push(jimpObject);
      dataset[i][j] = await jimpObject.getBufferAsync(Jimp.MIME_PNG);
    });

    await Promise.all(symbolPromises);
  });
  
  await Promise.all(promises);
}

function wrapText(str, width) {
  if (str.length <= width) return str;

  const lastSpaceIndex = str.lastIndexOf(" ", width);
  if (lastSpaceIndex === -1) return str; // No spaces found

  return `${str.slice(0, lastSpaceIndex)}\n${wrapText(str.slice(lastSpaceIndex + 1), width)}`;
}

function padText(str, batchSize) {
  const lines = str.split("\n");
  const padding = ' '.repeat(batchSize + 1);
  let paddedParagraphs = [];
  let paddedLines = [];

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

  if (paddedLines.length) {
    while (paddedLines.length < batchSize) {
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

function getBatchSize() {
  let batchSize = 10;
  for (let i = 0; i < 176; i++) {
    if (Math.random() < 0.125) { // 1 in 8 chance
      batchSize += 1;
    }
  }
  return batchSize;
}

function processText(rawText) {
  const batchSize = getBatchSize();
  const cleanedText = cleanText(rawText.replace(/\t/g, "     ").replace(/\r|\f|\v/g, "\n"));
  const maxLen = Math.max(...cleanedText.split("\n").map(line => line.length));
  const width = Math.max(maxLen, batchSize);

  const wrappedText = cleanedText.split("\n").map(element => wrapText(element, width));
  return [padText(wrappedText.join("\n"), width), width];
}

function validateArgs(rawText, optionalArgs) {
  const schema = Joi.object({
    rawText: Joi.string().trim().required(),
    outputType: Joi.string().trim().optional(),
    inkColor: Joi.string().trim().allow("red", "blue").optional(),
    ruled: Joi.boolean().optional(),
  });

  const { error } = schema.validate({ ...optionalArgs, rawText });
  return error ? { error: true, message: error.message } : { error: false };
}

function isOutputTypeValid(outputType) {
  return supportedOutputTypes.includes(outputType) || outputType === "pdf";
}

function generateImageArray(str, ruled, width) {
  return str.map(page => {
    const baseImage = new Jimp(18 * width + 100, 50 * width + 100, "#ffffff");
    let y = 50;

    page.forEach((line) => {
      let x = 50;
      line.split("").forEach((character) => {
        const symbolIndex = symbols.indexOf(character);
        baseImage.composite(resolvedPromises[symbolIndex][Math.floor(Math.random() * 6)], x, y);

        if (ruled) {
          baseImage.composite(resolvedPromises[symbols.indexOf("margin")][Math.floor(Math.random() * 6)], x, y);
        }
        x += 18;
      });
      y += 50;
    });
    return baseImage.resize(2480, 3508);
  });
}

async function generateImages(imageArray, outputType) {
  const promises = imageArray.map(image => {
    return outputType.endsWith("/buf") 
      ? image.getBufferAsync(`image/${outputType.slice(0, -4)}`)
      : image.getBase64Async(`image/${outputType.slice(0, -4)}`);
  });

  return Promise.all(promises);
}

function generatePdf(str, ruled, width) {
  const doc = new Pdfkit({ size: [2480, 3508] });

  str.forEach((page) => {
    if (doc) doc.addPage();
    let y = 50;

    page.forEach((line) => {
      let x = 50;
      line.split("").forEach((character) => {
        const symbolIndex = symbols.indexOf(character);
        doc.image(dataset[symbolIndex][Math.floor(Math.random() * 6)], x, y, {
          width: 2380 / width,
          height: 3408 / width,
        });

        if (ruled) {
          doc.image(dataset[symbols.indexOf("margin")][Math.floor(Math.random() * 6)], x, y, {
            width: 2380 / width,
            height: 3408 / width,
          });
        }
        x += 2380 / width;
      });
      y += 3408 / width;
    });
  });

  doc.end();
  return doc;
}

async function main(rawText = "", optionalArgs = {}) {
  const validationResults = validateArgs(rawText, optionalArgs);
  if (validationResults.error) {
    return Promise.reject(new Error(`Invalid arguments: ${validationResults.message}`));
  }

  const { outputType = "pdf", ruled = false, inkColor = null } = optionalArgs;
  
  if (inkColor && !["red", "blue"].includes(inkColor)) {
    return Promise.reject(new Error(`Invalid color specified "${inkColor}". Please choose between red or blue.`));
  }

  await loadSymbols(inkColor);

  if (!isOutputTypeValid(outputType)) {
    return Promise.reject(new Error(`Invalid output type "${outputType}"! Supported types: ${supportedOutputTypes.join(", ")}, default: "pdf".`));
  }

  const [processedText, width] = processText(rawText);
  if (outputType === "pdf") {
    return generatePdf(processedText, ruled, width);
  }

  const imageArray = generateImageArray(processedText, ruled, width);
  return generateImages(imageArray, outputType);
}

module.exports = main;
