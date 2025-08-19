import { mkdtemp, writeFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { load } from 'js-yaml'
import { downloadTemplate } from 'giget'
import { Config } from './types'
import { intro, isCancel, select } from '@clack/prompts'
import consola from 'consola'

export interface CreateProjectFromTemplateOptions {
  template: string
  projectPath?: string
}

export async function fromTemplate(options: CreateProjectFromTemplateOptions) {
  intro('  Welcome to use @xus/create  ')
  let { template, projectPath } = options
  if (!template) {
    throw new Error('template is required')
  }
  projectPath = path.resolve(process.cwd(), projectPath || '')

  consola.info(`Loading Template ${template}`)
  const contents = await fetch(
    template.startsWith('https://')
      ? template
      : `https://raw.githubusercontent.com/${template}`,
  ).then((res) => res.text())

  const filename = template.split('/').pop()!
  const tempDir = await mkdtemp(path.join(tmpdir(), 'template-'))
  await writeFile(path.resolve(tempDir, filename), contents)

  let config: Config | undefined
  if (filename.endsWith('.yaml') || filename.endsWith('.yml')) {
    config = (load(contents) as Config[])?.[0]
    // 删除临时文件
    await rm(tempDir, { recursive: true })
  }

  if (!config) {
    throw new Error('template config is invalid')
  }

  const readyTemplate = await chooseTemplates(config)

  consola.info(`Creating Project in ${projectPath}`)
  await downloadTemplate(readyTemplate.url, {
    provider: 'github',
    dir: projectPath,
  })

  consola.success('Project created successfully.')
}


const chooseTemplates = async (config: Config) => {
  const { templates } = config
  const templateName = await select({
    message: 'Pick a template',
    options: templates.map((item) => ({
      value: item.name,
      label: item.name,
      hint: item.color,
    })),
  })
  if(isCancel(templateName)) {
    throw new Error('No template selected.')
  }

  const template = templates.find((item) => item.name === templateName)
  if(!template) {
    throw new Error('Template not found.')
  }

  return template
}