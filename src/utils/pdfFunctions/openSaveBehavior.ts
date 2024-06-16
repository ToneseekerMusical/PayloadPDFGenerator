import jsPDF from "jspdf"

function savePDF(doc: jsPDF, filename: {reportName: string, fileNameField: string}){
  setTimeout(() => {
    let fileNameString = filename.reportName
    fileNameString = filename.fileNameField ? `${fileNameString} ${filename.fileNameField}` : filename.fileNameField

    doc.save(`${fileNameString}`)
  }, 500)
}

function autoPrintPDF(doc: jsPDF){
  //None of these currently work, maybe it's due to an empty doc
  //doc.autoPrint({variant: "javascript"})
  //doc.autoPrint({variant: "non-conform"})
  doc.autoPrint()
}

function openInCurrentTab(doc: jsPDF){
  setTimeout(() => {
    doc.output('datauri')
  }, 500)
}

function openInNewTab(doc: jsPDF){
  setTimeout(() => {
    
    doc.output('dataurlnewwindow')
  }, 500)
}

export function outputPDF(buttonBehavior:string, doc: jsPDF, filename?: {reportName: string, fileNameField: string} | undefined){
  buttonBehavior === 'download' && filename !== undefined ? savePDF(doc, filename) :
  buttonBehavior === 'newTab' ? openInNewTab(doc) :
  buttonBehavior === 'curTab' ? openInCurrentTab(doc) :
  buttonBehavior === 'autoprint' ? autoPrintPDF(doc) : 
  null
}