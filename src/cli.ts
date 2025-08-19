#!/usr/bin/env node
import cac from 'cac'
import { version } from '../package.json'
import { createProject, fromTemplate } from './index'

const cli = cac('@xus/create')

// cli
//   .command('[projectPath]', 'create a project')
//   .action((projectPath?: string) => {
//     if (!projectPath) {
//       projectPath = process.cwd()
//     }
//     createProject({ projectPath }).catch((error) => error && console.error(error))
//   })
cli
  .command('from <template>', 'create a project from a template')
  .action((template) => {
    fromTemplate(template).catch((error) => console.error(error))
  })

cli.help().version(version).parse()