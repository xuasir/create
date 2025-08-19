import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: './src/{index,cli}.ts',
  unused: { level: 'warning' },
  exports: true,
})
