import { getPayload } from 'payload'
import configPromise from './payload.config'

async function run() {
  const payload = await getPayload({ config: configPromise })
  const { docs: projects } = await payload.find({ collection: 'projects', limit: 20, sort: '-createdAt' })
  for (const p of projects) {
    const imgName = typeof p.image === 'object' && p.image !== null ? p.image.alt : 'Unknown';
    console.log(`- Title: "${p.title}" | Category: ${p.category} | Image: ${imgName}`);
  }
  process.exit(0);
}
run();
