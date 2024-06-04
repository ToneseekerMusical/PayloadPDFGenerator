export interface PluginTypes {
  /**
   * Enable or disable plugin
   * @default false
   */
  enabled?: boolean
  collections: string[],
  tabbedUI?: boolean,
  interfaceName?: string,
  uploadsCollection?: string
}

export interface NewCollectionTypes {
  title: string
}