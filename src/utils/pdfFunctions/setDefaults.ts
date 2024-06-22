import jsPDF from "jspdf";
import { pdfDefaults } from "../../types";

export function setDefaults(doc: jsPDF, defaults: pdfDefaults): jsPDF{
  doc.setDisplayMode(defaults.displayMode.zoom,defaults.displayMode.layout,defaults.displayMode.pmode)
  
  doc.setR2L(defaults.rightToLeft)
  doc.setLineCap(defaults.path.lineCap)
  doc.setLineJoin(defaults.path.lineJoin)
  doc.setFillColor(defaults.path.fillColor)
  doc.setDrawColor(defaults.path.drawColor)
  doc.setLineWidth(defaults.path.lineWidth)

  doc.setFont(defaults.font.font.fontName)
  doc.setFontSize(defaults.font.fontSize)
  doc.setLineHeightFactor(defaults.font.lineHeightFactor)
  doc.setTextColor(defaults.font.textColor)
  doc.setCharSpace(defaults.font.charSpace)
  return doc
}