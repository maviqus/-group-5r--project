# Hướng dẫn Test API và Chụp Screenshots để Nộp Bài

## 1️⃣ Test API bằng Postman

### Test DELETE Request

**Request Details:**
- Method: `DELETE`
- URL: `http://localhost:3000/users/1`
- Headers: (không cần)
- Body: (không cần)

**Steps:**
1. Mở Postman
2. Chọn method `DELETE`
3. Nhập URL: `http://localhost:3000/users/1` (thay `1` bằng ID user muốn xóa)
4. Click "Send"
5. **Expected Response:**
   - Status: `200 OK` hoặc `204 No Content`
   - Body: `{}` (json-server trả về object rỗng hoặc deleted object)

**Chụp screenshot:**
- ✅ URL bar hiển thị DELETE method và endpoint
- ✅ Response status 200 OK
- ✅ Response body (có thể rỗng)
- ✅ Response time

### Test PUT Request

**Request Details:**
- Method: `PUT`
- URL: `http://localhost:3000/users/2`
- Headers: `Content-Type: application/json`
- Body (raw JSON):
```json
{
  "name": "Updated Name",
  "email": "updated@example.com"
}
```

**Steps:**
1. Mở Postman
2. Chọn method `PUT`
3. Nhập URL: `http://localhost:3000/users/2` (thay `2` bằng ID user muốn sửa)
4. Vào tab "Headers", thêm:
   - Key: `Content-Type`
   - Value: `application/json`
5. Vào tab "Body", chọn "raw" và "JSON", nhập:
```json
{
  "name": "Nguyễn Văn A Updated",
  "email": "nguyenvana.updated@gmail.com"
}
```
6. Click "Send"
7. **Expected Response:**
   - Status: `200 OK`
   - Body: Updated user object với name và email mới

**Chụp screenshot:**
- ✅ URL bar hiển thị PUT method và endpoint
- ✅ Headers tab với Content-Type
- ✅ Body tab với JSON data
- ✅ Response status 200 OK
- ✅ Response body với data đã update

### Test GET (để verify)

**Request Details:**
- Method: `GET`
- URL: `http://localhost:3000/users`

**Steps:**
1. Sau khi DELETE/PUT, gửi GET request để xem danh sách users
2. Verify rằng user đã bị xóa hoặc đã được cập nhật

**Chụp screenshot:**
- ✅ Danh sách users sau khi DELETE/PUT

---

## 2️⃣ Chụp Screenshots Giao Diện React

### Màn hình chính với table Users

**URL:** http://localhost:3001

**Cần hiển thị:**
- ✅ Header "User Management System"
- ✅ Form "Add User" với inputs Name và Email
- ✅ Table "Users" với columns: ID, Name, Email, Actions
- ✅ Mỗi row có 2 buttons: "✏️ Sửa" (màu xanh) và "🗑️ Xóa" (màu đỏ)
- ✅ Ít nhất 2-3 users trong table

**Tips để chụp đẹp:**
- Zoom browser về 100%
- Thêm vài users trước khi chụp (để table có data)
- Chụp full width để thấy cả form và table

### Modal "Sửa User"

**Steps:**
1. Click nút "✏️ Sửa" trên một user bất kỳ
2. Modal xuất hiện với:
   - Title: "Sửa User"
   - Input Name (pre-filled với tên user)
   - Input Email (pre-filled với email user)
   - 2 buttons: "Hủy" và "Cập nhật"

**Chụp screenshot:**
- ✅ Modal centered trên màn hình
- ✅ Background overlay (tối 50%)
- ✅ Form fields với data đã filled
- ✅ Buttons "Hủy" và "Cập nhật"

### Validation Errors trong Modal Edit

**Steps:**
1. Click "✏️ Sửa" để mở modal
2. Xóa hết Name, click "Cập nhật"
3. Chụp màn hình hiện "⚠️ Name không được để trống"
4. Nhập name, nhập email invalid (vd: "test"), click "Cập nhật"
5. Chụp màn hình hiện "⚠️ Email không hợp lệ"

**Chụp screenshot:**
- ✅ Validation error cho Name trống
- ✅ Validation error cho Email invalid

### Confirmation Dialog khi Xóa

**Steps:**
1. Click nút "🗑️ Xóa" trên một user
2. Browser confirmation dialog xuất hiện: "Bạn có chắc chắn muốn xóa user này?"

**Chụp screenshot:**
- ✅ Confirmation dialog với message tiếng Việt
- ✅ Buttons OK và Cancel

### Success State (optional nhưng tốt)

**Steps:**
1. Thêm user mới → chụp success message "✅ User added successfully!"
2. Sửa user → table tự động cập nhật

