const mergeImg = require('merge-img');

const symbols = '!?"()@&*[]<>{}.,:;-\'';
const alphanuml = 'qwertyuiopasdfghjklzxcvbnm1234567890';
const alphanumu = 'QWERTYUIOPASDFGHJKLZXCVBNM';

async function main(text) {
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
        res.push(`${__dirname}/dataset/space.jpg`);
      } else if (text[i] === '\n') {
        if (res.length !== 0) {
          all.push(res);
          res = [];
        }
      } else {
        res.push(`${__dirname}/dataset/unk.jpg`);
      }
    }
    if (res.length !== 0) {
      all.push(res);
    }
    if (all.length !== 0) {
      let m = all[0].length;
      for (let i = 1; i < all.length; i += 1) {
        if (all[i].length > m) {
          m = all[i].length;
        }
      }
      for (let i = 0; i < all.length; i += 1) {
        while (all[i].length !== m) {
          all[i].push(`${__dirname}/dataset/space.jpg`);
        }
      }
      const k = [];
      for (let i = 0; i < all.length; i += 1) {
        const img = await mergeImg(all[i]);
        k.push(img);
      }
      const img2 = await mergeImg(k, {
        direction: true,
      });
      return img2;
    }
  } else {
    return null;
  }
  return null;
}
module.exports = main;
