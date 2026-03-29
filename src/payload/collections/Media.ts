import { CollectionConfig } from "payload";
import path from "path";

export const Media: CollectionConfig = {
    slug: "media",
    upload: {
        staticDir: path.resolve(process.cwd(), 'public/media'),
    },
    admin: {
        useAsTitle: "alt"
    },
    access: {
        read: () => true
    },
    fields: [
        {
            name: "alt",
            type: "text",
            required: true
        }
    ]
}