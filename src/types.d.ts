import { Matrix } from "jspdf"

export interface PluginConfig {
  /**
   * Enable or disable plugin
   * @default false
   */
  enabled?: boolean
  collections: string[],
  tabbedUI?: boolean,
  interfaceName?: string,
  uploadsCollection: string,
  headerCollections: string[]
}

export interface Media {
  id: string;
  alt: string;
  caption?:
    | {
        [k: string]: unknown;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  filename?: string | null;
  mimeType: string;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}

export interface pdfCursor {
  xPos: number,
  yPos: number
}

export interface FieldList {
  name: string,
  type: string,
  fields?: FieldList[]
}[]

export interface CollectionFieldList {
  collection: string;
  fields: FieldList[];
}[]

export interface Font{
  url: string;
  fontName: string;
  emphasis: string;
}

export interface Margins {
  horz: number;
  vert: number;
}

export interface pdfOptions {
  orientation?: 'p' | 'portrait' | 'l' | 'landscape'
  unit?: 'pt' | 'px' | 'in' | 'mm' | 'cm' | 'ex' | 'em' | 'pc'
  format?: string | (number | undefined)[]
  putOnlyUsedFonts?: Boolean
  compress?: Boolean
  precision?: Number
  encryption?: {
    userPassword?: string | null | undefined,
    ownerPassword?: string | null | undefined,
    userPermissions?: Array<'print' | 'modify' | 'copy' | 'annot-forms'> | null | undefined
  }
}

export interface textOverrides {
  multilineText: boolean;
  multilineWidth?: ('100pw' | '50pw' | '33pw' | '25pw' | '100sw' | '50sw' | '33sw' | '25sw' | 'fill') | null;
  overrideTextAlignment: boolean;
  align?: ('left' | 'center' | 'right' | 'justify') | null;
  baseline?: ('alphabetic' | 'ideographic' | 'bottom' | 'top' | 'middle' | 'hanging') | null;
  rotateElement: boolean;
  angle?: number | null;
  rotationDirection?: ('0' | '1') | null;
  overrideCharacterSpacing: boolean;
  charSpace?: number | null;
  overrideLineHeightFactor: boolean;
  lineHeightFactor: number;
  textColorOverride: boolean;
  textColor?: string | null;
  fontOverride: boolean;
  fontSelection?: string | null;
  overrideTextRendering: boolean;
  renderingMode?:
    | (
        | 'fill'
        | 'stroke'
        | 'fillThenStroke'
        | 'invisible'
        | 'fillAndAddForClipping'
        | 'strokeAndAddPathForClipping'
        | 'fillThenStrokeAndAddToPathForClipping'
        | 'addToPathForClipping'
      )
    | null;
};

export interface pdfDefaults {
  displayMode:{
    zoom: "fullwidth" | "fullheight" | "fullpage" | "original";
    layout: "continuous" | "single" | "twoleft" | "tworight";
    pmode: "UseOutlines" | "UseThumbs" | "FullScreen" | null | undefined;
  },
  rightToLeft: boolean;
  path:{
    lineCap:"butt" | "miter" | "round" | "square";
    lineJoin:"butt" | "miter" | "round" | "square";
    fillColor:string;
    drawColor:string;
    lineWidth:number;
  },
  font:{
    font:Font;
    fontSize:number;
    lineHeightFactor:number;
    textColor:string;
    charSpace:number;
  }
}

export interface PdfTemplate {
  id: string;
  title: string;
  assignedCollections?: ('examples' | 'tests') | null;
  enableCompression: boolean;
  rightToLeft: boolean;
  pageOptions: {
    orientation: 'portrait' | 'landscape';
    pageSize:
      | 'letter'
      | 'government-letter'
      | 'legal'
      | 'junior-legal'
      | 'ledger'
      | 'tabloid'
      | 'credit-card'
      | 'a0'
      | 'a1'
      | 'a2'
      | 'a3'
      | 'a4'
      | 'a5'
      | 'a7'
      | 'a8'
      | 'a9'
      | 'a10'
      | 'b0'
      | 'b1'
      | 'b2'
      | 'b3'
      | 'b4'
      | 'b5'
      | 'b6'
      | 'b7'
      | 'b8'
      | 'b9'
      | 'b10'
      | 'c0'
      | 'c1'
      | 'c2'
      | 'c3'
      | 'c4'
      | 'c5'
      | 'c6'
      | 'c7'
      | 'c8'
      | 'c9'
      | 'c10'
      | 'd1'
      | 'custom';
    customPageSize?: {
      length: number;
      width: number;
    };
    units: 'px' | 'pt' | 'mm' | 'cm' | 'in';
    horizontalMargin: number;
    verticalMargin: number;
  };
  layoutOptions?: {
    headerLayout?: string | null;
    footerLayout?: string | null;
    watermark?: string | null;
  };
  fontOptions: {
    defaultFontSize: number;
    defaultCharacterSpace: number;
    defaultLineHeightFactor: number;
    defaultFont: string;
    defaultTextColor: string;
  };
  pathOptions: {
    defaultFillColor: string;
    defaultStrokeColor: string;
    defaultLineColor: string;
    defaultStrokeWidth: number;
    defaultLineWidth: number;
    defaultLineCapStyle: 'butt' | 'miter' | 'round' | 'square';
    defaultLineJoinStyle: 'butt' | 'miter' | 'round' | 'square';
  };
  fileOptions: {
    buttonBehavior: 'download' | 'newTab' | 'curTab' | 'autoprint';
    fileNameField: string;
  };
  useEncryption: boolean;
  encryptionSettings?: {
    userPassword: string;
    ownerPassword: string;
    userPermissions: ('print' | 'modify' | 'copy' | 'annot-forms')[];
  };
  defaultDisplayMode: {
    zoom: 'fullwidth' | 'fullheight' | 'fullpage' | 'original';
    layout: 'continuous' | 'single' | 'twoleft' | 'tworight';
    pmode?: ('UseOutlines' | 'UseThumbs' | 'FullScreen') | null;
  };
  fields: (PDFImage | PDFPath | PDFSection | PDFTable | PDFText | PDFDivider)[];
  updatedAt: string;
  createdAt: string;
}

export interface PDFImage {
  imageSource: string | Media;
  placement: 'relative' | 'absolute';
  xPosition: number;
  yPosition: number;
  width: number;
  height: number;
  id?: string | null;
  blockName?: string | null;
  blockType: 'pdfImage';
}

export interface PDFPath {
  pdfStrokeColor?: string | null;
  pdfFillColor?: string | null;
  pdfClosedPath?: boolean | null;
  pathSourceField?: string | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'pdfPath';
}

export interface PDFSection {
  sourceField?: string | null;
  sectionOrientation: 'horizontal' | 'vertical';
  sectionWidth?: number | null;
  sectionHeight?: number | null;
  topDivider?: boolean | null;
  bottomDivider?: boolean | null;
  leftDivider?: boolean | null;
  rightDivider?: boolean | null;
  sectionFields?:
    | {
        sourceField?: string | null;
        label?: string | null;
        textStyleOverrides: boolean;
        overrides?: {
          multilineText: boolean;
          multilineWidth?: ('100pw' | '50pw' | '33pw' | '25pw' | '100sw' | '50sw' | '33sw' | '25sw' | 'fill') | null;
          overrideTextAlignment: boolean;
          align?: ('left' | 'center' | 'right' | 'justify') | null;
          baseline?: ('alphabetic' | 'ideographic' | 'bottom' | 'top' | 'middle' | 'hanging') | null;
          rotateElement: boolean;
          angle?: number | null;
          rotationDirection?: ('0' | '1') | null;
          overrideCharacterSpacing: boolean;
          charSpace?: number | null;
          overrideLineHeightFactor: boolean;
          lineHeightFactor?: number | null;
          textColorOverride: boolean;
          textColor?: string | null;
          overrideTextRendering: boolean;
          renderingMode?:
            | (
                | 'fill'
                | 'stroke'
                | 'fillThenStroke'
                | 'invisible'
                | 'fillAndAddForClipping'
                | 'strokeAndAddPathForClipping'
                | 'fillThenStrokeAndAddToPathForClipping'
                | 'addToPathForClipping'
              )
            | null;
          fontOverride: boolean;
          fontSelection?: string | null;
        };
        id?: string | null;
      }[]
    | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'pdfSection';
}

export interface PDFTable {
  sourceField?: string | null;
  tableTitle?: string | null;
  placement: 'relative' | 'absolute';
  xPosition: number;
  yPosition: number;
  columnSetup?: {
    printHeaders?: boolean | null;
    autoSizeColumns?: boolean | null;
    headerFontSize?: number | null;
    cellFontSize?: number | null;
    columns?:
      | {
          sourceField?: string | null;
          headerLabel?: string | null;
          id?: string | null;
        }[]
      | null;
  };
  id?: string | null;
  blockName?: string | null;
  blockType: 'pdfTable';
}

//Figure out a way to remove possible nulls if corresponding boolean is true ie: if overrideFontSize === true, fontSize cannot equal null
export interface textElementOverrides {
  overrideFontSize: boolean;
  fontSize: number | null;
  multilineText: boolean;
  multilineWidth?: ('100pw' | '50pw' | '33pw' | '25pw' | '100sw' | '50sw' | '33sw' | '25sw' | 'fill') | null;
  overrideTextAlignment: boolean;
  align?: ('left' | 'center' | 'right' | 'justify') | null;
  baseline?: ('alphabetic' | 'ideographic' | 'bottom' | 'top' | 'middle' | 'hanging') | null;
  rotateElement: boolean;
  angle?: number | null;
  rotationDirection?: ('0' | '1') | null;
  overrideCharacterSpacing: boolean;
  charSpace?: number | null;
  overrideLineHeightFactor: boolean;
  lineHeightFactor?: number | null;
  textColorOverride: boolean;
  textColor: string | null;
  overrideTextRendering: boolean;
  renderingMode?:
    | (
        | 'fill'
        | 'stroke'
        | 'fillThenStroke'
        | 'invisible'
        | 'fillAndAddForClipping'
        | 'strokeAndAddPathForClipping'
        | 'fillThenStrokeAndAddToPathForClipping'
        | 'addToPathForClipping'
      )
    | null;
  fontOverride: boolean;
  fontSelection?: string | null;
}

export interface textElement {
  type: 'static' | 'dynamic';
  sourceField?: string | null;
  value?: string | null;
  label?: string | null;
  textStyleOverrides: boolean;
  overrides?: textElementOverrides
}

export interface imageElement {
  imageSource: Media;
  placement: 'relative' | 'absolute';
  xPosition: number;
  yPosition: number;
  width: number;
  height: number;
  id?: string | null;
}

export interface PDFDivider {
  dividerThickness: number;
  dividerColor?: string | null;
  dividerWidth?: ('100pw' | '50pw' | '33pw' | '25pw' | '100sw' | '50sw' | '33sw' | '25sw' | 'fill') | null;
  align?: ('left' | 'center' | 'right') | null;
  topGap: number;
  bottomGap: number;
  id?: string | null;
  blockName?: string | null;
  blockType: 'pdfDivider';
}

export interface PdfHeader {
  id: string;
  layouts?:
    | {
        layoutName: string;
        layout?: (PDFHeaderSection | PDFImage | PDFHeaderPath | PDFText)[] | null;
        id?: string | null;
      }[]
    | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}

export interface PDFHeaderSection {
  sectionOrientation: 'horizontal' | 'vertical';
  sectionWidth?: number | null;
  sectionHeight?: number | null;
  topDivider?: boolean | null;
  bottomDivider?: boolean | null;
  leftDivider?: boolean | null;
  rightDivider?: boolean | null;
  sectionFields?:
    | {
        fieldLabel?: string | null;
        fieldValue: string;
        placement: 'relative' | 'absolute';
        xPosition: number;
        yPosition: number;
        textStyleOverrides: boolean;
        overrides?: {
          multilineText: boolean;
          multilineWidth?: ('100pw' | '50pw' | '33pw' | '25pw' | '100sw' | '50sw' | '33sw' | '25sw' | 'fill') | null;
          overrideTextAlignment: boolean;
          align?: ('left' | 'center' | 'right' | 'justify') | null;
          baseline?: ('alphabetic' | 'ideographic' | 'bottom' | 'top' | 'middle' | 'hanging') | null;
          rotateElement: boolean;
          angle?: number | null;
          rotationDirection?: ('0' | '1') | null;
          overrideCharacterSpacing: boolean;
          charSpace?: number | null;
          overrideLineHeightFactor: boolean;
          lineHeightFactor?: number | null;
          textColorOverride: boolean;
          textColor?: string | null;
          overrideTextRendering: boolean;
          renderingMode?:
            | (
                | 'fill'
                | 'stroke'
                | 'fillThenStroke'
                | 'invisible'
                | 'fillAndAddForClipping'
                | 'strokeAndAddPathForClipping'
                | 'fillThenStrokeAndAddToPathForClipping'
                | 'addToPathForClipping'
              )
            | null;
          fontOverride: boolean;
          fontSelection?: string | null;
        };
        id?: string | null;
      }[]
    | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'pdfHeaderSection';
}

export interface PDFHeaderPath {
  pdfStrokeColor?: string | null;
  pdfFillColor?: string | null;
  pdfClosedPath?: boolean | null;
  pathData?:
    | {
        pathName?: string | null;
        data?: string | null;
        id?: string | null;
      }[]
    | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'pdfHeaderPath';
}

export interface PdfFooter {
  id: string;
  layouts?:
    | {
        layoutName: string;
        layout: {
          footerHeight: number;
          horizontalMargin: number;
          verticalMargin: number;
          topDivider?: boolean | null;
          pageNumbers?: boolean | null;
          companyName?: boolean | null;
          contactInfo?: boolean | null;
        };
        backgroundSettings: {
          layoutBackground?: ('blank' | 'solid' | 'image') | null;
          backgroundImage?: string | Media | null;
          width?: number | null;
          height?: number | null;
          footerFillColor?: string | null;
          horizontalMargin: number;
          verticalMargin: number;
        };
        dividerSettings?: {
          dividerStrokeColor?: string | null;
          dividerThickness?: number | null;
          horizontalMargin: number;
          verticalMargin: number;
        };
        pageNumberSettings?: {
          format?: string | null;
          collate?: boolean | null;
          footerLocation?: ('left' | 'center' | 'right') | null;
        };
        companyNameSettings?: {
          companyName: string;
          footerLocation?: ('left' | 'center' | 'right') | null;
        };
        contactInfoSettings?: {
          phoneNumber?: string | null;
          email?: string | null;
          address?: string | null;
          footerLocation?: ('left' | 'center' | 'right') | null;
        };
        id?: string | null;
      }[]
    | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}

export interface PdfWatermark {
  id: string;
  watermark: (PDFImage | PDFText)[];
  updatedAt?: string | null;
  createdAt?: string | null;
}

export interface PdfFont {
  id: string;
  fontList?:
    | {
        fontFile?: string | Media | null;
        fontName?: string | null;
        fontEmphasis?: ('bold' | 'italic' | 'normal' | 'bolditalic') | null;
        id?: string | null;
      }[]
    | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}