/* eslint no-undef: "off" */
/* eslint no-array-constructor: "off" */
const text = document.getElementById('text');
const download = document.getElementById('download');
const pdf = document.getElementById('pdf');
const ruled = document.getElementById('ruled');
const w = new Worker('worker.js');

function makepdf() {
  w.postMessage(new Array(text.value, ruled.checked));
}
text.addEventListener('input', debounce(makepdf, 500));
ruled.addEventListener('click', makepdf);
w.addEventListener('message', (e) => {
  if (e.data[1][0] === text.value) {
    if (e.data[1][1] === ruled.checked) {
      [pdf.src] = e.data;
      download.download = `${pdf.src.slice(4, pdf.src.length)}.pdf`;
      download.href = pdf.src;
    }
  }
});
