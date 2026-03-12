import { getPayload } from 'payload'
import configPromise from './payload.config'

const web3Projects = [
    {
        title: 'Hive Bounty Platform',
        description: 'Decentralized bounty system for GitHub-linked issues with automated reward distribution. Ranked Top 10 at Hive Hackathon.',
        tags: ['Hive', 'Dhive.js', 'GitHub API', 'React'],
        url: '#',
        githubUrl: '#'
    },
    {
        title: 'Cross-Chain Bridge Contract',
        description: 'EVM-based token bridge implementation with nonce tracking and validator approval logic. Tested in simulated multi-validator environment.',
        tags: ['Solidity', 'Foundry'],
        url: '#',
        githubUrl: '#'
    },
    {
        title: 'Liquid Staking Token (LST) Contract',
        description: 'On-chain staking and LST mint/burn mechanism with real-time APR dashboard. Used by 150+ users.',
        tags: ['Solidity', 'Hardhat', 'React', 'Tailwind CSS'],
        url: '#',
        githubUrl: '#'
    }
];

const web2Projects = [
    {
        title: 'AstroRekhaaji',
        description: 'Production service platform built with Next.js, Tailwind CSS, Cloudflare D1/R2, and PayPal. Features lead capture, email workflows, and end-to-end payment integration.',
        tags: ['Next.js', 'Tailwind', 'Cloudflare D1', 'R2', 'Nodemailer', 'PayPal'],
        url: 'https://astrorekhaaji.com',
        githubUrl: '#'
    },
    {
        title: 'Riva Arts',
        description: 'Complete redesign of a legacy website to improve visual appeal, brand perception, and client inquiry flows.',
        tags: ['Next.js', 'Tailwind', 'Supabase', 'Nodemailer', 'SEO'],
        url: 'https://www.rivaarts.in',
        githubUrl: '#'
    },
    {
        title: 'Astrol K Sharma',
        description: 'Full UI/UX redesign of a live Shopify website under strict constraints. Focused on performance, responsiveness, and usability without disrupting operations.',
        tags: ['Shopify', 'Liquid', 'eCommerce', 'UI/UX'],
        url: 'https://astrolksharma.com',
        githubUrl: '#'
    },
    {
        title: 'Aristo Hawk HR',
        description: 'Business website for HR services with conversion-focused design, lead inquiry flows, and SEO-friendly information architecture.',
        tags: ['Gatsby', 'SEO', 'React'],
        url: 'https://aristohawkhr.com',
        githubUrl: '#'
    },
    {
        title: 'Art Show',
        description: 'An interactive digital art gallery and exhibition platform designed for showcasing creative portfolios.',
        tags: ['React', 'Next.js', 'Tailwind'],
        url: 'https://artShow.sharmaanurag.in',
        githubUrl: '#'
    },
    {
        title: 'Elite Cafe',
        description: 'Modern and elegant restaurant website featuring a sleek online menu and automated reservation system.',
        tags: ['Web Design', 'UI/UX', 'Frontend'],
        url: 'https://elite-cafe.sharmaanurag.in',
        githubUrl: '#'
    },
    {
        title: 'Travel Agency',
        description: 'Comprehensive travel booking platform and destination guide with a clean, user-friendly interface.',
        tags: ['Travel', 'Booking', 'Next.js'],
        url: 'https://travelAgengy.sharmaanurag.in',
        githubUrl: '#'
    },
    {
        title: 'Mojito Cafe',
        description: 'A vibrant web presentation showcasing premium beverages, mixology services, and elegant cafe aesthetics.',
        tags: ['Web Design', 'Next.js', 'React'],
        url: 'https://mojito.sharmaanurag.in',
        githubUrl: '#'
    }
];

