/* eslint no-undef: "off" */
const text = document.getElementById('text');
const download = document.getElementById('download');
const pdf = document.getElementById('pdf');
const ruled = document.getElementById('ruled');
const w = new Worker('worker.js');
const w2 = new Worker('workerruled.js');
function makepdf() {
  if (ruled.checked) {
    w2.postMessage(text.value);
  } else {
    w.postMessage(text.value);
  }
}
function displaypdf(e) {
  pdf.src = e.data;
  download.download = `${pdf.src.slice(4)}.pdf`;
  download.href = pdf.src;
}
text.addEventListener('input', debounce(makepdf));
ruled.addEventListener('click', makepdf);
w.addEventListener('message', displaypdf);
w2.addEventListener('message', displaypdf);
makepdf();
