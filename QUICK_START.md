# 🎯 HƯỚNG DẪN NHANH - TẠO VÀ XEM DỮ LIỆU MẪU

## ✅ ĐÃ HOÀN THÀNH

Đã tạo thành công **10 users mẫu** vào MongoDB Atlas!

### 📊 Thống kê:
- ✅ Database: **groupDB**
- ✅ Collection: **users**  
- ✅ Số lượng: **10 users**
- ✅ Cluster: **Cluster0**

---

## 👥 DANH SÁCH 10 USERS ĐÃ TẠO

| STT | Tên | Email | ID |
|-----|-----|-------|-----|
| 01 | Nguyễn Văn An | nguyenvanan@example.com | 68ef57055892260b231ffa01 |
| 02 | Trần Thị Bình | tranthib@example.com | 68ef57055892260b231ffa02 |
| 03 | Lê Văn Cường | levancuong@example.com | 68ef57055892260b231ffa03 |
| 04 | Phạm Thị Dung | phamthidung@example.com | 68ef57055892260b231ffa04 |
| 05 | Hoàng Văn Em | hoangvanem@example.com | 68ef57055892260b231ffa05 |
| 06 | Nguyễn Thị Phương | nguyenthiphuong@example.com | 68ef57055892260b231ffa06 |
| 07 | Đỗ Văn Giang | dovangiang@example.com | 68ef57055892260b231ffa07 |
| 08 | Vũ Thị Hoa | vuthihoa@example.com | 68ef57055892260b231ffa08 |
| 09 | Bùi Văn Ích | buivanich@example.com | 68ef57055892260b231ffa09 |
| 10 | Đinh Thị Kim | dinhthikim@example.com | 68ef57055892260b231ffa0a |

---

## 🌐 CÁCH XEM DỮ LIỆU - 3 PHƯƠNG PHÁP

### **PHƯƠNG PHÁP 1: XEM TRÊN MONGODB ATLAS** ⭐ (Dễ nhất)

#### Các bước:
1. **Truy cập**: https://cloud.mongodb.com/
2. **Đăng nhập** với tài khoản MongoDB Atlas của bạn
3. Click vào **Cluster0**
4. Click nút **"Browse Collections"** (hoặc "Collections")
5. Chọn Database: **groupDB** (bên trái)
6. Chọn Collection: **users**
7. ✅ Bạn sẽ thấy 10 users vừa tạo!

#### Screenshot cần chụp:
```
📸 Cần chụp màn hình này để nộp bài!

Nội dung màn hình phải bao gồm:
- Database name: groupDB
- Collection name: users  
- Danh sách 10 documents (users)
- Các fields: _id, name, email, createdAt, updatedAt
```

---

### **PHƯƠNG PHÁP 2: XEM QUA API VỚI POSTMAN** ⭐

#### Bước 1: Chạy server
```bash
cd backend
npm run dev
```

Đợi thấy message:
```
✅ Kết nối MongoDB Atlas thành công!
🚀 Server đang chạy trên cổng 3000
```

#### Bước 2: Test với Postman
```
Method: GET
URL: http://localhost:3000/api/users
```

#### Response mong đợi:
```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "_id": "68ef57055892260b231ffa01",
      "name": "Nguyễn Văn An",
      "email": "nguyenvanan@example.com",
      "createdAt": "2025-10-15T...",
      "updatedAt": "2025-10-15T...",
      "__v": 0
    },
    ... 9 users khác
  ]
}
```

#### Screenshot cần chụp:
```
📸 Postman với response hiển thị 10 users
```

---

### **PHƯƠNG PHÁP 3: XEM BẰNG cURL** (Terminal)

```bash
# Đảm bảo server đang chạy
cd backend
npm run dev

# Mở terminal mới, chạy:
curl http://localhost:3000/api/users

# Hoặc format đẹp hơn (nếu có jq):
curl http://localhost:3000/api/users | jq

# Hoặc với python:
curl -s http://localhost:3000/api/users | python3 -m json.tool
```

---

## 🧪 CÁC TEST BỔ SUNG

### Test 1: Lấy 1 user cụ thể
```bash
# GET user theo ID (thay <id> bằng ID thực tế)
curl http://localhost:3000/api/users/68ef57055892260b231ffa01
```

