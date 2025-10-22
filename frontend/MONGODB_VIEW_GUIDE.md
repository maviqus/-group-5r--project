# 📊 Hướng dẫn xem dữ liệu trên MongoDB Atlas

## 🎯 Mục đích
Hướng dẫn chi tiết cách xem, quản lý và kiểm tra dữ liệu trong MongoDB Atlas sau khi tạo users qua API hoặc seed script.

---

## 🌐 **CÁCH 1: XEM TRÊN MONGODB ATLAS WEB** (Khuyên dùng)

### Bước 1: Đăng nhập MongoDB Atlas
1. Truy cập: **https://cloud.mongodb.com/**
2. Đăng nhập với tài khoản của bạn
   - Username: `NguyenXuanBach` (hoặc email đăng ký)
   - Password: Mật khẩu tài khoản Atlas của bạn

### Bước 2: Chọn Cluster
1. Sau khi đăng nhập, bạn sẽ thấy **Dashboard**
2. Tìm cluster: **Cluster0**
3. Click vào nút **"Browse Collections"** (hoặc "Collections")

### Bước 3: Chọn Database và Collection
1. **Sidebar bên trái**: Chọn Database **`groupDB`**
2. Trong groupDB, chọn Collection: **`users`**

### Bước 4: Xem dữ liệu
Bạn sẽ thấy danh sách các documents (users) với các thông tin:
- **_id**: ID tự động của MongoDB
- **name**: Tên người dùng
- **email**: Email người dùng
- **createdAt**: Thời gian tạo
- **updatedAt**: Thời gian cập nhật cuối

**Giao diện:**
```
┌─────────────────────────────────────────────────────────┐
│ groupDB > users                          [+ INSERT]      │
├─────────────────────────────────────────────────────────┤
│ _id: ObjectId("67545abc...")                            │
│ name: "Nguyễn Văn An"                                    │
│ email: "nguyenvanan@example.com"                         │
│ createdAt: 2025-10-15T15:30:00.000Z                     │
│ updatedAt: 2025-10-15T15:30:00.000Z                     │
│ __v: 0                                                   │
├─────────────────────────────────────────────────────────┤
│ _id: ObjectId("67545def...")                            │
│ name: "Trần Thị Bình"                                    │
│ ...                                                      │
└─────────────────────────────────────────────────────────┘
```

### Bước 5: Thao tác với dữ liệu

#### 🔍 **Tìm kiếm (Filter)**
Click vào ô **"Filter"** và nhập:
```json
{ "name": "Nguyễn Văn An" }
```
Hoặc tìm theo email:
```json
{ "email": "nguyenvanan@example.com" }
```

#### ✏️ **Chỉnh sửa document**
1. Click vào document muốn sửa
2. Click nút **"Edit"** (icon bút chì)
3. Chỉnh sửa trường cần thiết
4. Click **"Update"** để lưu

#### ➕ **Thêm document mới**
1. Click nút **"+ INSERT DOCUMENT"**
2. Nhập JSON:
```json
{
  "name": "Người dùng mới",
  "email": "nguoidungmoi@example.com"
}
```
3. Click **"Insert"**

#### 🗑️ **Xóa document**
1. Click vào document muốn xóa
2. Click nút **"Delete"** (icon thùng rác)
3. Confirm xóa

---

## 🖥️ **CÁCH 2: XEM BẰNG MONGODB COMPASS** (Desktop App)

### Bước 1: Cài đặt MongoDB Compass
1. Tải tại: **https://www.mongodb.com/try/download/compass**
2. Chọn phiên bản phù hợp với hệ điều hành
3. Cài đặt và mở ứng dụng

### Bước 2: Kết nối đến MongoDB Atlas
1. Mở MongoDB Compass
2. Trong ô **"New Connection"**, paste connection string:
```
mongodb+srv://NguyenXuanBach:Pep3005%40@cluster0.linphql.mongodb.net/groupDB?retryWrites=true&w=majority&appName=Cluster0
```
3. Click **"Connect"**

### Bước 3: Xem dữ liệu
1. Sidebar: Chọn **groupDB** → **users**
2. Tab **"Documents"**: Xem tất cả users
3. Tab **"Schema"**: Xem cấu trúc dữ liệu
4. Tab **"Indexes"**: Xem indexes (email unique)

**Ưu điểm Compass:**
- 🎨 Giao diện đẹp, trực quan
- 🔍 Query builder mạnh mẽ
- 📊 Visualize data tốt hơn
- ⚡ Tốc độ nhanh hơn web

---

## 💻 **CÁCH 3: XEM BẰNG CODE (Node.js)**

### Option 1: Xem tất cả users
```javascript
const User = require('./backend/models/User');

async function viewUsers() {
  const users = await User.find();
  console.log('DANH SÁCH USERS:');
  console.log(JSON.stringify(users, null, 2));
}

viewUsers();
```

### Option 2: Xem với filter
```javascript
// Tìm user theo email
const user = await User.findOne({ email: 'nguyenvanan@example.com' });
console.log(user);

// Tìm users có tên chứa "Nguyễn"
const users = await User.find({ name: /Nguyễn/i });
console.log(users);

// Đếm số users
const count = await User.countDocuments();
console.log(`Tổng số users: ${count}`);
```

---

## 🧪 **CÁCH 4: XEM QUA API (Postman/cURL)**

### Test với Postman
```
GET http://localhost:3000/api/users
```

