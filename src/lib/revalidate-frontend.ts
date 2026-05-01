import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath } from 'next/cache'

/**
 * Triggers Next.js to drop the cached HTML for the given paths the moment
 * a Payload doc is created, updated, or deleted. Without this, statically
 * rendered pages keep serving the build-time snapshot until the next deploy.
 *
 * Wrap with try/catch so a missing Next runtime (e.g. payload CLI scripts)
 * never blocks a Payload mutation.
 */
const revalidate = (paths: string[], context: string) => {
  try {
    for (const p of paths) revalidatePath(p)
  } catch (err) {
    if (process.env.PAYLOAD_DEBUG === 'true') {
      // eslint-disable-next-line no-console
      console.warn(`[revalidate-frontend:${context}] revalidate skipped`, err)
    }
  }
}

export const revalidateAfterChange = (paths: string[]): CollectionAfterChangeHook => {
  return async () => {
    revalidate(paths, 'afterChange')
  }
}

export const revalidateAfterDelete = (paths: string[]): CollectionAfterDeleteHook => {
  return async () => {
    revalidate(paths, 'afterDelete')
  }
}
