/* eslint no-undef: "off" */
self.importScripts('handwritten.js', 'blobstream.js')
self.addEventListener('message', async (e) => {
  // if (e.data.length == 2)
  let doc
  if (e.data[2] !== 'black') {
    doc = await handwritten(e.data[0], {
      ruled: e.data[1],
      inkColor: e.data[2]
    })
  } else {
    doc = await handwritten(e.data[0], {
      ruled: e.data[1]
    })
  }

  const stream = doc.pipe(blobStream())
  stream.on('finish', () => {
    self.postMessage(stream.toBlobURL('application/pdf'))
  })
})