const technicalPosts = [
    {
        slug: 'optimizing-nextjs-performance',
        category: 'Technical',
        date: 'Aug 28',
        title: 'Optimizing Next.js for Maximum Performance',
        content: 'In modern web development, performance isn\'t just a luxury—it\'s a requirement. When working with Next.js, developers are handed a powerful set of tools out of the box... One of the most immediate gains you can achieve in a Next.js application is by properly utilizing the next/image component. Traditional <img> tags load the original asset size regardless of the viewport. Next.js, however, automatically optimizes images, serves them in modern formats like WebP or AVIF, and ensures they are responsive.',
    },
    {
        slug: 'starting-web-design-career',
        category: 'Branding',
        date: 'Aug 28',
        title: 'Starting and Growing a Career in Web Design',
        content: 'Breaking into web design can feel overwhelming. There are endless tools, evolving trends, and a constant debate over whether designers should learn how to code. But building a successful career in this space usually comes down to mastering a few core fundamentals rather than jumping on every new hype train. Start with the Fundamentals, Not the Tools. Figma, Sketch, Framer—these are just tools. They change. They update. They get replaced.'
    },
    {
        slug: 'security-audits-necessity',
        category: 'Security',
        date: 'Oct 15',
        title: 'Security Audits: Why Every Application Needs One',
        content: 'We often build applications with the "happy path" in mind. We imagine users clicking the buttons in the right order, submitting valid data, and gently interacting with our interfaces. But the internet is not a gentle place. A common misconception is that if code isn\'t public, it\'s safe. "No one knows how our internal API works, so they can\'t exploit it." This is security through obscurity, and it is a notoriously brittle defense.'
    },
    {
        slug: 'building-smart-ai-apps',
        category: 'AI',
        date: 'Oct 20',
        title: 'How to Build Smart Applications With AI Integration',
        content: 'The barrier to integrating Artificial Intelligence into everyday applications has virtually disappeared. A few years ago, adding AI meant hiring specialized machine learning engineers and spending months training models. Today, it mostly means making a well-structured HTTP request to an API. When people think of AI integration, they immediate think of chat interfaces. While Chat is powerful, the real magic happens when AI is invisible.'
    },
    {
        slug: 'top-design-tips-ux',
        category: 'Design',
        date: 'Nov 02',
        title: 'Top Design Tips for Creating Engaging User Experiences',
        content: 'User Experience (UX) is the invisible hand that guides a visitor through a digital space. When it\'s bad, the user notices immediately and leaves. When it\'s exceptional, the user doesn\'t notice it at all—they just accomplish their goal feeling satisfied. Designing for the Thumb: Over half of all web traffic comes from mobile devices. Yet, many interfaces are still designed on large desktop monitors and "shrunk down" for mobile. Real mobile design considers how humans hold phones.'
    }
];

const personalPosts = [
    {
        slug: 'my-journey-into-tech',
        category: 'Personal',
        date: 'Aug 28',
        title: 'My Journey into Tech',
        content: 'Everyone\'s entry into the technology industry is unique. Unlike medicine or law, there is rarely a strictly defined, singular path to becoming a software engineer or a designer. My journey was no different—a winding road of curiosity, frustration, and eventual breakthroughs. I didn\'t grow up writing code. I was always fascinated by computers, but primarily as a consumer of software, not a creator. It wasn\'t until I stumbled upon a basic HTML/CSS tutorial that the illusion shattered.'
    },
    {
        slug: 'my-first-pay-milestone',
        category: 'Career',
        date: 'Feb 10',
        title: 'My First Pay: The Milestone That Changed Everything',
        content: 'There are very few moments in a career quite as validating as receiving your first paycheck for writing code or designing an interface. It marks a transition from "enthusiastic hobbyist" to "professional." Finding that first person willing to part with their money in exchange for your digital skills is incredibly difficult. You don\'t have a portfolio of paid work to show them. You\'re effectively asking them to trust you based on blind faith and personal projects.'
    },
    {
        slug: 'my-journey-as-teacher',
        category: 'Teaching',
        date: 'Mar 05',
        title: 'My Journey as a Teacher and Mentor in Tech',
        content: 'They say that to truly master a subject, you must teach it to someone else. My pivot into mentoring and teaching wasn\'t entirely planned, but it became one of the most rewarding phases of my career in technology. When you are an expert, something called the "curse of knowledge" sets in. You forget what it feels like to not know what a variable is. You forget the extreme cognitive overload of trying to learn Git, the terminal, syntax, and logic all at the exact same time.'
    }
];

