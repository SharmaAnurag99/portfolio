import type { CollectionConfig } from 'payload'
import { revalidateAfterChange, revalidateAfterDelete } from '@/lib/revalidate-frontend'

export const Skills: CollectionConfig = {
    slug: "skills",
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
            name: "image",
            type: "upload",
            relationTo: "media",
            required: true
        },
        {
            name: "category",
            type: "select",
            options: [
                "Technical Skills",
                "Cloud & DevTools",
                "Coursework",
                "Soft Skills"
            ],
            required: true,
            defaultValue: "Technical Skills"
        }
    ]
}