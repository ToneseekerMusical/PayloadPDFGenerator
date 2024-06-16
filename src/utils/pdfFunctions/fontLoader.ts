import jsPDF from "jspdf";
import { fontList } from "../../types";

export function fontLoader(doc: jsPDF, fontList: fontList):jsPDF{
  console.log(fontList)
  return doc
}