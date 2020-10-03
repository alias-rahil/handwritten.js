<h1 align="center">Welcome to handwritten.js 👋</h1>
<h3 align="center">Convert typed text to realistic handwriting!</h3>

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

[![Version](https://img.shields.io/npm/v/handwritten.js.svg)](https://www.npmjs.com/package/handwritten.js)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/alias-rahil/handwritten.js/blob/master/LICENSE)

<br>

<p align="center">
  <a href="https://alias-rahil.github.io/handwritten.js/">
    demo
  </a>
  <br>
  Warning: ugly website ahead! HTML and CSS went AWOL :P. This is a temporary website made for desperate times while we wait for a proper demo-site, see <a href="https://github.com/alias-rahil/handwritten.js/issues/8">#8</a>.
</p>

# In your code:

To use in browser, include `<script src="https://raw.githubusercontent.com/alias-rahil/handwritten.js/master/docs/handwritten.js"></script>` in one of your html files to get the latest version of `handwritten.js`. This will expose a global variable called `handwritten` which you can start using right away. Check the contents of [docs/](https://github.com/alias-rahil/handwritten.js/blob/master/docs/) folder for a simple implementation. For other versions, install the required version with npm and use [browserify](https://www.npmjs.com/package/browserify) to compile it. Optionally, use [babel-minify](https://www.npmjs.com/package/babel-minify) to compress the bundled javascript file.

## Installation

```bash
npm install --save handwritten.js
```

## Usage

```javascript
const handwritten = require('handwritten.js')
const fs = require('fs')
const rawtext = "Hello, world!"
handwritten(rawtext).then((converted) => {
    converted.pipe(fs.createWriteStream('output.pdf'))
})
```

# Command line usage:

## Using without installation

```bash
npx handwritten.js -f "path/to/inputfile.txt" -o "path/to/outputfile.pdf"
```

> Note: Use this method only if you plan to use handwritten.js for one time, installing handwritten.js globally (see-below) is recommended for multiple time usages.

## Installation

```bash
npm install handwritten.js -g
```

> Note: **DO NOT** use sudo to install global packages! The correct way is to tell npm where to install its global packages: `npm config set prefix ~/.local`. Make sure `~/.local/bin` is added to `PATH`.

## Usage after installation

```bash
handwritten.js -f "path/to/inputfile.txt" -o "path/to/outputfile.pdf"
```

# API

## Command line

```bash
handwritten.js -f path/to/inputfile.txt -o path/to/outputfile.pdf
handwritten.js -f path/to/inputfile.txt -o path/to/outputfile.pdf --ruled
handwritten.js -f path/to/inputfile.txt -o path/to/outputfolder --images png
```

Check `--help` or `--version` option for more details.

## In code

```javascript
handwritten(rawtext)
handwritten(rawtext, { ruled: true })
handwritten(rawtext, { outputtype: "jpeg/buf" })
handwritten(rawtext, { ruled: true, outputtype: "jpeg/b64" })
```

Default outputtype: "pdf". Supported output types are: `pdf`, `jpeg/buf`, `jpeg/b64`, `png/buf` and `png/b64`. If the output type is set to `pdf`, it returns a promise that will resolve in a [pdfkit](https://github.com/foliojs/pdfkit#readme) document instance. Else it will return a promise that will resolve in an array containing the buffer or base64 value of the images according to the output type provided.

# Screenshot

<p align="center">
  <img align="center" src="https://raw.githubusercontent.com/alias-rahil/handwritten.js/master/screenshots/lorem-ipsum.jpeg" alt="lorem-ipsum.jpeg">
</p>

# Author

👤 **Rahil Kabani <rahil.kabani.4@gmail.com>**

# Show your support

Give a ⭐️ if this project helped you!

# 🤝 Contributing

Contributions, issues and feature requests are welcome! Feel free to check [issues page](https://github.com/alias-rahil/handwritten.js/issues).

> handwritten.js only supports English letters. I am not planning to add support for other languages for now. Please do not any more make issues about this. However, I will merge pull requests if any. See the issue [#18](https://github.com/alias-rahil/handwritten.js/issues/18) for more details.

# Credits

[GDGVIT/HandWriter](https://github.com/GDGVIT/HandWriter) - For the cleaned dataset.

# Handwritten.JS

🏠 [Homepage](https://github.com/alias-rahil/handwritten.js#readme)

# License

[MIT](https://github.com/alias-rahil/handwritten.js/blob/master/LICENSE)

# Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://alias-rahil.github.io/"><img src="https://avatars2.githubusercontent.com/u/59060219?v=4" width="100px;" alt=""/><br /><sub><b>Rahil Kabani</b></sub></a><br /><a href="https://github.com/alias-rahil/handwritten.js/commits?author=alias-rahil" title="Code">💻</a> <a href="https://github.com/alias-rahil/handwritten.js/commits?author=alias-rahil" title="Documentation">📖</a></td>
    <td align="center"><a href="http://anthonyng.me"><img src="https://avatars1.githubusercontent.com/u/14035529?v=4" width="100px;" alt=""/><br /><sub><b>Anthony Ng</b></sub></a><br /><a href="https://github.com/alias-rahil/handwritten.js/commits?author=newyork-anthonyng" title="Documentation">📖</a></td>
    <td align="center"><a href="http://modernjsbyexample.net"><img src="https://avatars0.githubusercontent.com/u/7918387?v=4" width="100px;" alt=""/><br /><sub><b>Ben Junya</b></sub></a><br /><a href="https://github.com/alias-rahil/handwritten.js/commits?author=MrBenJ" title="Code">💻</a> <a href="https://github.com/alias-rahil/handwritten.js/commits?author=MrBenJ" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!