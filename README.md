<h1 align="center">✍️ HANDWRITTEN.js</h1>
<h2 align="center">Convert typed text to realistic handwriting</h2>

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-10-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

[![Version](https://img.shields.io/npm/v/handwritten.js.svg)](https://www.npmjs.com/package/handwritten.js)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/alias-rahil/handwritten.js/blob/master/LICENSE)

## Demo

🌐 [handwritten.js](https://alias-rahil.github.io/handwritten.js/)

## Installation

### For browsers:

```html
<script src="https://cdn.jsdelivr.net/gh/alias-rahil/handwritten.js@master/docs/handwritten.js"></script>
```

> This will expose the latest version of `handwritten.js` as a global variable called `handwritten` which you can start using right away. Check the contents of [docs/](https://github.com/alias-rahil/handwritten.js/blob/master/docs/) folder for a simple implementation. For other versions, install the required version with npm and use [browserify](https://www.npmjs.com/package/browserify) to compile it. Optionally, use [babel-minify](https://www.npmjs.com/package/babel-minify) to compress the bundled javascript file.

### For nodejs projects:

```bash
npm install handwritten.js
```

or

```bash
yarn add handwritten.js
```

### Install globally:

```bash
npm install handwritten.js -g
```

or

```bash
yarn global add handwritten.js
```

> Note: **DO NOT** use sudo to install global packages! The correct way is to tell npm where to install its global packages: `npm config set prefix ~/.local`. Make sure `~/.local/bin` is added to `PATH`.

## Usage

### For nodejs projects:

```javascript
const handwritten = require('handwritten.js')
const fs = require('fs')
const rawtext = "Hello, world!"
handwritten(rawtext).then((converted) => {
    converted.pipe(fs.createWriteStream('output.pdf'))
})
```

### CLI usage with npx:

```bash
npx handwritten.js -f "path/to/inputfile.txt" -o "path/to/outputfile.pdf"
```

> Note: Use this method only if you plan to use handwritten.js for one time, installing handwritten.js globally (see-below) is recommended for multiple time usages.

### CLI usage after installing globally:

```bash
handwritten.js -f "path/to/inputfile.txt" -o "path/to/outputfile.pdf"
```

## API

### Command line

```bash
handwritten.js -f path/to/inputfile.txt -o path/to/outputfile.pdf
handwritten.js -f path/to/inputfile.txt -o path/to/outputfile.pdf --ruled
handwritten.js -f path/to/inputfile.txt -o path/to/outputfolder --images png
```

Check `--help` or `--version` option for more details.

### In code

```javascript
handwritten(rawtext)
handwritten(rawtext, { ruled: true })
handwritten(rawtext, { outputType: "jpeg/buf" })
handwritten(rawtext, { ruled: true, outputType: "jpeg/b64" })
handwritten(rawtext, { ruled: true, outputType: "jpeg/b64" , inkColor: COLORS.RED})
```

Default outputType: "pdf". Supported output types are: `pdf`, `jpeg/buf`, `jpeg/b64`, `png/buf` and `png/b64`. If the output type is set to `pdf`, it returns a promise that will resolve in a [pdfkit](https://github.com/foliojs/pdfkit#readme) document instance. Else it will return a promise that will resolve in an array containing the buffer or base64 value of the images according to the output type provided. 
Default `inkColor` is `black`, more ink colors are available through `COLORS` under `handwritten.js/constants`

## Screenshot

<p align="center">
  <img align="center" src="https://raw.githubusercontent.com/alias-rahil/handwritten.js/master/screenshots/lorem-ipsum.jpeg" alt="lorem-ipsum.jpeg">
</p>

## Author

👤 **Rahil Kabani <rahil.kabani.4@gmail.com>**

## Show your support

Give a ⭐️ if this project helped you!

## 🤝 Contributing

Contributions, issues and feature requests are welcome! Feel free to check [issues page](https://github.com/alias-rahil/handwritten.js/issues).

> handwritten.js only supports English letters. I am not planning to add support for other languages for now. Please do not any more make issues about this. However, I will merge pull requests if any. See the issue [#18](https://github.com/alias-rahil/handwritten.js/issues/18) for more details.

## Credits

[GDGVIT/HandWriter](https://github.com/GDGVIT/HandWriter) - For the cleaned dataset.

## Handwritten.JS

🏠 [Homepage](https://github.com/alias-rahil/handwritten.js#readme)

## License

[MIT](https://github.com/alias-rahil/handwritten.js/blob/master/LICENSE)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://alias-rahil.github.io/"><img src="https://avatars2.githubusercontent.com/u/59060219?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Rahil Kabani</b></sub></a><br /><a href="https://github.com/alias-rahil/handwritten.js/commits?author=alias-rahil" title="Code">💻</a> <a href="https://github.com/alias-rahil/handwritten.js/commits?author=alias-rahil" title="Documentation">📖</a> <a href="#maintenance-alias-rahil" title="Maintenance">🚧</a></td>
    <td align="center"><a href="http://anthonyng.me"><img src="https://avatars1.githubusercontent.com/u/14035529?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Anthony Ng</b></sub></a><br /><a href="https://github.com/alias-rahil/handwritten.js/commits?author=newyork-anthonyng" title="Documentation">📖</a></td>
    <td align="center"><a href="http://modernjsbyexample.net"><img src="https://avatars0.githubusercontent.com/u/7918387?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ben Junya</b></sub></a><br /><a href="https://github.com/alias-rahil/handwritten.js/commits?author=MrBenJ" title="Code">💻</a> <a href="https://github.com/alias-rahil/handwritten.js/commits?author=MrBenJ" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/hsrambo07"><img src="https://avatars0.githubusercontent.com/u/60664245?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Harsh SInghal</b></sub></a><br /><a href="https://github.com/alias-rahil/handwritten.js/commits?author=hsrambo07" title="Code">💻</a> <a href="#maintenance-hsrambo07" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://github.com/etnnth"><img src="https://avatars3.githubusercontent.com/u/46907310?v=4?s=100" width="100px;" alt=""/><br /><sub><b>etienne</b></sub></a><br /><a href="https://github.com/alias-rahil/handwritten.js/commits?author=etnnth" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/ashikka"><img src="https://avatars.githubusercontent.com/u/58368421?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ashikka Gupta</b></sub></a><br /><a href="#maintenance-ashikka" title="Maintenance">🚧</a> <a href="https://github.com/alias-rahil/handwritten.js/commits?author=ashikka" title="Code">💻</a></td>
    <td align="center"><a href="https://suyashsonawane.me"><img src="https://avatars.githubusercontent.com/u/35629339?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Suyash Sonawane</b></sub></a><br /><a href="https://github.com/alias-rahil/handwritten.js/commits?author=SuyashSonawane" title="Documentation">📖</a> <a href="https://github.com/alias-rahil/handwritten.js/commits?author=SuyashSonawane" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/Vishal-sys-code"><img src="https://avatars.githubusercontent.com/u/68536727?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Vishal Pandey</b></sub></a><br /><a href="https://github.com/alias-rahil/handwritten.js/commits?author=Vishal-sys-code" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/AnirudhBot"><img src="https://avatars.githubusercontent.com/u/78658727?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Anirudh Sharma</b></sub></a><br /><a href="https://github.com/alias-rahil/handwritten.js/commits?author=AnirudhBot" title="Code">💻</a></td>
    <td align="center"><a href="https://www.newtonmunene.dev/"><img src="https://avatars.githubusercontent.com/u/29271333?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Newton Munene</b></sub></a><br /><a href="https://github.com/alias-rahil/handwritten.js/issues?q=author%3Anewtonmunene99" title="Bug reports">🐛</a> <a href="https://github.com/alias-rahil/handwritten.js/commits?author=newtonmunene99" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
