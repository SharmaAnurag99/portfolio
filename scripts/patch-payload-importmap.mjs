import { readFile, writeFile } from 'node:fs/promises'

const importMapPath = new URL('../src/app/(payload)/admin/importMap.js', import.meta.url)
const storageImport =
  "import { S3ClientUploadHandler as S3ClientUploadHandler_StorageS3Client } from '@payloadcms/storage-s3/client'"
const storageKey =
  '"@payloadcms/storage-s3/client#S3ClientUploadHandler": S3ClientUploadHandler_StorageS3Client,'

const file = await readFile(importMapPath, 'utf8')

let updated = file

if (!updated.includes(storageImport)) {
  const firstExportIndex = updated.indexOf('\n\nexport const importMap = {')
  if (firstExportIndex === -1) {
    throw new Error('Could not locate importMap export block in generated importMap.js')
  }

  updated =
    updated.slice(0, firstExportIndex) +
    `\n${storageImport}` +
    updated.slice(firstExportIndex)
}

if (!updated.includes(storageKey)) {
  const marker = '"@payloadcms/next/rsc#CollectionCards":'
  const markerIndex = updated.indexOf(marker)
  if (markerIndex === -1) {
    throw new Error('Could not locate CollectionCards entry in importMap.js')
  }

  updated =
    updated.slice(0, markerIndex) +
    `${storageKey}\n  ` +
    updated.slice(markerIndex)
}

if (updated !== file) {
  await writeFile(importMapPath, updated, 'utf8')
  console.log('Patched Payload importMap with S3 client upload handler')
} else {
  console.log('Payload importMap already contains S3 client upload handler')
}
