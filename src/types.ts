export interface ConfigTemplate { 
  name: string

  color: string

  url: string
}

export interface Config {
  templates: ConfigTemplate[]
}