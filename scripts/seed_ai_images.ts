import { getPayload } from 'payload'
import configPromise from '../payload.config'
import fs from 'fs'
import path from 'path'

// Update these paths manually based on the brain directory
const AI_IMAGES_DIR = '/Users/anuragsharma/.gemini/antigravity/brain/8f8c322f-8535-44e4-8ead-1347665eb73a';

const getLatestImage = (prefix: string) => {
    const files = fs.readdirSync(AI_IMAGES_DIR);
    const matching = files.filter(f => f.startsWith(prefix) && f.endsWith('.png'));
    // Sort by modification time to get the newest one if there are multiple
    matching.sort((a, b) => {
        return fs.statSync(path.join(AI_IMAGES_DIR, b)).mtimeMs - fs.statSync(path.join(AI_IMAGES_DIR, a)).mtimeMs;
    });
    return matching.length > 0 ? path.join(AI_IMAGES_DIR, matching[0]) : null;
};

async function seedAIThumbnails() {
    console.log('Initializing Payload...');
    const payload = await getPayload({ config: configPromise });

    const mapping = [
        { filePrefix: 'web3_project_thumbnail', category: 'BLOCKCHAIN' },
        { filePrefix: 'web2_project_thumbnail', category: 'WEB DEVELOPMENT' }
    ];

    const blogMapping = [
        { filePrefix: 'blog_technical_thumbnail', category: 'Technical' },
        { filePrefix: 'blog_personal_thumbnail', category: 'Personal' }
    ];

    // Seed project images
    for (const m of mapping) {
        const filePath = getLatestImage(m.filePrefix);
        if (!filePath) {
            console.warn(`No image found for prefix: ${m.filePrefix}`);
            continue;
        }

        console.log(`Uploading ${filePath}...`);
        const buffer = fs.readFileSync(filePath);
        const fileName = path.basename(filePath);

        const newMedia = await payload.create({
            collection: 'media',
            data: { alt: `${m.category} AI Thumbnail` },
            file: {
                data: buffer,
                mimetype: 'image/png',
                name: fileName,
                size: buffer.length
            }
        });

        // Find projects matching category
        const records = await payload.find({
            collection: 'projects',
            where: { category: { equals: m.category } }
        });

        console.log(`Found ${records.docs.length} projects in category ${m.category}`);

        for (const doc of records.docs) {
            // Let's only update projects that don't already have one of our specific mapped images
            // We can check if it's currently using the placeholder by checking alt text if necessary, 
            // but it's fine to override placeholder
            await payload.update({
                collection: 'projects',
                id: doc.id,
                data: { image: newMedia.id }
            });
        }
    }

    // Seed Blog images
    for (const m of blogMapping) {
        const filePath = getLatestImage(m.filePrefix);
        if (!filePath) {
            console.warn(`No image found for prefix: ${m.filePrefix}`);
            continue;
        }

        console.log(`Uploading ${filePath}...`);
        const buffer = fs.readFileSync(filePath);
        const fileName = path.basename(filePath);

        const newMedia = await payload.create({
            collection: 'media',
            data: { alt: `${m.category} Blog AI Thumbnail` },
            file: {
                data: buffer,
                mimetype: 'image/png',
                name: fileName,
                size: buffer.length
            }
        });

        const records = await payload.find({
            collection: 'blogs',
            where: { category: { equals: m.category } }
        });

        console.log(`Found ${records.docs.length} blogs in category ${m.category}`);

        for (const doc of records.docs) {
            await payload.update({
                collection: 'blogs',
                id: doc.id,
                data: { image: newMedia.id }
            });
        }
    }

    console.log('AI Image Seeding successfully completed! 🎉');
    process.exit(0);
}

seedAIThumbnails().catch(console.error);