---

## 3️⃣ Tạo Pull Request trên GitHub

### A. Kiểm tra Git Status

```powershell
cd "C:\hoạt động 4"
git status
```

**Expected output:**
```
On branch frontend
Changes not staged for commit:
  modified:   frontend/src/components/AddUser.jsx
  modified:   frontend/src/components/UserList.jsx
  modified:   frontend/src/App.js
```

### B. Add, Commit, Push

```powershell
# Add all changes
git add .

# Commit với message rõ ràng
git commit -m "Thêm chức năng Sửa/Xóa user trên React với validation"

# Push lên nhánh frontend
git push origin frontend
```

**Nếu push lần đầu:**
```powershell
git push -u origin frontend
```

### C. Tạo Pull Request trên GitHub

**Steps:**
1. Mở trình duyệt, vào repository: `https://github.com/maviqus/-group-5r--project`
2. GitHub sẽ hiển thị banner: "frontend had recent pushes"
3. Click nút "Compare & pull request" (màu xanh lá)
4. Điền thông tin PR:
   - **Title:** `[Frontend] Thêm chức năng Sửa/Xóa user với validation`
   - **Description:**
```markdown
## Mô tả

Thêm chức năng CRUD đầy đủ cho User Management:
- ✅ Chức năng Xóa user (DELETE API)
- ✅ Chức năng Sửa user (PUT API)
- ✅ Modal edit với validation
- ✅ Confirmation dialog khi xóa
- ✅ State management với useState/useEffect
- ✅ Event-driven updates

## Screenshots

(Paste screenshots từ Postman và React UI ở đây)

## Test

- [x] DELETE API test trên Postman
- [x] PUT API test trên Postman
- [x] UI hiển thị nút Sửa/Xóa
- [x] Modal edit hoạt động
- [x] Validation trong modal
- [x] Confirmation dialog
- [x] Table tự động update sau edit/delete

## Related Issues

Hoàn thành yêu cầu: Thêm chức năng Sửa/Xóa user trên React
```
5. Base branch: `main` (hoặc `master`)
6. Head branch: `frontend`
7. Click "Create pull request"

**Chụp screenshot PR:**
- ✅ PR title và description
- ✅ Files changed tab (hiển thị các file đã sửa)
- ✅ PR URL (copy để nộp)

---

## 4️⃣ Checklist Nộp Bài

### Ảnh Postman (2-3 ảnh)
- [ ] DELETE request với status 200/204
- [ ] PUT request với body JSON và response
- [ ] GET request verify sau DELETE/PUT

### Ảnh React UI (5-7 ảnh)
- [ ] Màn hình chính với table và nút Sửa/Xóa
- [ ] Modal "Sửa User" mở
- [ ] Validation error "Name không được để trống"
- [ ] Validation error "Email không hợp lệ"
- [ ] Confirmation dialog khi xóa
- [ ] (Optional) Success message
- [ ] (Optional) Table sau khi edit/delete

### Link GitHub
- [ ] Link PR: `https://github.com/maviqus/-group-5r--project/pull/XXX`
- [ ] PR có description đầy đủ
- [ ] PR có ít nhất 3 files changed

---

## 5️⃣ Quick Commands Reference

### Restart servers nếu cần

```powershell
# Terminal 1: Backend
cd "C:\hoạt động 4\frontend"
npx json-server --watch db.json --port 3000

# Terminal 2: Frontend
cd "C:\hoạt động 4\frontend"
$env:REACT_APP_API_URL = 'http://localhost:3000'
$env:PORT = '3001'
npm start
```

### Test API nhanh bằng PowerShell

```powershell
# GET all users
Invoke-RestMethod -Uri http://localhost:3000/users -Method GET | ConvertTo-Json

# DELETE user id=1
Invoke-RestMethod -Uri http://localhost:3000/users/1 -Method DELETE

# PUT update user id=2
$body = @{name='Updated Name'; email='updated@test.com'} | ConvertTo-Json
Invoke-RestMethod -Uri http://localhost:3000/users/2 -Method PUT -Body $body -ContentType 'application/json'
```

---

## 6️⃣ Troubleshooting

### Lỗi: "Cannot DELETE/PUT"
- Kiểm tra json-server đang chạy: `http://localhost:3000`
- Verify ID user tồn tại: GET `http://localhost:3000/users`

### Modal không hiển thị
- Check console trong DevTools (F12)
- Verify file UserList.jsx đã được copy đúng

### Git push bị reject
- Pull trước: `git pull origin frontend`
- Resolve conflicts nếu có
- Push lại: `git push origin frontend`

---

**Chúc bạn hoàn thành tốt! 🎉**
