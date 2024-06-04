import React from 'react'
import { Button } from 'payload/components/elements'
import type { Props } from 'payload/components/views/Cell'
import pdfGenerator from '../../utils/pdfGenerator'


const generatePDFCell: React.FC<Props> = props => {
  const { field, colIndex, collection, cellData, rowData } = props
  return (
    <Button
      size="small"
      onClick={() => {
        pdfGenerator(rowData)
      }}
    >
      Download PDF
    </Button>
  )
}

export default generatePDFCell
