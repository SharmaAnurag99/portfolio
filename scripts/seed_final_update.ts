import { getPayload } from 'payload'
import configPromise from '../payload.config' // use the exported config
import fs from 'fs'
import path from 'path'

const staticCategorizedSkills = [
    {
        category: "Technical Skills",
        items: ["JavaScript", "TypeScript", "Python", "C++", "ReactJS", "Next.js", "Node.js", "REST APIs", "TailwindCSS", "SQL", "MongoDB", "Rust"]
    },
    {
        category: "Cloud & DevTools",
        items: ["Cloudflare (D1, R2)", "Supabase", "Git", "Linux", "Docker", "Agile"]
    },
    {
        category: "Coursework",
        items: ["Data Structures & Algorithms", "DBMS", "Computer Networks", "Machine Learning", "Artificial Intelligence", "Deep Learning", "Data Mining"]
    },
    {
        category: "Soft Skills",
        items: ["Communication", "Teamwork", "Problem-Solving", "Leadership", "Adaptability", "Time Management"]
    }
];

const imageMapping = [
    { file: 'lksharma.png', type: 'testimonial', name: 'LK Sharma' },
    { file: 'aristohawk.png', type: 'project', title: 'Aristo Hawk HR' },
    { file: 'rekhaaji.png', type: 'project', title: 'AstroRekhaaji' },
    { file: 'riva.png', type: 'project', title: 'Riva Arts' }
];

async function seedFinalUpdates() {
    console.log('Initializing Payload...')
    const payload = await getPayload({ config: configPromise })

    console.log('--- 1. Resetting and Re-seeding Skills with Categories ---')
    await payload.delete({ collection: 'skills', where: { id: { exists: true } } })

    // Get default media for skills
    const mediaObj = await payload.find({ collection: 'media', limit: 1 })
    const defaultMediaId = mediaObj.docs.length > 0 ? mediaObj.docs[0].id : null;

    if (!defaultMediaId) {
        console.error("No default media found to link to skills.");
        process.exit(1);
    }

    for (const group of staticCategorizedSkills) {
        for (const item of group.items) {
            await payload.create({
                collection: 'skills',
                data: {
                    name: item,
                    category: group.category,
                    image: defaultMediaId
                }
            });
        }
    }
    console.log('Skills successfully categorized and seeded!');

    console.log('--- 2. Uploading public images and mapping ---')
    for (const mapping of imageMapping) {
        const filePath = path.join(process.cwd(), 'public', mapping.file);

        if (!fs.existsSync(filePath)) {
            console.warn(`File ${mapping.file} not found in public/ directory.`);
            continue;
        }

        const buffer = fs.readFileSync(filePath);

        // Upload to media collection
        const newMedia = await payload.create({
            collection: 'media',
            data: { alt: mapping.file },
            file: {
                data: buffer,
                mimetype: 'image/png',
                name: mapping.file,
                size: buffer.length
            }
        });

        console.log(`Uploaded ${mapping.file} with media ID: ${newMedia.id}`);

        // Update exact entity
        if (mapping.type === 'testimonial') {
            const records = await payload.find({
                collection: 'testimonials',
                where: { name: { equals: mapping.name } }
            });
            if (records.docs.length > 0) {
                await payload.update({
                    collection: 'testimonials',
                    id: records.docs[0].id,
                    data: { image: newMedia.id }
                });
                console.log(`Assigned ${mapping.file} to testimonial: ${mapping.name}`);
            }
        } else if (mapping.type === 'project') {
            const records = await payload.find({
                collection: 'projects',
                where: { title: { equals: mapping.title } }
            });
            if (records.docs.length > 0) {
                await payload.update({
                    collection: 'projects',
                    id: records.docs[0].id,
                    data: { image: newMedia.id }
                });
                console.log(`Assigned ${mapping.file} to project: ${mapping.title}`);
            }
        }
    }

    console.log('Final DB Update Complete! 🎉')
    process.exit(0)
}

seedFinalUpdates().catch(console.error)
