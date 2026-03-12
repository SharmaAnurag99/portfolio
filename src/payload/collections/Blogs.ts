import { CollectionConfig } from "payload";

export const Blogs: CollectionConfig = {
    slug: "blogs",
    admin: {
        useAsTitle: "title"
    },
    access: {
        read: () => true
    },
    fields: [
        {
            name: "title",
            type: "text",
            required: true
        },
        {
            name: "slug",
            type: "text",
            required: true,
            unique: true,
            admin: {
                position: 'sidebar'
            }
        },
        {
            name: "category",
            type: "text",
            required: true,
            admin: {
                position: 'sidebar'
            }
        },
        {
            name: "date",
            type: "text",
            required: true,
            admin: {
                position: 'sidebar'
            }
        },
        {
            name: "content",
            type: "richText",
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