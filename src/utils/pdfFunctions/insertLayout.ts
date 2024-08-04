import jsPDF from "jspdf";
import { Margins, pdfCursor } from "../../types";

export async function insertLayout(doc: jsPDF, global: string, layoutName: string, margins: Margins): Promise<{doc:jsPDF,cursor:pdfCursor}>{

  var layouts = global === 'pdf-header' ? 'pdf-global-section-layouts' : global === 'pdf-footer' ? 'pdf-global-section-layouts' : null
  var type = global === 'pdf-header' ? 'pdfHeaderLayout' : global === 'pdf-footer' ? 'pdfFooterLayout' : null
  const cursor: pdfCursor = {
    xPos: margins.horz,
    yPos: margins.vert
  }

  try {
    const response = await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/globals/${layouts !== null ? layouts : global}`)
    const data = await response.json()
    var layout = data.layouts.filter((layout: any) => {
      return layout.layoutName === layoutName
    })[0]

    const settings = layout.layoutSettings
    const dimensions = layout.layoutSettings.dimensions
    const borders = layout.layoutSettings.borders
    const position = layout.layoutSettings.position
    const background = layout.layoutSettings.background

    const fields = layout.layoutFields

    const relativeCalc = (direction: 'height' | 'width', relativeSetting: string | 'fill', ignoreMargins: boolean): number => {
      var dimension: number

      if (relativeSetting.includes('pw')){
        var relWidth: number = parseInt(dimensions.relativeWidth.slice(0,dimensions.relativeWidth.length-2))/100
        dimension = ignoreMargins ? doc.internal.pageSize.width * relWidth : (doc.internal.pageSize.width - margins.horz * 2) * relWidth
      }else if (relativeSetting.includes('sw')){
        //write logic
        dimension = 0
      }else if (relativeSetting.includes('ph')){
        //write logic
        dimension = 0
      }else if (relativeSetting.includes('sh')){
        //write logic
        dimension = 0
      }else if (relativeSetting === 'fill'){
        //write logic
        dimension = 0
      }else {
        dimension = 0
      }

      return dimension
    }

    const sectionDims: {xDim: number, yDim: number} = {
      xDim: dimensions.widthType === 'fixed' ? dimensions.fixedWidth : relativeCalc('width',dimensions.relativeWidth, background.ignoreMargins),
      yDim: dimensions.heightType === 'fixed' ? dimensions.fixedHeight : relativeCalc('height',dimensions.relativeHeight, background.ignoreMargins),
    }

    const insertBackground = (doc: jsPDF, backgroundType: 'solid' | 'image', ignoreMargins: boolean, backgroundColor?:string, backgroundURL?:string): jsPDF => {
      var backgroundCursor: pdfCursor = {
        xPos: ignoreMargins ? 0 : margins.horz,
        yPos: ignoreMargins ? 0 : margins.vert
      }

      if (backgroundType === 'solid'){
        backgroundColor ? doc.setDrawColor(backgroundColor) : null
        backgroundColor ? doc.setFillColor(backgroundColor) : null
        doc.rect(backgroundCursor.xPos,backgroundCursor.yPos,sectionDims.xDim,sectionDims.yDim,'FD')
      }
      return doc
    }

    console.log(borders)

    const insertBorder = (doc: jsPDF, location: 'top' | 'bottom' | 'left' | 'right', borderSettings: any, cursor?: pdfCursor ): jsPDF => {
      const borderCalc = (): {xDim1: number, xDim2:number, yDim1: number, yDim2: number} => {
        var yDim1 = 0
        var yDim2 = 0
        var xDim1 = 0
        var xDim2 = 0
        switch(location !== null){
          case location === 'top':
            yDim1 = background.ignoreMargins === true ? 0 : margins.vert
            yDim2 = background.ignoreMargins === true ? 0 : margins.vert
            xDim1 = background.ignoreMargins === true ? 0 : margins.horz
            xDim2 = background.ignoreMargins === true ? doc.internal.pageSize.width : doc.internal.pageSize.width - margins.horz
            break;
          case location === 'bottom':
            yDim1 = sectionDims.yDim
            yDim2 = sectionDims.yDim
            xDim1 = background.ignoreMargins === true ? 0 : margins.horz
            xDim2 = background.ignoreMargins === true ? doc.internal.pageSize.width : doc.internal.pageSize.width - margins.horz
            break;
          case location === 'right':
            yDim1 = background.ignoreMargins === true ? 0 : margins.vert
            yDim2 = sectionDims.yDim
            xDim1 = background.ignoreMargins === true ? doc.internal.pageSize.width : doc.internal.pageSize.width - margins.horz
            xDim2 = background.ignoreMargins === true ? doc.internal.pageSize.width : doc.internal.pageSize.width - margins.horz
            break;
          case location === 'left':
            yDim1 = background.ignoreMargins === true ? 0 : margins.vert
            yDim2 = sectionDims.yDim
            xDim1 = background.ignoreMargins === true ? 0 : margins.horz
            xDim2 = background.ignoreMargins === true ? 0 : margins.horz
            break;
        }
        return {xDim1, xDim2, yDim1, yDim2}
      }
      const borderDims = borderCalc()
      doc.setLineWidth(borderSettings.borderThickness)
      doc.setDrawColor(borderSettings.borderStrokeColor)
      doc.line(borderDims.xDim1,borderDims.yDim1,borderDims.xDim2,borderDims.yDim2)

      return doc
    }

    const flow = (increment: number, lineHeight: number) => {
      if (layout.layoutSettings.layoutFlow === 'row'){
        if (cursor.xPos + increment < doc.internal.pageSize.width-margins.horz){
          cursor.xPos = cursor.xPos + increment
        } else {
          cursor.xPos = margins.horz
          cursor.yPos = cursor.yPos + lineHeight
        }
      } else if (layout.layoutSettings.layoutFlow === 'column') {
        if (cursor.yPos + increment < doc.internal.pageSize.height-margins.vert){
          cursor.yPos = cursor.yPos + increment
        } else {
          cursor.yPos = margins.vert
          cursor.xPos = cursor.xPos + lineHeight
        }
      }
    }

    console.log(fields)

    doc = insertBackground(doc,background.backgroundType,background.ignoreMargins,background.backgroundColor)
    doc = borders.topBorder ? insertBorder(doc, 'top', borders.topBorderSettings) : doc
    doc = borders.bottomBorder ? insertBorder(doc, 'bottom', borders.bottomBorderSettings) : doc
    doc = borders.leftBorder ? insertBorder(doc, 'left', borders.leftBorderSettings) : doc
    doc = borders.rightBorder ? insertBorder(doc, 'right', borders.rightBorderSettings) : doc

    fields.forEach((field: any)=>{
      console.log(field.blockType)
      switch(field.blockType !== null){
        case field.blockType === 'pdfSection':
        case field.blockType === 'pdfText':
        case field.blockType === 'pdfImage':
        case field.blockType === 'pdfPath':
      }
    })

  } catch (e) {
    console.log(e)
  }
  return {doc, cursor}
}