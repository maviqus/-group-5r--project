const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// CORS middleware (cho phép frontend kết nối)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Kết nối MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('✅ Kết nối MongoDB Atlas thành công!'))
    .catch((err) => console.error('❌ Lỗi kết nối MongoDB:', err));

// Routes
app.use('/api', userRoutes);

// Route kiểm tra server
app.get('/', (req, res) => {
    res.json({ message: 'Server backend đang chạy!' });
});

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy trên cổng ${PORT}`);
});
