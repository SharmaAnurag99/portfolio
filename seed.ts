import { getPayload } from 'payload'
import configPromise from './payload.config'

const testimonials = [
    {
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
        quote: 'Absolutely ecstatic with the results! The team delivered beyond our expectations, providing a platform that truly represents our vision.',
        name: 'LK Sharma',
        role: 'AstroScientist',
    },
    {
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
        quote: 'Professional, timely, and incredibly skilled. The project was handled with utmost care and the final product is flawless.',
        name: 'Rajeev',
        role: 'Client',
    },
    {
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
        quote: 'A game-changer for our business. The attention to detail and technical expertise shown throughout the process was impressive.',
        name: 'Vinit Vijal',
        role: 'Founder QodeML Labs',
    },
    {
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face',
        quote: 'Anurag transformed our outdated platform into a modern, high-performance web app. Highly recommended!',
        name: 'Alkaif Ansari',
        role: 'ML Engineer at CBS',
    },
];

const projects = [
    {
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80', // Replace placeholder with real URL
        category: 'WEB DEVELOPMENT',
        title: 'AstroRekhaaji',
        description: 'Production service platform built with Next.js, Tailwind CSS, Cloudflare D1/R2, and PayPal.',
        url: '#',
        githubUrl: '#'
    },
    {
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
        category: 'WEB DEVELOPMENT',
        title: 'Riva Arts',
        description: 'Redesigned legacy website to improve visual appeal, brand perception, and client inquiry flows.',
        url: '#',
        githubUrl: '#'
    },
    {
        image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&q=80',
        category: 'BLOCKCHAIN',
        title: 'Hive Bounty Platform',
        description: 'Decentralized bounty system for GitHub-linked issues, Top 10 at Hive Hackathon.',
        url: '#',
        githubUrl: '#'
    },
    {
        image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80',
        category: 'E-COMMERCE',
        title: 'Astrol K Sharma',
        description: 'Shopify website redesign preserving business logic and payment integrations.',
        url: '#',
        githubUrl: '#'
    },
    {
        image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800&q=80',
        category: 'SMART CONTRACTS',
        title: 'Cross-Chain Bridge',
        description: 'EVM-based token bridge implementation with nonce tracking and validator logic.',
        url: '#',
        githubUrl: '#'
    }
];

const skills = [
    { name: "JavaScript" }, { name: "TypeScript" }, { name: "Python" }, { name: "C++" }, { name: "ReactJS" }, { name: "Next.js" },
    { name: "Node.js" }, { name: "REST APIs" }, { name: "TailwindCSS" }, { name: "SQL" }, { name: "MongoDB" }, { name: "Rust" },
    { name: "Cloudflare (D1, R2)" }, { name: "Supabase" }, { name: "Git" }, { name: "Linux" }, { name: "Docker" }, { name: "Agile" },
    { name: "Data Structures & Algorithms" }, { name: "Machine Learning" }
];

const experiences = [
    {
        title: "Founding Developer at QodeML Labs",
        content: "Co-founded and led development for a product-focused tech agency. Delivered real-world web, AI, and software solutions for global clients. Owned product planning, UI/UX, development, deployment, and support. Worked closely with founders and business teams on requirements, delivery, and growth. Contributed to lead generation, client acquisition, and recurring revenue.\n\nSeptember 2024 – Present"
    },
    {
        title: "Blockchain Developer Intern at BlockSeBlock",
        content: "Worked on a supply-chain product built on Internet Computer (ICP). Translated logistics requirements into backend features using Rust canisters. Integrated Internet Identity for secure authentication. Collaborated across frontend and backend to deliver end-to-end product flows. Participated in testing and iterative product improvements.\n\nJuly 2025 – August 2025"
    },
    {
        title: "Developer Advocate at HackQuest",
        content: "Selected in the top 5% of global applicants. Authored 5+ Web3 educational threads and completed 12 Zealy quests. Onboarded 30+ developers into Starknet hackathons. Supported builders with technical guidance and community engagement.\n\nMarch 2025 – August 2025"
    },
    {
        title: "Research Intern at SSCBS, University of Delhi",
        content: "Analyzed 1M+ cryptocurrency tweets using Python and NLP. Built sentiment analysis pipelines with 85% classification accuracy. Studied correlation between sentiment trends and token price movements. Applied LLM-based models for enhanced trend forecasting.\n\nJune 2023 – September 2023"
    }
];


async function seed() {
    console.log('Initializing Payload...')
    const payload = await getPayload({ config: configPromise })

    console.log('Clearing existing data...')

    // Note: Drizzle throws if trying to delete all without where clause in some versions
    // Payload local API safely handles it
    await payload.delete({ collection: 'testimonials', where: { id: { exists: true } } })
    await payload.delete({ collection: 'projects', where: { id: { exists: true } } })
    await payload.delete({ collection: 'skills', where: { id: { exists: true } } })
    await payload.delete({ collection: 'education', where: { id: { exists: true } } })
    await payload.delete({ collection: 'media', where: { id: { exists: true } } })

    console.log('Uploading default media placeholders...')
    // We need a media object for relations
    const imageResponse = await fetch('https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80')
    const arrayBuffer = await imageResponse.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const defaultMedia = await payload.create({
        collection: 'media',
        data: { alt: 'Default Placeholder Image' },
        file: {
            data: buffer,
            mimetype: 'image/jpeg',
            name: 'placeholder.jpg',
            size: buffer.length
        }
    })

    console.log('Seeding Testimonials...')
    for (const t of testimonials) {
        await payload.create({
            collection: 'testimonials',
            data: {
                name: t.name,
                role: t.role,
                content: t.quote,  // Schema says 'content', UI array says 'quote'
                image: defaultMedia.id, // Replace URL with media relation ID
            }
        })
    }

    console.log('Seeding Projects...')
    for (const p of projects) {
        await payload.create({
            collection: 'projects',
            data: {
                title: p.title,
                content: p.description, // Schema says 'content', UI array says 'description'
                image: defaultMedia.id,
                url: p.url,
                githubUrl: p.githubUrl
            }
        })
    }

    console.log('Seeding Skills...')
    for (const s of skills) {
        await payload.create({
            collection: 'skills',
            data: {
                name: s.name,
                image: defaultMedia.id, // Schema requires an image relation
            }
        })
    }

    console.log('Seeding Experience (Education collection)...')
    for (const e of experiences) {
        await payload.create({
            collection: 'education',
            data: {
                title: e.title,
                content: e.content,
                image: defaultMedia.id,
            }
        })
    }

    console.log('Seeding Complete! 🎉')
    process.exit(0)
}

seed().catch(console.error)
