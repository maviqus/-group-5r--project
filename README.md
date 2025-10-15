# Group 5r Project - Node.js + React + MongoDB

## 📌 Giới thiệu dự án
Dự án quản lý người dùng (User Management) sử dụng:
- **Backend**: Node.js + Express + MongoDB Atlas
- **Frontend**: React (sẽ được phát triển bởi Sinh viên 2)
- **Database**: MongoDB Atlas
- **Version Control**: Git + GitHub

---

## 👥 Phân công nhiệm vụ

| Sinh viên | Vai trò | Nhiệm vụ chính |
|-----------|---------|----------------|
| **Sinh viên 1** | Backend Developer | Node.js + Express API |
| **Sinh viên 2** | Frontend Developer | React UI |
| **Sinh viên 3** | Database Developer | MongoDB Atlas Integration ✅ |

---

## 🚀 Hướng dẫn cài đặt và chạy

### 1. Clone repository
\`\`\`bash
git clone https://github.com/maviqus/-group-5r--project.git
cd -group-5r--project
\`\`\`

### 2. Setup Backend

#### Cài đặt dependencies
\`\`\`bash
cd backend
npm install
\`\`\`

#### Cấu hình MongoDB
Tạo file \`.env\` trong thư mục backend:
\`\`\`env
MONGODB_URI=mongodb+srv://NguyenXuanBach:<db_password>@cluster0.linphql.mongodb.net/groupDB?retryWrites=true&w=majority&appName=Cluster0
PORT=3000
\`\`\`

**Lưu ý**: Thay \`<db_password>\` bằng mật khẩu thực tế của MongoDB Atlas

#### Chạy server
\`\`\`bash
npm run dev    # Development với nodemon
npm start      # Production
\`\`\`

Server sẽ chạy tại: **http://localhost:3000**

---

## 📡 API Endpoints

### Base URL
\`\`\`
http://localhost:3000/api
\`\`\`

### User API

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| **GET** | \`/users\` | Lấy tất cả users |
| **GET** | \`/users/:id\` | Lấy user theo ID |
| **POST** | \`/users\` | Tạo user mới |
| **PUT** | \`/users/:id\` | Cập nhật user |
| **DELETE** | \`/users/:id\` | Xóa user |

**Chi tiết đầy đủ**: Xem file \`README_SinhVien3.md\`

---

## 🔧 Công nghệ sử dụng

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **MongoDB Atlas**: Cloud database
- **Mongoose**: MongoDB ODM
- **dotenv**: Environment variables
- **nodemon**: Auto-restart development

### Frontend (Coming soon)
- **React**: UI library
- **Axios**: HTTP client

---

## 📂 Cấu trúc dự án

\`\`\`
-group-5r--project/
├── backend/
│   ├── models/
│   │   └── User.js
│   ├── controllers/
│   │   └── userController.js
│   ├── routes/
│   │   └── user.js
│   ├── server.js
│   ├── .env (không commit)
│   ├── .env.example
│   └── package.json
├── frontend/          (coming soon)
├── .gitignore
├── README.md
└── README_SinhVien3.md
\`\`\`

---

## ✅ Tiến độ dự án

### Đã hoàn thành
- [x] **Hoạt động 1**: Chuẩn bị môi trường & khởi tạo dự án
- [x] **Hoạt động 2**: Cài đặt Node.js & cấu trúc backend
- [x] **Hoạt động 5**: Tích hợp MongoDB Atlas ✅
- [x] Tạo User model với Mongoose
- [x] Implement CRUD đầy đủ (GET, POST, PUT, DELETE)
- [x] Cấu hình server với MongoDB connection
- [x] Validation và error handling
- [x] Push branch database lên GitHub

### Đang thực hiện
- [ ] **Hoạt động 3**: Tạo REST API (Sinh viên 1)
- [ ] **Hoạt động 4**: Khởi tạo frontend React (Sinh viên 2)

### Sắp thực hiện
- [ ] Kết nối frontend với backend
- [ ] Test tích hợp
- [ ] Merge branches vào main

---

## 🧪 Testing

### Test với cURL
\`\`\`bash
# GET all users
curl http://localhost:3000/api/users

# POST create user
curl -X POST http://localhost:3000/api/users \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Nguyễn Văn A","email":"test@example.com"}'

# PUT update user
curl -X PUT http://localhost:3000/api/users/<user_id> \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Updated Name","email":"updated@example.com"}'

# DELETE user
curl -X DELETE http://localhost:3000/api/users/<user_id>
\`\`\`

### Test với Postman
1. Import hoặc tạo collection mới
2. Test các endpoints theo bảng API
3. Kiểm tra response và status codes

---

## 📚 Tài liệu chi tiết

- **README_SinhVien3.md** - Công việc Database Developer (Sinh viên 3)
- **backend/.env.example** - Template cấu hình MongoDB

---

## 🔗 Git Workflow

### Branches
- \`main\` - Branch chính
- \`backend\` - Backend development (Sinh viên 1)
- \`frontend\` - Frontend development (Sinh viên 2)
- \`database\` - Database integration (Sinh viên 3) ✅

### Quy trình
\`\`\`bash
# Clone repo
git clone <url>

# Tạo branch riêng
git checkout -b <branch-name>

# Commit thường xuyên
git add .
git commit -m "Mô tả rõ ràng"

# Push lên GitHub
git push origin <branch-name>

# Tạo Pull Request để merge
\`\`\`

---

## 💡 Troubleshooting

### Lỗi kết nối MongoDB
- Kiểm tra connection string trong \`.env\`
- Kiểm tra mật khẩu database user
- Kiểm tra Network Access (whitelist IP) trong MongoDB Atlas

### Port đã được sử dụng
\`\`\`bash
# Tìm process
lsof -i :3000

# Kill process
kill -9 <PID>
\`\`\`

---

## 👤 Repository & Contact

**GitHub**: https://github.com/maviqus/-group-5r--project

**Team Members**:
- Sinh viên 1: Backend Developer
- Sinh viên 2: Frontend Developer
- Sinh viên 3: Database Developer (Nguyễn Xuân Bách) ✅

---

## 📝 License
Dự án học tập - Group 5r

---

*Cập nhật lần cuối: 15/10/2025*
