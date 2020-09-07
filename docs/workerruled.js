/* eslint no-undef: "off" */
/* eslint no-restricted-globals: "off" */
self.addEventListener('message', async (e) => {
  self.importScripts('handwritten.js', 'blobstream.js');
  const doc = await handwritten(e.data, {
    ruled: true,
  });
  const stream = doc.pipe(blobStream());
  stream.on('finish', () => {
    self.postMessage(stream.toBlobURL('application/pdf'));
  });
});
