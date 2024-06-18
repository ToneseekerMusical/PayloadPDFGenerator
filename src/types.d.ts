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

export interface NewCollectionTypes {
  title: string
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

export interface pdf {
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
    font:string;
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
    horizontalMargin?: number | null;
    verticalMargin?: number | null;
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
    fileNameField?: string | null;
  };
  useEncryption: boolean;
  encryptionSettings?: {
    userPassword?: string | null;
    ownerPassword?: string | null;
    userPermissions?: ('print' | 'modify' | 'copy' | 'annot-forms')[] | null;
  };
  defaultDisplayMode: {
    zoom: 'fullwidth' | 'fullheight' | 'fullpage' | 'original';
    layout: 'continuous' | 'single' | 'twoleft' | 'tworight';
    pmode?: ('UseOutlines' | 'UseThumbs' | 'FullScreen') | null;
  };
  fields?: (PDFImage | PDFPath | PDFSection | PDFTable | PDFText)[] | null;
  updatedAt: string;
  createdAt: string;
}