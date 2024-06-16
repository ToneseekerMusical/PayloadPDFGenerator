import jsPDF from "jspdf"

export default function initPDF(options: any): jsPDF{
  const file = new jsPDF(options)
  return file
}