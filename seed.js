// Script tạo dữ liệu mẫu cho MongoDB
// Chạy từ thư mục gốc: node seed.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables từ backend/.env
dotenv.config({ path: path.join(__dirname, 'backend', '.env') });

// Import User model
const User = require('./backend/models/User');

// Dữ liệu mẫu
const sampleUsers = [
    {
        name: "Nguyễn Văn An",
        email: "nguyenvanan@example.com"
    },
    {
        name: "Trần Thị Bình",
        email: "tranthib@example.com"
    },
    {
        name: "Lê Văn Cường",
        email: "levancuong@example.com"
    },
    {
        name: "Phạm Thị Dung",
        email: "phamthidung@example.com"
    },
    {
        name: "Hoàng Văn Em",
        email: "hoangvanem@example.com"
    },
    {
        name: "Nguyễn Thị Fang",
        email: "nguyenthifang@example.com"
    },
    {
        name: "Đỗ Văn Giang",
        email: "dovangiang@example.com"
    },
    {
        name: "Vũ Thị Hoa",
        email: "vuthihoa@example.com"
    },
    {
        name: "Bùi Văn Ích",
        email: "buivanich@example.com"
    },
    {
        name: "Đinh Thị Kim",
        email: "dinhthikim@example.com"
    }
];

// Hàm seed dữ liệu
async function seedDatabase() {
    try {
        // Kết nối MongoDB
        console.log('🔄 Đang kết nối MongoDB Atlas...');
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ Kết nối MongoDB thành công!\n');

        // Xóa dữ liệu cũ (nếu có)
        console.log('🗑️  Đang xóa dữ liệu cũ...');
        await User.deleteMany({});
        console.log('✅ Đã xóa dữ liệu cũ\n');

        // Thêm dữ liệu mẫu
        console.log('📝 Đang thêm dữ liệu mẫu...');
        const users = await User.insertMany(sampleUsers);
        console.log(`✅ Đã thêm ${users.length} users vào database!\n`);

        // Hiển thị danh sách users
        console.log('👥 DANH SÁCH USERS:');
        console.log('='.repeat(80));
        users.forEach((user, index) => {
            console.log(`${index + 1}. ${user.name.padEnd(25)} | ${user.email.padEnd(30)} | ID: ${user._id}`);
        });
        console.log('='.repeat(80));
        console.log(`\n✨ Hoàn thành! Đã tạo ${users.length} users mẫu.\n`);

        // Thống kê
        const count = await User.countDocuments();
        console.log('📊 THỐNG KÊ:');
        console.log(`   - Tổng số users trong database: ${count}`);
        console.log(`   - Database: groupDB`);
        console.log(`   - Collection: users`);
        console.log(`   - Cluster: Cluster0\n`);

        console.log('🌐 XEM DỮ LIỆU TRÊN MONGODB ATLAS:');
        console.log('   1. Truy cập: https://cloud.mongodb.com/');
        console.log('   2. Đăng nhập với tài khoản của bạn');
        console.log('   3. Chọn Cluster0 → Browse Collections');
        console.log('   4. Database: groupDB → Collection: users');
        console.log('   5. Xem 10 users mẫu vừa tạo!\n');

        // Đóng kết nối
        await mongoose.connection.close();
        console.log('👋 Đã đóng kết nối MongoDB.');
        process.exit(0);

    } catch (error) {
        console.error('❌ Lỗi:', error.message);
        process.exit(1);
    }
}

// Chạy seed
console.log('\n🚀 BẮT ĐẦU TẠO DỮ LIỆU MẪU...\n');
seedDatabase();
