require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/crowdsourced');

        let adminUser = await User.findOne({ email: 'admin@urbaneye.com' });
        if (adminUser) {
            console.log('Admin already exists. You can login with admin@urbaneye.com / admin123');
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('admin123', salt);

            adminUser = new User({
                name: 'System Admin',
                email: 'admin@urbaneye.com',
                password: hashedPassword,
                role: 'admin',
                onboarded: true
            });
            await adminUser.save();
            console.log('✅ Admin user created successfully!');
            console.log('Email: admin@urbaneye.com');
            console.log('Password: admin123');
        }
        process.exit();
    } catch (err) {
        console.error('Error seeding admin:', err);
        process.exit(1);
    }
};

seedAdmin();
