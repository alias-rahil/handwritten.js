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
(async function(text) {
    const converted = await handwritten(text)
    converted.pipe(fs.createWriteStream('output.pdf'))
})("Hello, world!")
```

# Command line usage:

## Using without installation

```bash
npx handwritten.js "relative/path/to/file.txt"
```

> Note: Use this method only if you plan to use handwritten.js for one time, installing handwritten.js globally (see-below) is recommended for multiple time usages.

## Installation

```bash
npm install handwritten.js -g
```

> Note: **DO NOT** use sudo to install global packages! The correct way is to tell npm where to install its global packages: `npm config set prefix ~/.local`. Make sure `~/.local/bin` is added to `PATH`.

## Usage after installation

```bash
handwritten.js "/absolute/path/to/file.txt"
```

# API

## Command line

```bash
handwritten.js path/to/input.txt path/to/output.pdf
```

The second argument is optional. If not specified, the output pdf will be saved as `output.pdf` in the current directory.

## In code

```javascript
await handwritten(inputText, outputType)
```

The second argument is optional. If not specified, it will default to "pdf". Supported output types are: "pdf", "jpeg/buf", "jpeg/b64", "png/buf" and "png/b64". If the output type is set to "pdf", it returns a promise that will resolve in a [pdfkit](https://github.com/foliojs/pdfkit#readme) document instance. Else it will return a promise that will resolve in an array containing the buffer or base64 value of the images according to the output type you provided.

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

# Credits

[GDGVIT/HandWriter](https://github.com/GDGVIT/HandWriter) - For the cleaned dataset.

# Handwritten.JS

🏠 [Homepage](https://github.com/alias-rahil/handwritten.js#readme)

# License

[MIT](https://github.com/alias-rahil/handwritten.js/blob/master/LICENSE)
