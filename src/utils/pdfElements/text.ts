import jsPDF, { TextOptionsLight } from "jspdf";
import { Margins, PDFText, pdfCursor, textElementOverrides} from "../../types";

export function addText(
  doc: jsPDF,
  text: PDFText,
  margins: Margins,
  cursor: pdfCursor,
  sectionWidth?: number,
  field?: any
): {doc: jsPDF, cursor: pdfCursor} {

  const textOverrides: TextOptionsLight | undefined = text.overrides ? {
    align: text.overrides.overrideTextAlignment && text.overrides.align !== null ? 
      text.overrides.align : undefined,
    baseline: text.overrides.overrideTextAlignment && text.overrides.baseline !== null ?
      text.overrides.baseline : undefined,
    angle: text.overrides.rotateElement && text.overrides.angle !== null ?
      text.overrides.angle : undefined,
    rotationDirection: text.overrides.rotateElement && text.overrides.rotationDirection === null ?
      undefined : text.overrides.rotationDirection === '0' ? 0 
      : text.overrides.rotationDirection === '1' ? 1 
      : undefined, 
    charSpace: text.overrides.overrideCharacterSpacing && text.overrides.charSpace !== null ?
      text.overrides.charSpace : undefined,
    lineHeightFactor: text.overrides.overrideLineHeightFactor && text.overrides.lineHeightFactor !== null ?
      text.overrides.lineHeightFactor : undefined,
    maxWidth: text.overrides.multilineText === false && text.overrides.multilineWidth === null ? undefined
      : text.overrides.multilineText && text.overrides.multilineWidth === '100pw' ? doc.internal.pageSize.width - margins?.horz * 2
      : text.overrides.multilineText && text.overrides.multilineWidth === '50pw' ? doc.internal.pageSize.width / 2 - margins?.horz * 1.5
      : text.overrides.multilineText && text.overrides.multilineWidth === '33pw' ? doc.internal.pageSize.width / 3 - margins?.horz * 1.5
      : text.overrides.multilineText && text.overrides.multilineWidth === '25pw' ? doc.internal.pageSize.width / 4 - margins?.horz * 1.5
      : text.overrides.multilineText && text.overrides.multilineWidth === '100sw' && sectionWidth !== undefined ? sectionWidth / 4 - margins?.horz * 1.5
      : text.overrides.multilineText && text.overrides.multilineWidth === '50sw' && sectionWidth !== undefined ? sectionWidth / 4 - margins?.horz * 1.5
      : text.overrides.multilineText && text.overrides.multilineWidth === '33sw' && sectionWidth !== undefined ? sectionWidth / 4 - margins?.horz * 1.5
      : text.overrides.multilineText && text.overrides.multilineWidth === '25sw' && sectionWidth !== undefined ? sectionWidth / 4 - margins?.horz * 1.5
      : text.overrides.multilineText && text.overrides.multilineWidth === 'fill' ? doc.internal.pageSize.width - cursor.xPos - margins?.horz * 2
      : undefined,
    renderingMode: text.overrides.overrideTextRendering && text.overrides.renderingMode !== null ? text.overrides.renderingMode
      : undefined
  } : undefined

  if(text.overrides?.textColorOverride && doc.getTextColor() !== text.overrides.textColor){
    const prevColor = doc.getTextColor()
    text.overrides.textColor ? doc.setTextColor(text.overrides.textColor)
      : doc.setTextColor(prevColor)
  }
  if(text.overrides?.fontOverride && text.overrides.fontSelection){
    doc.setFont(text.overrides.fontSelection)
  }

  if(text.overrides?.overrideFontSize && text.overrides.fontSize){
    doc.setFontSize(text.overrides.fontSize)
  }

  if(text.overrides?.overrideLineHeightFactor && text.overrides.lineHeightFactor){
    doc.setLineHeightFactor(text.overrides.lineHeightFactor)
  }

  let input: string = 'Error'
  if (text.label) {
    input = `${text.label}`
  }
  if ( text.value ){
    input = input !== 'Error' ? `${input} ${text.value}` : `${text.value}`
  } else if ( text.sourceField ) {
    input = input !== 'Error' ? `${input} ${field}` : `${field}`
  }

  let pdfCursor = cursor

  doc.text(input,pdfCursor.xPos,pdfCursor.yPos, textOverrides)

  return {doc: doc, cursor: pdfCursor}
}