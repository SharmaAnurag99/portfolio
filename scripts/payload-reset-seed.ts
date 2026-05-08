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

function getMimetype(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase()
  const map: Record<string, string> = {
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
  }
  return map[ext] || 'application/octet-stream'
}

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

    try {
      await fs.access(absolutePath)
    } catch {
      console.warn(`⚠ Skipping missing file: ${media.filePath}`)
      continue
    }

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
        mimetype: getMimetype(media.filePath),
      },
    })

    mediaMap.set(key, created.id)
    console.log(`  ✓ ${key} → ${fileName}`)
  }

  return mediaMap
}

async function run() {
  const payload = await getPayload({ config: configPromise })
  console.log('Payload initialized\n')

  console.log('Clearing old content...')
  await resetCollection(payload, 'blogs')
  await resetCollection(payload, 'projects')
  await resetCollection(payload, 'testimonials')
  await resetCollection(payload, 'skills')
  await resetCollection(payload, 'education')
  await resetCollection(payload, 'media')
  console.log('✓ Old content removed\n')

  console.log('Uploading media...')
  const mediaMap = await uploadSeedMedia(payload)
  console.log(`✓ ${mediaMap.size} media files seeded\n`)

  console.log('Seeding testimonials...')
  for (const item of testimonialsSeed) {
    const imageId = mediaMap.get(item.imageKey)
    if (!imageId) {
      console.warn(`  ⚠ No media for testimonial "${item.name}", using fallback`)
    }
    await payload.create({
      collection: 'testimonials',
      data: {
        name: item.name,
        role: item.role,
        content: item.content,
        image: imageId || mediaMap.get('avatarA'),
        linkedinUrl: item.linkedinUrl || '',
      },
    })
  }
  console.log(`✓ ${testimonialsSeed.length} testimonials seeded\n`)

  console.log('Seeding projects...')
  for (const item of projectsSeed) {
    const imageId = mediaMap.get(item.imageKey)
    if (!imageId) {
      console.warn(`  ⚠ No media for project "${item.title}", using fallback`)
    }
    await payload.create({
      collection: 'projects',
      data: {
        title: item.title,
        category: item.category,
        content: item.content,
        outcome: item.outcome || '',
        url: item.url,
        githubUrl: item.githubUrl,
        tags: item.tags.map(t => ({ tag: t.tag })),
        image: imageId || mediaMap.get('projectA'),
        roleSummary: item.roleSummary || '',
        year: item.year || '',
        stackList: item.stackList ? item.stackList.map(s => ({ name: s.name })) : [],
        brief: ('brief' in item ? item.brief : '') || '',
        approach: 'approach' in item && item.approach ? item.approach.map((a: { point: string }) => ({ point: a.point })) : [],
        outcomeStats: 'outcomeStats' in item && item.outcomeStats ? item.outcomeStats.map((o: { value: string; label: string }) => ({ value: o.value, label: o.label })) : [],
      },
    })
  }
  console.log(`✓ ${projectsSeed.length} projects seeded\n`)

  console.log('Seeding skills...')
  let skillCount = 0
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
      skillCount++
    }
  }
  console.log(`✓ ${skillCount} skills seeded\n`)

  console.log('Seeding education/experience...')
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
  console.log(`✓ ${educationSeed.length} education entries seeded\n`)

  console.log('Seeding blogs...')
  for (const item of blogsSeed) {
    const imageId = mediaMap.get(item.imageKey)
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
        image: imageId || mediaMap.get('blogA'),
      },
    })
  }
  console.log(`✓ ${blogsSeed.length} blogs seeded\n`)

  console.log('🎉 All collections seeded successfully!')
}

run()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
