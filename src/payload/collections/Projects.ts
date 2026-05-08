import type { CollectionConfig } from 'payload'
import { revalidateAfterChange, revalidateAfterDelete } from '@/lib/revalidate-frontend'
import { slugify } from '@/lib/slugify'

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
            name: "slug",
            type: "text",
            unique: true,
            index: true,
            admin: {
                position: 'sidebar',
                description: "Auto-generated from title if left blank. Used for /projects/[slug] case study URL.",
            },
            hooks: {
                beforeChange: [
                    ({ value, data }) => {
                        if (value && typeof value === 'string' && value.trim().length > 0) {
                            return slugify(value)
                        }
                        if (data?.title) return slugify(String(data.title))
                        return value
                    },
                ],
            },
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
            name: "outcome",
            type: "text",
            admin: {
                description: "One-line outcome shown on the projects reel card. Optional.",
            },
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
        },
        {
            name: "roleSummary",
            type: "text",
            admin: {
                description: "e.g. 'Founding engineer · solo build'. Shown on case study meta strip.",
            },
        },
        {
            name: "stackList",
            type: "array",
            admin: {
                description: "Tech stack chips. Optional, falls back to 'tags' if empty.",
            },
            fields: [
                {
                    name: "name",
                    type: "text",
                    required: true,
                },
            ],
        },
        {
            name: "year",
            type: "text",
            admin: {
                description: "Year shipped, e.g. '2025'.",
            },
        },
        {
            name: "brief",
            type: "textarea",
            admin: {
                description: "Case study — 'the brief' paragraph.",
            },
        },
        {
            name: "approach",
            type: "array",
            admin: {
                description: "Case study — 'what we shipped' bullet list.",
            },
            fields: [
                {
                    name: "point",
                    type: "textarea",
                    required: true,
                },
            ],
        },
        {
            name: "outcomeStats",
            type: "array",
            admin: {
                description: "1-3 numerical outcomes for case study, e.g. '40% conversion lift'.",
            },
            maxRows: 3,
            fields: [
                {
                    name: "value",
                    type: "text",
                    required: true,
                },
                {
                    name: "label",
                    type: "text",
                    required: true,
                },
            ],
        },
        {
            name: "gallery",
            type: "array",
            admin: {
                description: "Case study image gallery (2-3 screenshots).",
            },
            fields: [
                {
                    name: "image",
                    type: "upload",
                    relationTo: "media",
                    required: true,
                },
                {
                    name: "caption",
                    type: "text",
                },
            ],
        },
    ]
}
