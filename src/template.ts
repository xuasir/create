import { mkdtemp, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'

export interface CreateProjectFromTemplateOptions {
  template: string
}

export async function fromTemplate(options: CreateProjectFromTemplateOptions) {
  const { template } = options
  if (!template) {
    throw new Error('template is required')
  }

  const contents = await fetch(
    template.startsWith('https://')
      ? template
      : `https://raw.githubusercontent.com/${template}`,
  ).then((res) => res.text())

  const filename = template.split('/').pop()!
  const tempDir = await mkdtemp(path.join(tmpdir(), 'template-'))
  await writeFile(path.resolve(tempDir, filename), contents)
}
