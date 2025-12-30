import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Afroangle',

  projectId: 'wg07mdw2',
  dataset: 'dev-test',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
