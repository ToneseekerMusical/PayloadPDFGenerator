import getTemplate from "./pdfTemplates/pdfTemplateQuery";

export default async function pdfGenerator(fields: { [path: string]: unknown; }): Promise<void> {
  const template = await getTemplate(fields.pdfOptions?.pdfTemplate)
}
