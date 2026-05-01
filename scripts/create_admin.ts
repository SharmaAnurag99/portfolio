import { getPayload } from 'payload'
import configPromise from '../payload.config'

async function createAdmin() {
  const payload = await getPayload({ config: configPromise })
  const adminEmail = process.env.PAYLOAD_ADMIN_EMAIL || 'admin@example.com'
  const adminPassword = process.env.PAYLOAD_ADMIN_PASSWORD || 'ChangeMe123!'

  const existing = await payload.find({
    collection: 'users',
    where: {
      email: {
        equals: adminEmail,
      },
    },
    limit: 1,
  })

  if (existing.docs.length > 0) {
    await payload.update({
      collection: 'users',
      id: existing.docs[0].id,
      data: {
        password: adminPassword,
      },
    })
    console.log(`Admin password reset: ${adminEmail}`)
    return
  }

  await payload.create({
    collection: 'users',
    data: {
      email: adminEmail,
      password: adminPassword,
    },
  })
  console.log(`Admin user created: ${adminEmail}`)
}

createAdmin()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
