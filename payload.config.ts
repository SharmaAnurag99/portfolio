import path from 'path'
import { fileURLToPath } from 'url'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
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

const r2AccountId = process.env.R2_ACCOUNT_ID
const r2AccessKeyId = process.env.R2_ACCESS_KEY_ID
const r2SecretAccessKey = process.env.R2_SECRET_ACCESS_KEY
const r2Bucket = process.env.R2_BUCKET

const r2Configured = Boolean(
  r2AccountId && r2AccessKeyId && r2SecretAccessKey && r2Bucket,
)

// Keep the plugin in the array so importMap always has the S3 client components
// (prevents "PayloadComponent not found" crash in admin). The `enabled` flag
// gates actual upload/delete calls so seeds and local dev work without R2 creds.
const enableS3Plugin = r2Configured

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
  plugins: [
    s3Storage({
      enabled: enableS3Plugin,
      collections: {
        media: true,
      },
      bucket: r2Bucket ?? '',
      config: {
        endpoint: r2AccountId
          ? `https://${r2AccountId}.r2.cloudflarestorage.com`
          : '',
        region: 'auto',
        forcePathStyle: true,
        credentials: {
          accessKeyId: r2AccessKeyId ?? '',
          secretAccessKey: r2SecretAccessKey ?? '',
        },
      },
    }),
  ],
  onInit: async (payload) => {
    payloadDebug('payload-config', 'Payload initialized', {
      nodeEnv: process.env.NODE_ENV,
      hasDatabaseUri: Boolean(process.env.DATABASE_URI),
      hasPayloadSecret: Boolean(process.env.PAYLOAD_SECRET),
      r2Configured,
      r2Bucket: r2Bucket || null,
      adminRoute: '/admin',
      apiRoute: '/api',
      collectionCount: payload.config.collections?.length || 0,
    })
  },
})













































