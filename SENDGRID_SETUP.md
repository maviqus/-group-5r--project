# 📧 Setup SendGrid để gửi Email thật

## ✅ Tại sao dùng SendGrid?

- ✅ **Free tier**: 100 emails/day miễn phí
- ✅ **Render support**: Không bị block ports
- ✅ **Đáng tin cậy**: Deliverability cao
- ✅ **Dễ setup**: Chỉ cần API key

---

## 🚀 Các bước Setup:

### **Bước 1: Đăng ký SendGrid**

1. Truy cập: https://signup.sendgrid.com/
2. Nhập thông tin:
   - Email: `bachnguyn.work@gmail.com`
   - Password: Tạo password mạnh
   - Chọn plan: **Free** (100 emails/day)
3. Verify email
4. Hoàn thành questionnaire (chọn: Developer, Transactional emails)

---

### **Bước 2: Tạo API Key**

1. Login: https://app.sendgrid.com/
2. Vào: **Settings** → **API Keys**
3. Click: **Create API Key**
4. Nhập:
   - API Key Name: `Auth App Production`
   - API Key Permissions: **Full Access** (hoặc Mail Send)
5. Click: **Create & View**
6. **Copy API Key ngay** (chỉ hiện 1 lần!)
   ```
   SG.xxxxxxxxxxxxxxxxx.yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
   ```

---

### **Bước 3: Verify Sender Email**

⚠️ **Quan trọng**: SendGrid chỉ cho gửi từ email đã verify!

1. Vào: **Settings** → **Sender Authentication**
2. Chọn: **Verify a Single Sender**
3. Click: **Get Started**
4. Nhập thông tin:
   ```
   From Name: Auth App
   From Email Address: bachnguyn.work@gmail.com
   Reply To: bachnguyn.work@gmail.com
   Company Address: (điền địa chỉ tùy ý)
   City: Ha Noi
   Country: Vietnam
   ```
5. Click: **Create**
6. **Check email** `bachnguyn.work@gmail.com`
7. Click link verify trong email
8. Trạng thái chuyển thành: ✅ **Verified**

---

### **Bước 4: Add Environment Variable vào Render**

1. Vào: https://dashboard.render.com
2. Project: `group-5r-project`
3. Tab: **Environment**
4. Click: **+ Add Environment Variable**
5. Nhập:
   ```
   Key: SENDGRID_API_KEY
   Value: SG.xxxxxxxxxxxxxxxxx.yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
   ```
6. Click: **Save Changes**
7. Render sẽ tự động redeploy

---

### **Bước 5: Test Email**

Sau khi Render deploy xong:

```bash
# Test API
curl -X POST https://group-5r-project-9jdh.onrender.com/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email":"bachnguyn.work@gmail.com"}'

# Expected response:
{
  "message": "Email đặt lại mật khẩu đã được gửi"
}
```

**Check Gmail inbox**: Bạn sẽ nhận email thật với HTML đẹp!

---

## 🧪 Test Flow Hoàn chỉnh:

### **1. Test với Postman:**

```
POST https://group-5r-project-9jdh.onrender.com/api/auth/forgot-password

Headers:
Content-Type: application/json

Body:
{
  "email": "bachnguyn.work@gmail.com"
}

Expected: 200 OK
Response: {"message": "Email đặt lại mật khẩu đã được gửi"}
```

### **2. Check Gmail:**

- Mở inbox: bachnguyn.work@gmail.com
- Email từ: "Auth App"
- Subject: "🔐 Yêu cầu đặt lại mật khẩu - Auth App"
- Content: HTML đẹp với button và link

### **3. Click Reset Link:**

- Click button "Đặt lại mật khẩu" trong email
- Hoặc copy link vào browser
- Trang reset password mở ra

### **4. Reset Password:**

- Nhập password mới: `newpassword123`
- Confirm: `newpassword123`
- Submit → Success

### **5. Login:**

- Vào trang login
- Email: `bachnguyn.work@gmail.com`
- Password: `newpassword123`
- Login thành công → Profile page

---

## 📊 Check SendGrid Dashboard:

1. Vào: https://app.sendgrid.com/
2. **Activity** → **Email Activity**
3. Xem:
   - ✅ Emails sent: 1
   - ✅ Delivered: 1
   - Status: "Delivered"
   - Recipient: bachnguyn.work@gmail.com

---

## 🐛 Troubleshooting:

### ❌ **Lỗi: "Forbidden"**
```
Nguyên nhân: Sender email chưa verify
Giải pháp: Verify sender email trong SendGrid
```

### ❌ **Lỗi: "API Key không hợp lệ"**
```
Nguyên nhân: 
- API Key sai
- Chưa add vào Render Environment Variables

Giải pháp:
- Tạo API Key mới
- Copy chính xác vào Render
- Redeploy
```

### ❌ **Không nhận được email**
```
Kiểm tra:
1. Gmail Spam folder
2. SendGrid Activity log - email có sent không?
3. Sender email đã verify chưa?
4. Check SENDGRID_API_KEY trong Render
```

---

## 💰 SendGrid Free Tier Limits:

```
✅ 100 emails/day miễn phí
✅ Unlimited contacts
✅ Email validation
✅ Activity feed (7 days)
⚠️ SendGrid branding in emails
```

Đủ cho demo và testing! 🎉

---

## 📝 Environment Variables Checklist:

Render cần có đủ các biến sau:

```bash
✅ MONGO_URI=mongodb+srv://...
✅ JWT_SECRET=supersecret123
✅ PORT=4000
✅ CLOUDINARY_CLOUD_NAME=dgscsxppk
✅ CLOUDINARY_API_KEY=281862846361979
✅ CLOUDINARY_API_SECRET=JS02MgeSSAxiwppMUfkIeCTEQB0
✅ EMAIL_USER=bachnguyn.work@gmail.com
✅ EMAIL_PASSWORD=fjhi taqo tvdu rkjk
✅ FRONTEND_URL=https://group-5r-project-iota.vercel.app
🆕 SENDGRID_API_KEY=SG.xxxx (Thêm mới!)
```

---

## ✅ Sau khi setup xong:

1. ✅ SendGrid account created
2. ✅ API Key generated and saved
3. ✅ Sender email verified
4. ✅ SENDGRID_API_KEY added to Render
5. ✅ Backend deployed with SendGrid code
6. ✅ Test API → Email sent successfully
7. ✅ Check Gmail → Email received
8. ✅ Reset password flow works end-to-end

**🎉 Hoàn thành! Email thật hoạt động!**
