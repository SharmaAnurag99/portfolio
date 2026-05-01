import fs from 'fs/promises'
import path from 'path'
import { getPayload } from 'payload'
import configPromise from '../payload.config'
import {
  blogsSeed,
  educationSeed,
  mediaSeedFiles,
  projectsSeed,
  skillsSeed,
  testimonialsSeed,
} from '../src/payload/seed-data'

type SeedMediaKey = keyof typeof mediaSeedFiles

async function resetCollection(payload: Awaited<ReturnType<typeof getPayload>>, collection: string) {
  await payload.delete({
    collection,
    where: {
      id: {
        exists: true,
      },
    },
  })
}

async function uploadSeedMedia(payload: Awaited<ReturnType<typeof getPayload>>) {
  const mediaMap = new Map<SeedMediaKey, number | string>()

  for (const [key, media] of Object.entries(mediaSeedFiles) as [SeedMediaKey, (typeof mediaSeedFiles)[SeedMediaKey]][]) {
    const absolutePath = path.resolve(process.cwd(), media.filePath)
    const data = await fs.readFile(absolutePath)
    const fileName = path.basename(media.filePath)

    const created = await payload.create({
      collection: 'media',
      data: {
        alt: media.alt,
      },
      file: {
        data,
        name: fileName,
        size: data.length,
        mimetype: 'image/svg+xml',
      },
    })

    mediaMap.set(key, created.id)
  }

  return mediaMap
}

async function run() {
  const payload = await getPayload({ config: configPromise })
  console.log('Payload initialized')

  await resetCollection(payload, 'blogs')
  await resetCollection(payload, 'projects')
  await resetCollection(payload, 'testimonials')
  await resetCollection(payload, 'skills')
  await resetCollection(payload, 'education')
  await resetCollection(payload, 'media')
  console.log('Old content removed')

  const mediaMap = await uploadSeedMedia(payload)
  console.log('Media seeded')

  for (const item of testimonialsSeed) {
    await payload.create({
      collection: 'testimonials',
      data: {
        name: item.name,
        role: item.role,
        content: item.content,
        image: mediaMap.get(item.imageKey),
      },
    })
  }

  for (const item of projectsSeed) {
    await payload.create({
      collection: 'projects',
      data: {
        title: item.title,
        category: item.category,
        content: item.content,
        url: item.url,
        githubUrl: item.githubUrl,
        tags: item.tags,
        image: mediaMap.get(item.imageKey),
      },
    })
  }

  for (const item of skillsSeed) {
    for (const name of item.items) {
      await payload.create({
        collection: 'skills',
        data: {
          name,
          category: item.category,
          image: mediaMap.get('profile'),
        },
      })
    }
  }

  for (const item of educationSeed) {
    await payload.create({
      collection: 'education',
      data: {
        title: item.title,
        content: item.content,
        image: mediaMap.get(item.imageKey),
      },
    })
  }

  for (const item of blogsSeed) {
    await payload.create({
      collection: 'blogs',
      data: {
        slug: item.slug,
        title: item.title,
        date: item.date,
        category: item.category,
        content: {
          root: {
            type: 'root',
            format: '',
            indent: 0,
            version: 1,
            children: [
              {
                type: 'paragraph',
                format: '',
                indent: 0,
                version: 1,
                direction: 'ltr',
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: item.content.replace(/<[^>]*>/g, ''),
                    format: 0,
                    mode: 'normal',
                    style: '',
                    detail: 0,
                  },
                ],
              },
            ],
            direction: 'ltr',
          },
        },
        image: mediaMap.get(item.imageKey),
      },
    })
  }

  console.log('All collections seeded successfully')
}

run()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
