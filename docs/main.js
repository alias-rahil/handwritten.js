/* eslint no-undef: "off" */
const text = document.getElementById('text');
const download = document.getElementById('download');
const pdf = document.getElementById('pdf');
const ruled = document.getElementById('ruled');
let w = new Worker('worker.js');

function makepdf() {
  w.terminate();
  w = new Worker('worker.js');
  w.postMessage([text.value, ruled.checked]);
  w.addEventListener('message', (e) => {
    [pdf.src] = e.data;
    download.download = `${pdf.src.slice(4, pdf.src.length)}.pdf`;
    download.href = pdf.src;
  });
}
text.addEventListener('input', makepdf);
ruled.addEventListener('click', makepdf);
makepdf();
