export interface ConfigTemplate { 
  name: string

  color: string

  url: string

  hint?: string

  // prompts: Prompt[]
}

export interface Config {
  templates: ConfigTemplate[]
}