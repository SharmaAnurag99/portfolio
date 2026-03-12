import { CollectionConfig } from "payload";

export const Skills: CollectionConfig = {
    slug: "skills",
    admin: {
        useAsTitle: "name"
    },
    access: {
        read: () => true
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