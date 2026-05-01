import type { CollectionConfig } from 'payload'
import { revalidateAfterChange, revalidateAfterDelete } from '@/lib/revalidate-frontend'

export const Education: CollectionConfig = {
    slug: "education",
    admin: {
        useAsTitle: "title"
    },
    access: {
        read: () => true
    },
    hooks: {
        afterChange: [revalidateAfterChange(['/'])],
        afterDelete: [revalidateAfterDelete(['/'])],
    },
    fields: [
        {
            name: "title",
            type: "text",
            required: true
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
        }
    ]
}