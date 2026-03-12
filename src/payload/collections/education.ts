import { CollectionConfig } from "payload";

export const Education: CollectionConfig = {
    slug: "education",
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