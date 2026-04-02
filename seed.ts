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


const blogs = [
    {
        title: 'Why Being "Unsafe" is Rust’s Secret Superpower: 5 Takeaways from the Containment Protocol',
        slug: 'rust-unsafe-superpower',
        category: 'Systems Programming',
        date: 'April 2, 2026',
        content: {
            root: {
                type: 'root',
                format: '',
                indent: 0,
                version: 1,
                children: [
                    {
                        type: 'paragraph',
                        version: 1,
                        children: [{ type: 'text', text: 'There is a specific kind of architectural frustration known only to Rust developers: writing a program that you know is memory-safe, only to have the compiler’s borrow checker reject it with cold, mathematical certainty.', version: 1 }]
                    },
                    {
                        type: 'paragraph',
                        version: 1,
                        children: [{ type: 'text', text: 'However, we operate on inherently "volatile" hardware. Systems programming requires arbitrary low-level memory access—capabilities that hardware, which lacks any concept of a borrow checker, demands. The answer is the unsafe keyword. It isn\'t a "break glass in case of emergency" button; it is the deliberate bridge between high-level safe analysis and the reality of system hardware.', version: 1 }]
                    },
                    {
                        type: 'heading',
                        tag: 'h2',
                        version: 1,
                        children: [{ type: 'text', text: 'Takeaway 1: The "Unsafe" Keyword is an Override, Not a Shutdown', version: 1 }]
                    },
                    {
                        type: 'paragraph',
                        version: 1,
                        children: [{ type: 'text', text: 'A common misconception is that wrapping code in an unsafe block disables the compiler’s brain. In reality, unsafe provides a surgical override for specific operations, not a total abandonment of the safety net.', version: 1 }]
                    },
                    {
                        type: 'quote',
                        version: 1,
                        children: [{ type: 'text', text: '"unsafe does NOT disable Rust\'s safety checks. It simply transfers the onus of verifying five specific memory contracts from the compiler directly to the developer."', version: 1 }]
                    },
                    {
                        type: 'heading',
                        tag: 'h2',
                        version: 1,
                        children: [{ type: 'text', text: 'Takeaway 2: The Five "Clearances" of the Containment Zone', version: 1 }]
                    },
                    {
                        type: 'list',
                        listType: 'bullet',
                        version: 1,
                        children: [
                            { type: 'listitem', children: [{ type: 'text', text: 'Dereference raw pointers', version: 1 }] },
                            { type: 'listitem', children: [{ type: 'text', text: 'Call unsafe functions or methods', version: 1 }] },
                            { type: 'listitem', children: [{ type: 'text', text: 'Access or modify mutable static variables', version: 1 }] },
                            { type: 'listitem', children: [{ type: 'text', text: 'Implement unsafe traits', version: 1 }] },
                            { type: 'listitem', children: [{ type: 'text', text: 'Access fields of foreign C-style unions', version: 1 }] }
                        ]
                    },
                    {
                        type: 'heading',
                        tag: 'h2',
                        version: 1,
                        children: [{ type: 'text', text: 'Takeaway 3: The Physics of Raw Pointers', version: 1 }]
                    },
                    {
                        type: 'code',
                        language: 'rust',
                        version: 1,
                        children: [{ type: 'text', text: '// Safe Zone: Creation \nlet r1 = &num as *const i32;', version: 1 }]
                    },
                    {
                        type: 'paragraph',
                        version: 1,
                        children: [{ type: 'text', text: 'The danger only triggers during Dereferencing. This is the "Unsafe Zone":', version: 1 }]
                    },
                    {
                        type: 'code',
                        language: 'rust',
                        version: 1,
                        children: [{ type: 'text', text: 'unsafe { println!("{}", *r1); }', version: 1 }]
                    },
                    {
                        type: 'heading',
                        tag: 'h2',
                        version: 1,
                        children: [{ type: 'text', text: 'Takeaway 4: Architecting around the Borrow Checker’s Variable-Level Myopia', version: 1 }]
                    },
                    {
                        type: 'paragraph',
                        version: 1,
                        children: [{ type: 'text', text: 'The most elegant use of unsafe is solving "Blind Spots". We solve this using a three-stage Containment Protocol: Input Validation (Safe), The Containment Zone (Unsafe), and Output Packaging (Safe).', version: 1 }]
                    },
                    {
                        type: 'heading',
                        tag: 'h2',
                        version: 1,
                        children: [{ type: 'text', text: 'Takeaway 5: Building "Embassies" for the Outside World', version: 1 }]
                    },
                    {
                        type: 'code',
                        language: 'rust',
                        version: 1,
                        children: [{ type: 'text', text: '#[no_mangle]\npub extern "C" fn call_from_c() {\n    // This name is now predictable for external linkers\n}', version: 1 }]
                    },
                    {
                        type: 'paragraph',
                        version: 1,
                        children: [{ type: 'text', text: 'Unsafe code isn’t a way to break the rules. It’s the tool we use to write the rules.', version: 1 }]
                    }
                ]
            }
        }
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
    await payload.delete({ collection: 'blogs', where: { id: { exists: true } } })
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
                category: p.category,
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

    console.log('Seeding Blogs...')
    for (const b of blogs) {
        await payload.create({
            collection: 'blogs',
            data: {
                title: b.title,
                slug: b.slug,
                category: b.category,
                date: b.date,
                content: b.content,
                image: defaultMedia.id,
            }
        })
    }

    console.log('Seeding Complete! 🎉')
    process.exit(0)
}

seed().catch(console.error)