async function seedMissing() {
    console.log('Initializing Payload...')
    const payload = await getPayload({ config: configPromise })

    console.log('Clearing existing Projects and Blogs...')
    await payload.delete({ collection: 'projects', where: { id: { exists: true } } })
    await payload.delete({ collection: 'blogs', where: { id: { exists: true } } })

    console.log('Fetching the placeholder media...')
    const mediaObj = await payload.find({
        collection: 'media',
        limit: 1
    })

    if (mediaObj.docs.length === 0) {
        console.error("No media found. Please run seed.ts first to create the placeholder media.");
        process.exit(1);
    }

    const defaultMediaId = mediaObj.docs[0].id;

    console.log('Seeding Web3 Projects...')
    for (const p of web3Projects) {
        await payload.create({
            collection: 'projects',
            data: {
                title: p.title,
                content: p.description,
                category: 'BLOCKCHAIN',
                tags: p.tags.map(t => ({ tag: t })),
                image: defaultMediaId,
                url: p.url,
                githubUrl: p.githubUrl
            }
        })
    }

    console.log('Seeding Web2 Projects...')
    for (const p of web2Projects) {
        await payload.create({
            collection: 'projects',
            data: {
                title: p.title,
                content: p.description,
                category: 'WEB DEVELOPMENT',
                tags: p.tags.map(t => ({ tag: t })),
                image: defaultMediaId,
                url: p.url,
                githubUrl: p.githubUrl
            }
        })
    }

    console.log('Seeding Technical Blogs...')
    for (const b of technicalPosts) {
        await payload.create({
            collection: 'blogs',
            data: {
                title: b.title,
                slug: b.slug,
                category: b.category,
                date: b.date,
                // Since content format changed to richText, we can pass a basic lexical structure
                // or just let Payload attempt to parse it or just pass plain text if standard text is allowed
                // Wait, richText in Payload 3.0 requires Lexical format object
                // It's safer to just set the schema to 'textarea' or 'html' if we want to seed strings.
                // Wait! In the Blogs Schema I changed it to `richText`! 
                // Let's pass a generic Lexical node, or I can just drop richText and revert to textarea because seeding Lexical is deeply nested JSON.
                // Let's pass generic Lexical object:
                content: {
                    root: {
                        type: "root",
                        format: "",
                        indent: 0,
                        version: 1,
                        direction: "ltr",
                        children: [
                            {
                                type: "paragraph",
                                format: "",
                                indent: 0,
                                version: 1,
                                direction: "ltr",
                                children: [
                                    {
                                        mode: "normal",
                                        text: b.content,
                                        type: "text",
                                        style: "",
                                        detail: 0,
                                        format: 0,
                                        version: 1
                                    }
                                ]
                            }
                        ]
                    }
                },
                image: defaultMediaId,
            }
        })
    }

    console.log('Seeding Personal Blogs...')
    for (const b of personalPosts) {
        await payload.create({
            collection: 'blogs',
            data: {
                title: b.title,
                slug: b.slug,
                category: b.category,
                date: b.date,
                content: {
                    root: {
                        type: "root",
                        format: "",
                        indent: 0,
                        version: 1,
                        direction: "ltr",
                        children: [
                            {
                                type: "paragraph",
                                format: "",
                                indent: 0,
                                version: 1,
                                direction: "ltr",
                                children: [
                                    {
                                        mode: "normal",
                                        text: b.content,
                                        type: "text",
                                        style: "",
                                        detail: 0,
                                        format: 0,
                                        version: 1
                                    }
                                ]
                            }
                        ]
                    }
                },
                image: defaultMediaId,
            }
        })
    }

    console.log('Missing Seeding Complete! 🎉')
    process.exit(0)
}

seedMissing().catch(console.error)
