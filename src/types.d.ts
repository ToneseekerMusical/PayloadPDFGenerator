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

export interface pdfCursor {
  xPos: number,
  yPos: number
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

export interface Margins {
  horz: number;
  vert: number;
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

export interface PdfWatermark {
  id: string;
  watermarks: {
    watermarkName: string;
    watermarkType?: ('image' | 'text') | null;
    imageSettings?: {
      watermark: string | Media;
      width: number;
      height: number;
    };
    textSettings?: {
      watermark: string;
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
    };
    id?: string | null;
  }[];
  updatedAt?: string | null;
  createdAt?: string | null;
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

export interface PdfFooter {
  id: string;
  layouts?:
    | {
        layoutName: string;
        topDivider?: boolean | null;
        pageNumbers?: boolean | null;
        companyName?: boolean | null;
        contactInfo?: boolean | null;
        backgroundSettings?: {
          layoutBackground?: ('blank' | 'solid' | 'image') | null;
          backgroundImage?: string | Media | null;
          width?: number | null;
          height?: number | null;
          footerFillColor?: string | null;
          horizontalMargin?: number | null;
          verticalMargin?: number | null;
        };
        dividerSettings?: {
          dividerStrokeColor?: string | null;
          dividerThickness?: number | null;
          horizontalMargin?: number | null;
          verticalMargin?: number | null;
        };
        pageNumberSettings?: {
          format?: string | null;
          collate?: boolean | null;
          footerLocation?: ('left' | 'center' | 'right') | null;
        };
        companyNameSettings?: {
          companyName?: string | null;
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