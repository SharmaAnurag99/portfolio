import type { CollectionConfig } from 'payload'
import { revalidateAfterChange, revalidateAfterDelete } from '@/lib/revalidate-frontend'

const FRONTEND_PATHS = ['/', '/projects/web2', '/projects/web3']

export const Projects: CollectionConfig = {
    slug: "projects",
    admin: {
        useAsTitle: "title"
    },
    access: {
        read: () => true
    },
    hooks: {
        afterChange: [revalidateAfterChange(FRONTEND_PATHS)],
        afterDelete: [revalidateAfterDelete(FRONTEND_PATHS)],
    },
    fields: [
        {
            name: "title",
            type: "text",
            required: true
        },
        {
            name: "category",
            type: "text",
            required: true,
        },
        {
            name: "tags",
            type: "array",
            fields: [
                {
                    name: "tag",
                    type: "text"
                }
            ]
        },
        {
            name: "content",
            type: "textarea",
            required: true
        },
        {
            name: "image",
            type: "upload",
            relationTo: "media",
            required: true
        },
        {
            name: "url",
            type: "text",
        },
        {
            name: "githubUrl",
            type: "text",
        }
    ]
}