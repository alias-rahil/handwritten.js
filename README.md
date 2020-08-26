<h1 align="center">Welcome to handwritten.js 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/handwritten.js" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/handwritten.js.svg">
  </a>
  <a href="https://github.com/alias-rahil/handwritten.js/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> Convert typed text to realistic handwriting!

# In your code:

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
npx handwritten.js "path/to/inputfile.txt"
```

> Note: Use this method only if you plan to use handwritten.js for one time, installing handwritten.js globally (see-below) is recommended for multiple time usages.

## Installation

```bash
npm install handwritten.js -g
```

> Note: **DO NOT** use sudo to install global packages! The correct way is to tell npm where to install its global packages: `npm config set prefix ~/.local`. Make sure `~/.local/bin` is added to `PATH`.

## Usage after installation

```bash
handwritten.js "path/to/inputfile.txt"
```

# API

## Command line

```bash
handwritten.js path/to/inputfile.txt
handwritten.js path/to/inputfile.txt outputfile=path/to/outputfile.pdf
handwritten.js path/to/inputfile.txt ruled=true
handwritten.js path/to/inputfile.txt outputfile=path/to/outputfile.pdf ruled=false
```

handwritten.js path/to/inputfile.txt [ruled=true|false] [outputfile=path/to/outputfile.pdf]

Default: ruled=false and outputfile=output.pdf

## In code

```javascript
handwritten(rawtext)
handwritten(rawtext, { ruled: true })
handwritten(rawtext, { outputtype: "jpeg/buf" })
handwritten(rawtext, { ruled: true, outputtype: "jpeg/b64" })
```

Default outputtype="pdf". Supported output types are: "pdf", "jpeg/buf", "jpeg/b64", "png/buf" and "png/b64". If the output type is set to "pdf", it returns a promise that will resolve in a [pdfkit](https://github.com/foliojs/pdfkit#readme) document instance. Else it will return a promise that will resolve in an array containing the buffer or base64 value of the images according to the output type you provided.

# Screenshot

<p align="center">
  <img align="center" src="https://raw.githubusercontent.com/alias-rahil/handwritten.js/master/screenshots/lorem-ipsum.jpeg" alt="lorem-ipsum.jpeg">
</p>

# Author

👤 **Rahil Kabani <rahil.kabani.4@gmail.com>**

# Show your support

Give a ⭐️ if this project helped you!

# 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/alias-rahil/handwritten.js/issues).

> handwritten.js only supports English letters. I am not planning to add support for other languages for now. Please do not make issues about this. However, I will merge pull requests if any.

# Credits

[GDGVIT/HandWriter](https://github.com/GDGVIT/HandWriter) - For the cleaned dataset.

# Handwritten.JS

🏠 [Homepage](https://github.com/alias-rahil/handwritten.js#readme)

# License

[MIT](https://github.com/alias-rahil/handwritten.js/blob/master/LICENSE)