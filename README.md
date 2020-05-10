<h1 align="center">Welcome to handwritten.js 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/handwritten.js" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/handwritten.js.svg">
  </a>
  <a href="https://github.com/alias-rahil/handwritten.js/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> Convert text to handwritten!

# In your code:

## Installation

```bash
npm install --save handwritten.js
```

## Usage

```javascript
const handwritten = require('handwritten.js');
(async function(text) {
    let converted = await handwritten(text);
    if (handwritten) {
        converted.write("output.jpg");
    } else {
        console.log("The text was empty!");
    }
})("Hello, world!");
```

> Note: The function 'handwritten' returns a jimp object if the text is non-empty, else it returns a null value.

# Command line usage:

## Using without installation

```bash
npx handwritten.js "/absolute/path/to/file.txt"
```

> Note: Use this method only if you plan to use handwritten.js for one time, installing handwritten.js globally (see-below) is recommended for multiple time usages.

## Installation

```bash
npm install handwritten.js -g
```

> Note: **DO NOT** use sudo to install global packages! The correct way to do it is to tell npm where to install it's global packages: `npm config set prefix ~/.local`. Make sure `~/.local/bin` is added to `PATH`.

## Usage after installation
 
```bash
handwritten.js "/absolute/path/to/file.txt"
```

# API

## Command line

It takes a single argument as the path to the text file (specifying absolute path is recommended), and, if everything goes smoothly, saves the output image as 'output.jpg'.

## In code

It takes a single argument as a string and returns a jimp object if the text is non-empty, else it returns a null value.

# Author

👤 **Rahil Kabani <rahil.kabani.4@gmail.com>**

# Show your support

Give a ⭐️ if this project helped you!

# 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/alias-rahil/handwritten.js/issues).

# Lyrics-Finder

🏠 [Homepage](https://github.com/alias-rahil/handwritten.js#readme)

# License

[MIT](https://github.com/alias-rahil/handwritten.js/blob/master/LICENSE)
