const SERVER_FLAG = process.env.PAYLOAD_DEBUG === 'true'
const CLIENT_FLAG = process.env.NEXT_PUBLIC_PAYLOAD_DEBUG === 'true'

export function isPayloadDebugEnabled() {
  return SERVER_FLAG || CLIENT_FLAG
}

export function payloadDebug(scope: string, message: string, details?: Record<string, unknown>) {
  if (!isPayloadDebugEnabled()) return

  if (details) {
    console.log(`[payload-debug][${scope}] ${message}`, details)
    return
  }

  console.log(`[payload-debug][${scope}] ${message}`)
}

export function payloadDebugError(scope: string, message: string, error: unknown) {
  if (!isPayloadDebugEnabled()) return
  console.error(`[payload-debug][${scope}] ${message}`, error)
}
