// backend/createAdmin.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const createAdminUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Delete existing admin user if exists
    await mongoose.connection.db.collection('users').deleteOne({ email: 'admin@sweets.com' });
    console.log('Removed existing admin user');

    // Hash the password properly
    const hashedPassword = await bcrypt.hash('admin123', 12);

    // Create new admin user with properly hashed password
    const adminUser = {
      name: 'Sweet Shop Admin',
      email: 'admin@sweets.com',
      password: hashedPassword,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await mongoose.connection.db.collection('users').insertOne(adminUser);
    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: admin@sweets.com');
    console.log('🔑 Password: admin123');
    console.log('👑 Role: admin');

  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

createAdminUser();