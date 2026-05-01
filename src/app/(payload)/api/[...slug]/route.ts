import config from '@payload-config'
import { REST_GET, REST_OPTIONS, REST_PATCH, REST_POST, REST_DELETE } from '@payloadcms/next/routes'
import { payloadDebug, payloadDebugError } from '@/lib/payload-debug'

export const dynamic = 'force-dynamic'

const getHandler = REST_GET(config)
const postHandler = REST_POST(config)
const patchHandler = REST_PATCH(config)
const deleteHandler = REST_DELETE(config)
const optionsHandler = REST_OPTIONS(config)

function wrapHandler(method: string, handler: any) {
  return async (request: Request, context: unknown) => {
    payloadDebug('payload-api', `${method} request`, {
      url: request.url,
    })

    try {
      const response = await handler(request, context)
      payloadDebug('payload-api', `${method} response`, {
        status: response?.status,
      })
      return response
    } catch (error) {
      payloadDebugError('payload-api', `${method} failed`, error)
      throw error
    }
  }
}

export const GET = wrapHandler('GET', getHandler)
export const POST = wrapHandler('POST', postHandler)
export const PATCH = wrapHandler('PATCH', patchHandler)
export const DELETE = wrapHandler('DELETE', deleteHandler)
export const OPTIONS = wrapHandler('OPTIONS', optionsHandler)
