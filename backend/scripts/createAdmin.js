import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import readline from 'readline';
import path from 'path';
import { fileURLToPath } from 'url';
import User from '../models/User.js'; // Adjust path as necessary

// Resolve the path to the .env file located in the parent directory (backend/)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '../.env');

const dotenvResult = dotenv.config({ path: envPath });

if (dotenvResult.error) {
  console.error('Error loading .env file:', dotenvResult.error);
} else {
  console.log('.env file loaded successfully from:', envPath);
  if (dotenvResult.parsed) {
    console.log('Variables loaded from .env:', Object.keys(dotenvResult.parsed).join(', '));
  }
}


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const promptUser = (query) => {
  return new Promise((resolve) => rl.question(query, resolve));
};

const createAdminUser = async () => {
  if (!process.env.MONGODB_URI) {
    console.error('Error: MONGODB_URI is not defined in your .env file.');
    process.exit(1);
  }

  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected.');

    const name = await promptUser('Enter admin name: ');
    const username = await promptUser('Enter admin username (this will be used for the email like username@edufeedback.ai): ');
    const password = await promptUser('Enter admin password: ');

    if (!name || !username || !password) {
      console.error('Error: Name, username, and password are required.');
      rl.close();
      await mongoose.disconnect();
      process.exit(1);
    }

    const email = `${username.toLowerCase()}@edufeedback.ai`;

    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      console.log(`Admin user with email ${email} already exists.`);
      rl.close();
      await mongoose.disconnect();
      process.exit(0);
    }

    const newAdmin = new User({
      name,
      email,
      password, // Password will be hashed by the pre-save hook in User.js
      role: 'admin'
    });

    await newAdmin.save();
    console.log(`Admin user ${name} (${email}) created successfully!`);

  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    rl.close();
    await mongoose.disconnect();
    console.log('MongoDB Disconnected.');
    process.exit(0);
  }
};

createAdminUser();