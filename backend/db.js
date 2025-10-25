const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/buoi5';

let cached = global._mongo;

if (!cached) cached = global._mongo = { conn: null, promise: null };

async function connect() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then(mongooseInstance => {
      cached.conn = mongooseInstance;
      console.log('MongoDB connected successfully');
      return cached.conn;
    }).catch(err => {
      console.error('MongoDB connection error:', err);
      throw err;
    });
  }
  return cached.promise;
}

module.exports = connect;
