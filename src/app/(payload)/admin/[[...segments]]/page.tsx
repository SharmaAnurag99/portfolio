import type { Metadata } from 'next'
import config from '@payload-config'
import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import { importMap } from '../importMap.js'
import { payloadDebug, payloadDebugError } from '@/lib/payload-debug'

export const dynamic = 'force-dynamic'

type Args = {
    params: Promise<{
        segments: string[]
    }>
    searchParams: Promise<{
        [key: string]: string | string[]
    }>
}

export const generateMetadata = async ({ params, searchParams }: Args): Promise<Metadata> => {
  payloadDebug('admin-page', 'generateMetadata start')
  try {
    const metadata = await generatePageMetadata({ config, params, searchParams })
    payloadDebug('admin-page', 'generateMetadata success')
    return metadata
  } catch (error) {
    payloadDebugError('admin-page', 'generateMetadata failed', error)
    throw error
  }
}

const Page = async ({ params, searchParams }: Args) => {
  payloadDebug('admin-page', 'RootPage render start')
  try {
    const rendered = await RootPage({ config, params, searchParams, importMap })
    payloadDebug('admin-page', 'RootPage render success')
    return rendered
  } catch (error) {
    payloadDebugError('admin-page', 'RootPage render failed', error)
    throw error
  }
}

export default Page