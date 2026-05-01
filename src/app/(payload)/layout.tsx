import config from '@payload-config'
import '@payloadcms/next/css'
import type { ServerFunctionClient } from 'payload'
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'
import React from 'react'
import { payloadDebug, payloadDebugError } from '@/lib/payload-debug'
import AdminRuntimeDebug from './admin/AdminRuntimeDebug'

import { importMap } from './admin/importMap.js'

type Args = {
    children: React.ReactNode
}

const serverFunction: ServerFunctionClient = async function (args) {
  'use server'

  payloadDebug('admin-layout', 'serverFunction called', {
    keys: Object.keys(args || {}),
  })

  try {
    const result = await handleServerFunctions({
      ...args,
      config,
      importMap,
    })

    payloadDebug('admin-layout', 'serverFunction success')
    return result
  } catch (error) {
    payloadDebugError('admin-layout', 'serverFunction failed', error)
    throw error
  }
}

const Layout = ({ children }: Args) => (
  <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
    <AdminRuntimeDebug />
    {children}
  </RootLayout>
)

export default Layout
