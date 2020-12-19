// const saveAs = require("./FileSaver");

const generatePDF = async (name)=>{
    const {PDFDocument, rgb} = PDFLib;

    const exBytes = await fetch("badge.pdf").then((res)=>{
        return res.arrayBuffer();
    });

    const exFont = await fetch("/font/SourceSansPro-SemiBold.ttf").then(res =>{
        return res.arrayBuffer();
    })




    const pdfDoc=await PDFDocument.load(exBytes);
    pdfDoc.registerFontkit(fontkit);
    const myFont = await pdfDoc.embedFont(exFont);

    const pages = pdfDoc.getPages();

    const firstpg = pages[0];
    firstpg.drawText(name,{
        x:180,
        y:55,
        size:27,
        font: myFont,
        // color: rgb(0.2,0.84,0.67)
    })

    const uri = await pdfDoc.saveAsBase64({dataUri: true});
    saveAs(uri,"Developer Badge.pdf",{autoBom: true});

    // window.open(uri)
    // document.querySelector("#mypdf").src=uri;
};

const submitBtn = document.getElementById("submit");
const inputVal = document.querySelector("#name");

submitBtn.addEventListener("click", ()=>{
    const val= inputVal.value;
    generatePDF(val);
    // alert(val);
});

