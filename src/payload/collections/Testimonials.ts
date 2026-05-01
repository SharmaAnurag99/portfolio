import type { CollectionConfig } from 'payload'
import { revalidateAfterChange, revalidateAfterDelete } from '@/lib/revalidate-frontend'

export const Testimonials: CollectionConfig = {
    slug: "testimonials",
    admin: {
        useAsTitle: "name"
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
            name: "name",
            type: "text",
            required: true
        },
        {
            name: "role",
            type: "text",
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