# README - Sinh Viên 3 (Database - MongoDB)

## 👤 Thông tin
- **Vai trò**: Database Developer (MongoDB Atlas)
- **Nhiệm vụ**: Tích hợp MongoDB Atlas và implement CRUD đầy đủ

---

## ✅ Công việc đã hoàn thành

### 1. MongoDB Atlas Setup
- Tạo Cluster: Cluster0
- Database: groupDB
- Collection: users
- Database User: NguyenXuanBach
- Cấu hình Network Access

### 2. Cấu trúc Backend
```
backend/
├── models/User.js              # Mongoose schema
├── controllers/userController.js   # CRUD operations
├── routes/user.js              # API routes
├── server.js                   # Server + MongoDB connection
├── .env                        # MongoDB URI
└── package.json                # Dependencies
```

### 3. User Model (Mongoose Schema)
- `name`: String, required, 2-50 ký tự
- `email`: String, required, unique, validation
- `timestamps`: createdAt, updatedAt

### 4. CRUD Operations
| Method | Endpoint | Chức năng |
|--------|----------|-----------|
| GET | `/api/users` | Lấy tất cả users |
| GET | `/api/users/:id` | Lấy user theo ID |
| POST | `/api/users` | Tạo user mới |
| PUT | `/api/users/:id` | Cập nhật user |
| DELETE | `/api/users/:id` | Xóa user |

### 5. Features
- ✅ Validation dữ liệu (name, email)
- ✅ Kiểm tra email trùng lặp
- ✅ Error handling chi tiết
- ✅ Response format chuẩn JSON
- ✅ CORS config
- ✅ Timestamps tự động

---

## 🚀 Hướng dẫn chạy

### 1. Cấu hình
Tạo file `backend/.env`:
```env
MONGODB_URI=mongodb+srv://NguyenXuanBach:<db_password>@cluster0.linphql.mongodb.net/groupDB?retryWrites=true&w=majority&appName=Cluster0
PORT=3000
```

### 2. Cài đặt
```bash
cd backend
npm install
```

### 3. Chạy server
```bash
npm run dev
```

Kết nối thành công khi thấy:
```
✅ Kết nối MongoDB Atlas thành công!
🚀 Server đang chạy trên cổng 3000
```

---

## 🧪 Testing

Xem chi tiết trong `TESTING_GUIDE.md`

### Quick Test với cURL:
```bash
# GET all users
curl http://localhost:3000/api/users

# POST create user
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com"}'
```

---

## 🔗 Git Workflow

```bash
# Tạo branch
git checkout -b database

# Commit
git add .
git commit -m "Tích hợp MongoDB Atlas với CRUD đầy đủ"

# Push
git push origin database
```

**Status**: ✅ Branch database đã push lên GitHub

---

## 📦 Dependencies

```json
{
  "express": "^4.21.2",
  "mongoose": "^8.9.3",
  "dotenv": "^16.4.7",
  "nodemon": "^3.1.9"
}
```

---

## 🎯 Checklist

- [x] Tạo MongoDB Atlas cluster
- [x] Cài đặt mongoose
- [x] Tạo User model
- [x] Implement CRUD đầy đủ
- [x] Cấu hình server.js
- [x] Validation & error handling
- [x] Push branch database
- [ ] Test API với Postman
- [ ] Chụp screenshots
- [ ] Tạo Pull Request

---

## 💡 Lưu ý

1. **Không commit `.env`** - Chứa thông tin nhạy cảm
2. **Thay `<db_password>`** trong .env
3. **Cấu hình Network Access** trong MongoDB Atlas
4. **Test API** trước khi merge

---

*Tài liệu của Sinh viên 3 - Database Developer*
