import { CollectionConfig } from "payload";

export const Projects: CollectionConfig = {
    slug: "projects",
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