import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
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
})













































