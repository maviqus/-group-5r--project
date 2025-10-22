require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/buoi5';

async function run() {
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('MongoDB connected for seeding');

  const email = 'admin@example.com';
  const existing = await User.findOne({ email });
  if (existing) {
    console.log('Admin already exists');
    return process.exit(0);
  }

  const password = 'AdminPass123';
  const hashed = await bcrypt.hash(password, 10);
  const admin = new User({ name: 'Admin', email, password: hashed, role: 'admin' });
  // Save without re-hashing since we've already hashed
  await admin.save({ validateBeforeSave: true });
  console.log('Admin created:', email, 'password:', password);
  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(1); });
