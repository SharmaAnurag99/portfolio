import path from 'path'
import { fileURLToPath } from 'url'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import { payloadDebug } from './src/lib/payload-debug'
import { Blogs } from './src/payload/collections/Blogs'
import { Education } from './src/payload/collections/education'
import { Media } from './src/payload/collections/Media'
import { Projects } from './src/payload/collections/Projects'
import { Skills } from './src/payload/collections/Skills'
import { Testimonials } from './src/payload/collections/Testimonials'
import { Users } from './src/payload/collections/User'
import { SiteDetails } from './src/payload/globals/SiteDetails'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Users, Media, Testimonials, Blogs, Projects, Skills, Education],
  globals: [SiteDetails],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || 'dev-payload-secret-change-me',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  onInit: async (payload) => {
    payloadDebug('payload-config', 'Payload initialized', {
      nodeEnv: process.env.NODE_ENV,
      hasDatabaseUri: Boolean(process.env.DATABASE_URI),
      hasPayloadSecret: Boolean(process.env.PAYLOAD_SECRET),
      hasBlobToken: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      adminRoute: '/admin',
      apiRoute: '/api',
      collectionCount: payload.config.collections?.length || 0,
    })
  },
})













































