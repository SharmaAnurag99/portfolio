import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { s3Storage } from '@payloadcms/storage-s3'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { fileURLToPath } from 'url'
import { Users } from './src/payload/collections/User'
import { Testimonials } from './src/payload/collections/Testimonials'
import { Projects } from './src/payload/collections/Projects'
import { Blogs } from './src/payload/collections/Blogs'
import { Media } from './src/payload/collections/Media'
import { Skills } from './src/payload/collections/Skills'
import { Education } from './src/payload/collections/education'

import { SiteDetails } from './src/payload/globals/SiteDetails'




const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)




const plugins: any[] = []

// if (process.env.R2_ENDPOINT) {
//     plugins.push(
//         s3Storage({
//             collections: {
//                 media: true,
//             },
//             bucket: process.env.R2_BUCKET || '',
//             config: {
//                 credentials: {
//                     accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
//                     secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
//                 },
//                 region: 'auto',
//                 endpoint: process.env.R2_ENDPOINT,
//             },
//         })
//     )
// }

if (process.env.BLOB_READ_WRITE_TOKEN) {
    plugins.push(
        vercelBlobStorage({
            collections: {
                media: true,
            },
            token: process.env.BLOB_READ_WRITE_TOKEN,
        })
    )
}

export default buildConfig({
    admin: {
        user: Users.slug,
    },
    collections: [Users, Media, Testimonials, Blogs, Projects, Skills, Education],
    globals: [SiteDetails],
    editor: lexicalEditor({}),
    secret: process.env.PAYLOAD_SECRET || '',
    typescript: {
        outputFile: path.resolve(dirname, 'payload-types.ts'),
    },
    db: mongooseAdapter({
        url: process.env.DATABASE_URI || '',
    }),
    plugins,
})













