**Response:**
```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "_id": "67545abc...",
      "name": "Nguyễn Văn An",
      "email": "nguyenvanan@example.com",
      "createdAt": "2025-10-15T...",
      "updatedAt": "2025-10-15T..."
    },
    ...
  ]
}
```

### Test với cURL
```bash
# Xem tất cả users
curl http://localhost:3000/api/users

# Xem user theo ID
curl http://localhost:3000/api/users/<user_id>

# Format đẹp với jq
curl http://localhost:3000/api/users | jq
```

---

## 📊 **THỐNG KÊ VÀ QUERY NÂNG CAO**

### Trên MongoDB Atlas - Aggregation
1. Vào **Collections** → **Aggregation**
2. Thêm stages:

**Đếm users theo domain email:**
```json
[
  {
    "$group": {
      "_id": { "$arrayElemAt": [{ "$split": ["$email", "@"] }, 1] },
      "count": { "$sum": 1 }
    }
  }
]
```

**Sắp xếp theo tên:**
```json
[
  { "$sort": { "name": 1 } }
]
```

**Lọc users tạo hôm nay:**
```json
[
  {
    "$match": {
      "createdAt": {
        "$gte": { "$date": "2025-10-15T00:00:00.000Z" }
      }
    }
  }
]
```

---

## 🔍 **QUERIES HỮU ÍCH**

### Trong MongoDB Atlas Filter:

**1. Tìm user có email cụ thể:**
```json
{ "email": "nguyenvanan@example.com" }
```

**2. Tìm users có tên bắt đầu bằng "Nguyễn":**
```json
{ "name": { "$regex": "^Nguyễn", "$options": "i" } }
```

**3. Tìm users được tạo sau ngày cụ thể:**
```json
{ "createdAt": { "$gt": { "$date": "2025-10-15T00:00:00.000Z" } } }
```

**4. Tìm users có email thuộc domain example.com:**
```json
{ "email": { "$regex": "@example.com$" } }
```

**5. Lấy 5 users mới nhất:**
- Filter: `{}`
- Sort: `{ "createdAt": -1 }`
- Limit: `5`

---

## 📸 **SCREENSHOTS CẦN CHỤP**

Để nộp bài, chụp các màn hình sau:

### 1. MongoDB Atlas - Collections View
- ✅ Hiển thị database **groupDB**
- ✅ Hiển thị collection **users**
- ✅ Danh sách users với dữ liệu đầy đủ
- ✅ Thấy rõ _id, name, email, timestamps

### 2. MongoDB Atlas - Document Detail
- ✅ Mở 1 document cụ thể
- ✅ Hiển thị tất cả fields
- ✅ Thấy rõ cấu trúc JSON

### 3. MongoDB Atlas - Cluster Overview
- ✅ Dashboard chính
- ✅ Cluster0 đang hoạt động
- ✅ Connection info

### 4. Postman - GET /api/users
- ✅ Request thành công (200 OK)
- ✅ Response có danh sách users
- ✅ Đếm số users đúng

---

## 💡 **TIPS**

### Tip 1: Export dữ liệu
Trong MongoDB Atlas:
1. Collections → **Export Data**
2. Chọn format: JSON hoặc CSV
3. Download về máy

### Tip 2: Import dữ liệu
1. Collections → **Import Data**
2. Chọn file JSON/CSV
3. Map fields
4. Import

### Tip 3: Backup
1. Clusters → **Backup**
2. Enable Cloud Backup (Free tier: limited)
3. Hoặc export manually

### Tip 4: Indexes
Kiểm tra indexes:
1. Collections → **Indexes**
2. Thấy index `email_1` (unique)
3. Giúp query nhanh hơn

### Tip 5: Performance Insights
1. Collections → **Performance Advisor**
2. Xem slow queries
3. Gợi ý tạo indexes mới

---

## 🚨 **TROUBLESHOOTING**

### Không thấy database groupDB?
**Fix**: 
- Database chỉ xuất hiện sau khi có ít nhất 1 document
- Chạy seed script hoặc tạo 1 user qua API

### Không thể kết nối Compass?
**Fix**:
1. Kiểm tra Network Access trong Atlas
2. Whitelist IP: `0.0.0.0/0`
3. Kiểm tra password trong connection string

### Documents không hiển thị?
**Fix**:
- Refresh page
- Kiểm tra filter có đang active không
- Clear filter: `{}`

### Lỗi "Unauthorized"?
**Fix**:
- Kiểm tra username/password
- Đảm bảo user có quyền đọc database

---

## 📋 **CHECKLIST**

### Đã làm:
- [ ] Đăng nhập MongoDB Atlas thành công
- [ ] Thấy Cluster0
- [ ] Vào Browse Collections
- [ ] Thấy database groupDB
- [ ] Thấy collection users
- [ ] Xem được danh sách documents
- [ ] Chụp screenshots
- [ ] Test query/filter
- [ ] Export dữ liệu (optional)

---

## 🎯 **KẾT QUẢ MONG ĐỢI**

Sau khi hoàn thành, bạn sẽ:
- ✅ Xem được tất cả users trong MongoDB Atlas
- ✅ Biết cách filter, search, edit documents
- ✅ Hiểu cấu trúc dữ liệu trong database
- ✅ Có screenshots để nộp bài
- ✅ Biết cách quản lý dữ liệu production

---

**Happy querying! 🚀**
