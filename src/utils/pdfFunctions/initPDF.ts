import jsPDF, { jsPDFOptions } from "jspdf"

export default function initPDF(options: jsPDFOptions): jsPDF{
  const file = new jsPDF(options)
  return file
}