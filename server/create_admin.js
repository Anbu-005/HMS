require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const connectDB = require('./database');

async function createAdmin() {
    await connectDB();

    const adminEmail = 'admin@gmail.com';
    const adminPassword = 'admin_secure_2026';
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    try {
        const existingAdmin = await User.findOne({ email: adminEmail });
        if (existingAdmin) {
            console.log('Admin already exists with this email.');
            process.exit(0);
        }

        await User.create({
            name: 'System Admin',
            email: adminEmail,
            password: hashedPassword,
            role: 'admin',
            status: 'active'
        });

        console.log('--- Admin Account Created ---');
        console.log('Email:', adminEmail);
        console.log('Password:', adminPassword);
        console.log('-----------------------------');

    } catch (err) {
        console.error('Error creating admin:', err.message);
    } finally {
        process.exit();
    }
}

createAdmin();
