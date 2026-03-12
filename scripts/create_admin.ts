import { getPayload } from 'payload'
import configPromise from '../payload.config'

async function createAdmin() {
    console.log('Initializing Payload...');
    const payload = await getPayload({ config: configPromise });

    const newEmail = 'admin@sharmaanurag.in';
    const newPassword = 'password123';

    try {
        // Try creating the new user
        const user = await payload.create({
            collection: 'users',
            data: {
                email: newEmail,
                password: newPassword,
            },
        });

        console.log('🎉 Successfully created new admin user!');
        console.log(`Email: ${newEmail}`);
        console.log(`Password: ${newPassword}`);
    } catch (error: any) {
        // If it fails because the email already exists, just update the password
        console.log('Attempting to reset password if user already exists...');
        const users = await payload.find({
            collection: 'users',
            where: { email: { equals: newEmail } }
        });

        if (users.docs.length > 0) {
            await payload.update({
                collection: 'users',
                id: users.docs[0].id,
                data: { password: newPassword }
            });
            console.log('🎉 Password explicitly reset for existing user!');
            console.log(`Email: ${newEmail}`);
            console.log(`Password: ${newPassword}`);
        } else {
            console.error('Error creating admin:', error);
        }
    }

    process.exit(0);
}

createAdmin();
