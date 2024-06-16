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

export interface fontList {
  defaultFont: string,
  overrides?: string[]
}

export interface pdf {
  orientation?: 'p' | 'portrait' | 'l' | 'landscape'
  unit?: 'pt' | 'px' | 'in' | 'mm' | 'cm' | 'ex' | 'em' | 'pc'
  format?: string | (number | undefined)[]
  putOnlyUsedFonts?: Boolean
  compress?: Boolean
  precision?: Number
  encryption?: Boolean
}

export interface PdfTemplate {
  id: string;
  title: string;
  assignedCollections?: ('examples' | 'tests') | null;
  enableCompression: boolean;
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
    defaultFontSize?: number | null;
    defaultFont: string;
    defaultTextColor: string;
  };
  pathOptions: {
    defaultFillColor: string;
    defaultStrokeColor: string;
    defaultLineColor: string;
    defaultStrokeWidth?: number | null;
    defaultLineWidth?: number | null;
    defaultLineCapStyle?: string | null;
    defaultLineJoinStyle?: string | null;
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
  defaultDisplayMode?: {
    zoom?: ('fullwidth' | 'fullheight' | 'fullpage' | 'original') | null;
    layout?: ('continuous' | 'single' | 'twoleft' | 'tworight') | null;
    outlineDisplay?: ('none' | 'UseOutlines' | 'UseThumbs') | null;
  };
  fields?: (PDFImage | PDFPath | PDFSection | PDFTable | PDFText)[] | null;
  updatedAt: string;
  createdAt: string;
}