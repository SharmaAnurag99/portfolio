'use client'

import { useEffect } from 'react'

const isDebugEnabled = process.env.NEXT_PUBLIC_PAYLOAD_DEBUG === 'true'

export default function AdminRuntimeDebug() {
  useEffect(() => {
    if (!isDebugEnabled) return

    console.log('[payload-debug][client] admin runtime mounted', {
      href: window.location.href,
      userAgent: window.navigator.userAgent,
      readyState: document.readyState,
      hasSes: typeof (globalThis as Record<string, unknown>).lockdown !== 'undefined',
    })

    const onError = (event: ErrorEvent) => {
      console.error('[payload-debug][client] window.onerror', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error,
      })
    }

    const onUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('[payload-debug][client] unhandledrejection', event.reason)
    }

    window.addEventListener('error', onError)
    window.addEventListener('unhandledrejection', onUnhandledRejection)

    return () => {
      window.removeEventListener('error', onError)
      window.removeEventListener('unhandledrejection', onUnhandledRejection)
    }
  }, [])

  return null
}
