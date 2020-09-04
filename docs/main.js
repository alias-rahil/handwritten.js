const text = document.getElementById("text");
const download = document.getElementById("download");
const pdf = document.getElementById("pdf");
const ruled = document.getElementById("ruled");
const makepdf = async function() {
    const doc = await handwritten(text.value, {
        ruled: ruled.checked
    });
    const stream = doc.pipe(blobStream());
    stream.on('finish', function() {
        pdf.src = stream.toBlobURL('application/pdf');
        download.download = pdf.src.slice(4) + ".pdf";
        download.href = pdf.src;
    });
};
const handWrite = debounce(makepdf);
text.addEventListener("input", handWrite);
ruled.addEventListener("click", makepdf);