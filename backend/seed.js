// Script tạo dữ liệu mẫu cho MongoDB
// Chạy từ thư mục backend: node seed.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import User model
const User = require('./models/User');

// Dữ liệu mẫu - 10 users
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
    name: "Nguyễn Thị Phương",
    email: "nguyenthiphuong@example.com"
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
    console.log('\n🔄 Đang kết nối MongoDB Atlas...');
    // Support both environment variable names to avoid docs mismatch
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
    if (!mongoUri) {
      console.error('\n❌ Không tìm thấy connection string MongoDB. Vui lòng đặt biến môi trường MONGODB_URI hoặc MONGO_URI.');
      process.exit(1);
    }
    await mongoose.connect(mongoUri);
    console.log('✅ Kết nối MongoDB thành công!\n');

    // Xóa dữ liệu cũ (nếu có)
    console.log('🗑️  Đang xóa dữ liệu cũ...');
    const deletedCount = await User.deleteMany({});
    console.log(`✅ Đã xóa ${deletedCount.deletedCount} documents cũ\n`);

    // Thêm dữ liệu mẫu
    console.log('📝 Đang thêm dữ liệu mẫu...');
    const users = await User.insertMany(sampleUsers);
    console.log(`✅ Đã thêm ${users.length} users vào database!\n`);

    // Hiển thị danh sách users
    console.log('👥 DANH SÁCH USERS:');
    console.log('='.repeat(100));
    users.forEach((user, index) => {
      console.log(`${(index + 1).toString().padStart(2, '0')}. ${user.name.padEnd(25)} | ${user.email.padEnd(35)} | ID: ${user._id}`);
    });
    console.log('='.repeat(100));
    console.log(`\n✨ Hoàn thành! Đã tạo ${users.length} users mẫu.\n`);

    // Thống kê
    const count = await User.countDocuments();
    console.log('📊 THỐNG KÊ:');
    console.log(`   ✓ Tổng số users trong database: ${count}`);
    console.log(`   ✓ Database: groupDB`);
    console.log(`   ✓ Collection: users`);
    console.log(`   ✓ Cluster: Cluster0\n`);

    console.log('🌐 XEM DỮ LIỆU TRÊN MONGODB ATLAS:');
    console.log('   1. Truy cập: https://cloud.mongodb.com/');
    console.log('   2. Đăng nhập với tài khoản của bạn');
    console.log('   3. Chọn Cluster0 → Browse Collections');
    console.log('   4. Database: groupDB → Collection: users');
    console.log('   5. Bạn sẽ thấy 10 users mẫu vừa tạo!\n');

    console.log('🧪 TEST VỚI API:');
    console.log('   GET  http://localhost:3000/api/users');
    console.log('   hoặc');
    console.log('   curl http://localhost:3000/api/users\n');

    // Đóng kết nối
    await mongoose.connection.close();
    console.log('👋 Đã đóng kết nối MongoDB.');
    console.log('✅ Script hoàn thành!\n');
    process.exit(0);

  } catch (error) {
    console.error('\n❌ LỖI:', error.message);
    console.error('\n💡 Kiểm tra:');
    console.error('   - File .env có đúng MONGODB_URI không?');
    console.error('   - MongoDB Atlas Network Access đã whitelist IP chưa?');
    console.error('   - Password trong connection string đúng chưa?\n');
    process.exit(1);
  }
}

// Chạy seed
console.log('\n🚀 ========================================');
console.log('   BẮT ĐẦU TẠO DỮ LIỆU MẪU');
console.log('========================================');
seedDatabase();
