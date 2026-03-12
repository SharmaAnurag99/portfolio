import { getPayload } from 'payload'
import configPromise from '../payload.config'
import fs from 'fs'
import path from 'path'

const AI_IMAGES_DIR = '/Users/anuragsharma/.gemini/antigravity/brain/8f8c322f-8535-44e4-8ead-1347665eb73a';

const getLatestImage = (prefix: string) => {
    const files = fs.readdirSync(AI_IMAGES_DIR);
    const matching = files.filter(f => f.startsWith(prefix) && f.endsWith('.png'));
    matching.sort((a, b) => fs.statSync(path.join(AI_IMAGES_DIR, b)).mtimeMs - fs.statSync(path.join(AI_IMAGES_DIR, a)).mtimeMs);
    return matching.length > 0 ? path.join(AI_IMAGES_DIR, matching[0]) : null;
};

async function seedSpecificProjects() {
    console.log('Initializing Payload...');
    const payload = await getPayload({ config: configPromise });

    const mapping = [
        { filePrefix: 'hive_bounty', projectTitle: 'Hive Bounty Platform' },
        { filePrefix: 'astrol_k_sharma', projectTitle: 'Astrol K Sharma' },
        { filePrefix: 'cross_chain_bridge', projectTitle: 'Cross-Chain Bridge' },
        // Fallback for Cross-Chain Bridge if the title was seeded as Contract
        { filePrefix: 'cross_chain_bridge', projectTitle: 'Cross-Chain Bridge Contract' }
    ];

    for (const m of mapping) {
        const filePath = getLatestImage(m.filePrefix);
        if (!filePath) {
            console.warn(`No image found for prefix: ${m.filePrefix}`);
            continue;
        }

        const buffer = fs.readFileSync(filePath);
        const fileName = path.basename(filePath);

        // Find the specific project by title
        const records = await payload.find({
            collection: 'projects',
            where: { title: { equals: m.projectTitle } }
        });

        if (records.docs.length === 0) {
            console.log(`No project found with title: ${m.projectTitle}`);
            continue;
        }

        console.log(`Uploading ${fileName} for ${m.projectTitle}...`);

        const newMedia = await payload.create({
            collection: 'media',
            data: { alt: `${m.projectTitle} Thumbnail` },
            file: {
                data: buffer,
                mimetype: 'image/png',
                name: fileName,
                size: buffer.length
            }
        });

        for (const doc of records.docs) {
            await payload.update({
                collection: 'projects',
                id: doc.id,
                data: { image: newMedia.id }
            });
            console.log(`Successfully updated project: ${doc.title}`);
        }
    }

    console.log('Specific AI Image Seeding completed! 🎉');
    process.exit(0);
}

seedSpecificProjects().catch(console.error);
