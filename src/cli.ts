#!/usr/bin/env node
import cac from 'cac'
import { version } from '../package.json'
import { createProject, fromTemplate } from './index'
import consola from 'consola'

const cli = cac('@a-sir/create')

// cli
//   .command('[projectPath]', 'create a project')
//   .action((projectPath?: string) => {
//     if (!projectPath) {
//       projectPath = process.cwd()
//     }
//     createProject({ projectPath }).catch((error) => error && console.error(error))
//   })
cli
  .command('from <template> [projectPath]', 'create a project from a template')
  .action((template, projectPath) => {
    fromTemplate({ template, projectPath }).catch((error) => consola.error(error))
  })

cli.help().version(version).parse()