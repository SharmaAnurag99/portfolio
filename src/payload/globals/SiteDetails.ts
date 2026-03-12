import type { GlobalConfig } from 'payload'

export const SiteDetails: GlobalConfig = {
    slug: 'site-details',
    access: {
        read: () => true,
    },
    fields: [
        { name: 'heroTitle', type: 'text', required: true, defaultValue: 'Hi, I am Anurag Sharma' },
        { name: 'heroSubtitle', type: 'text', required: true },
        { name: 'aboutText', type: 'richText' },
        { name: 'contactEmail', type: 'text', required: true },
    ],
}
