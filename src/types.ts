export interface ConfigTemplate { 
  name: string

  color: string

  url: string

  // prompts: Prompt[]
}

export interface Config {
  templates: ConfigTemplate[]
}