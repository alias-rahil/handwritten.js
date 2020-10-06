/* eslint no-unused-vars: "off" */
const text = document.getElementById('text')
const download = document.getElementById('download')
const pdf = document.getElementById('pdf')
const ruled = document.getElementById('ruled')
let cleared = false
let w = new Worker('worker.js')

function makepdf () {
  w.terminate()
  w = new Worker('worker.js')
  w.postMessage([text.value, ruled.checked])
  w.addEventListener('message', (e) => {
    pdf.src = e.data
    download.download = `${pdf.src.slice(4, pdf.src.length)}.pdf`
    download.href = pdf.src
  })
}

function clearContents (element) {
  if (!cleared) {
    element.value = ''
    makepdf()
  }
  if (!cleared) {
    cleared = true
  }
}

text.addEventListener('input', makepdf)
ruled.addEventListener('click', makepdf)
makepdf()
