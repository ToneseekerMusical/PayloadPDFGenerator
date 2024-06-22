import jsPDF, { TextOptionsLight } from "jspdf";
import { Margins, pdfCursor, textOverrides } from "../../types";

export function addText(
  doc: jsPDF,
  cursor: pdfCursor,
  textValue: string,
  overrides: textOverrides,
  margins: Margins,
  sectionWidth?: number,
): jsPDF {
  overrides.align
  const textOverrides: TextOptionsLight = {
    align: overrides.align !== null ? overrides.align 
      : undefined,
    baseline: overrides.baseline !== null ? overrides.baseline
      : undefined,
    angle: overrides.angle !== null ? overrides.angle
      : undefined,
    rotationDirection: overrides.rotationDirection === null ? undefined
      : overrides.rotationDirection === '0' ? 0 
      : overrides.rotationDirection === '1' ? 1 
      : undefined, 
    charSpace: overrides.charSpace !== null ? overrides.charSpace
      : undefined,
    lineHeightFactor: overrides.lineHeightFactor !== null ? overrides.lineHeightFactor
      : undefined,
    maxWidth: overrides.multilineWidth === null ? undefined
      : overrides.multilineWidth === '100pw' ? doc.internal.pageSize.width - margins?.horz * 2
      : overrides.multilineWidth === '50pw' ? doc.internal.pageSize.width / 2 - margins?.horz * 1.5
      : overrides.multilineWidth === '33pw' ? doc.internal.pageSize.width / 3 - margins?.horz * 1.5
      : overrides.multilineWidth === '25pw' ? doc.internal.pageSize.width / 4 - margins?.horz * 1.5
      : overrides.multilineWidth === '100sw' && sectionWidth !== undefined ? sectionWidth / 4 - margins?.horz * 1.5
      : overrides.multilineWidth === '50sw' && sectionWidth !== undefined ? sectionWidth / 4 - margins?.horz * 1.5
      : overrides.multilineWidth === '33sw' && sectionWidth !== undefined ? sectionWidth / 4 - margins?.horz * 1.5
      : overrides.multilineWidth === '25sw' && sectionWidth !== undefined ? sectionWidth / 4 - margins?.horz * 1.5
      : overrides.multilineWidth === 'fill' ? doc.internal.pageSize.width - cursor.xPos - margins?.horz * 2
      : undefined,
    renderingMode: overrides.renderingMode !== null ? overrides.renderingMode
      : undefined
  }
  
  console.log(doc.getTextColor())
  if(overrides.textColorOverride && overrides.textColor && doc.getTextColor() !== overrides.textColor){
    doc.setTextColor(overrides.textColor)
  }
  console.log(doc.getFont())
  if(overrides.fontOverride && overrides.fontSelection && doc.getFont().fontName !== overrides.fontSelection){

  }
  doc.text(textValue,cursor.xPos,cursor.yPos,textOverrides)
  return doc
}