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