### Test 2: Tạo thêm user mới
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"User mới","email":"usermoi@example.com"}'
```

### Test 3: Cập nhật user
```bash
curl -X PUT http://localhost:3000/api/users/68ef57055892260b231ffa01 \
  -H "Content-Type: application/json" \
  -d '{"name":"Nguyễn Văn An - Updated","email":"nguyenvanan.updated@example.com"}'
```

### Test 4: Xóa user
```bash
curl -X DELETE http://localhost:3000/api/users/68ef57055892260b231ffa01
```

---

## 🔄 TẠO LẠI DỮ LIỆU MẪU

Nếu muốn tạo lại từ đầu:

```bash
cd backend
node seed.js
```

Script sẽ:
1. Xóa tất cả users hiện tại
2. Tạo lại 10 users mẫu  
3. Hiển thị danh sách mới

---

## 📸 CHECKLIST SCREENSHOTS CẦN CHỤP

### Để nộp bài, cần chụp:

- [x] **MongoDB Atlas - Collections View**
  - Hiển thị database groupDB
  - Collection users với 10 documents
  - Thấy rõ fields: _id, name, email, timestamps

- [x] **MongoDB Atlas - Document Detail**
  - Click vào 1 document
  - Hiển thị đầy đủ các fields
  - Thấy rõ cấu trúc JSON

- [x] **Postman - GET /api/users**
  - Request thành công (200 OK)
  - Response có 10 users
  - count = 10

- [x] **Terminal - Seed Script Output**
  - Chụp output khi chạy `node seed.js`
  - Thấy "✅ Đã thêm 10 users..."

---

## 💡 TIPS

### Tip 1: Nếu không thấy data trong Atlas
- Refresh page (F5)
- Clear filter (đảm bảo filter box trống: `{}`)
- Chọn đúng database và collection

### Tip 2: Nếu API không trả về data
- Kiểm tra server đang chạy (`npm run dev`)
- Kiểm tra MongoDB connection trong terminal
- Thử chạy seed script lại

### Tip 3: Export data
Trong MongoDB Atlas:
1. Collections → ... (3 dots) → Export Collection
2. Chọn JSON format
3. Download về máy

### Tip 4: Xem trong MongoDB Compass (Optional)
1. Tải: https://www.mongodb.com/try/download/compass
2. Connect với connection string
3. Browse database groupDB → users

---

## 🚨 TROUBLESHOOTING

### Không thấy database groupDB?
**Fix**: Database chỉ hiện sau khi có data. Chạy `node seed.js`

### Lỗi "Cannot find module"?
**Fix**: Đảm bảo chạy từ thư mục `backend`:
```bash
cd backend
node seed.js
```

### Lỗi kết nối MongoDB?
**Fix**: 
1. Kiểm tra `.env` có đúng MONGODB_URI không
2. MongoDB Atlas → Network Access → Whitelist `0.0.0.0/0`
3. Kiểm tra password: `Pep3005@` → encode thành `Pep3005%40`

### API không hoạt động?
**Fix**:
1. Đảm bảo server đang chạy: `npm run dev`
2. Kiểm tra port 3000 không bị chiếm
3. Test với: `curl http://localhost:3000/`

---

## 🎯 KẾT QUẢ

### Đã có:
✅ 10 users mẫu trong MongoDB Atlas  
✅ Backend API hoạt động  
✅ Có thể CRUD users qua API  
✅ Hướng dẫn đầy đủ để xem data  

### Có thể làm tiếp:
- [ ] Deploy backend lên Render.com (xem file `DEPLOY_GUIDE.md`)
- [ ] Test API trên Postman
- [ ] Chụp screenshots
- [ ] Tạo Pull Request
- [ ] Merge vào branch main

---

## 📚 TÀI LIỆU LIÊN QUAN

- `MONGODB_VIEW_GUIDE.md` - Hướng dẫn chi tiết xem data
- `DEPLOY_GUIDE.md` - Hướng dẫn deploy lên cloud
- `README_SinhVien3.md` - Tổng hợp công việc SV3
- `backend/seed.js` - Script tạo data mẫu

---

**🎉 Chúc mừng! Bạn đã có 10 users mẫu trong MongoDB Atlas!**

**Bây giờ:**
1. ✅ Vào MongoDB Atlas xem data
2. ✅ Chụp screenshots
3. ✅ Test API với Postman
4. ✅ Nộp bài!

---

*Tài liệu tạo ngày: 15/10/2025*  
*Sinh viên 3 - Database Developer*
