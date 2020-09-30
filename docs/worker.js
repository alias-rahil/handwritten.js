/* eslint no-undef: "off" */
self.importScripts('handwritten.js', 'blobstream.js')
self.addEventListener('message', async (e) => {
  const doc = await handwritten(e.data[0], {
    ruled: e.data[1]
  })
  const stream = doc.pipe(blobStream())
  stream.on('finish', () => {
    self.postMessage(stream.toBlobURL('application/pdf'))
  })
})
