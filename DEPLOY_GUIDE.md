# 🚀 Hướng dẫn Deploy Backend lên Render.com

## 📋 Chuẩn bị

### Yêu cầu:
- ✅ Code đã push lên GitHub
- ✅ MongoDB Atlas đã setup
- ✅ Tài khoản GitHub

---

## 🌐 **PHƯƠNG ÁN 1: RENDER.COM** (Khuyên dùng)

### Bước 1: Tạo tài khoản Render
1. Truy cập: https://render.com/
2. Click **Get Started**
3. Sign up với GitHub account của bạn
4. Authorize Render truy cập GitHub

### Bước 2: Merge branch database vào main
```bash
# Chuyển về main
git checkout main

# Merge branch database
git merge database

# Push lên GitHub
git push origin main
```

### Bước 3: Tạo Web Service trên Render

1. **Dashboard Render** → Click **New +** → Chọn **Web Service**

2. **Connect Repository**:
   - Chọn repository: `maviqus/-group-5r--project`
   - Click **Connect**

3. **Configure Service**:
   ```
   Name: group-5r-backend
   Region: Singapore (gần Việt Nam nhất)
   Branch: main
   Root Directory: backend
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   Instance Type: Free
   ```

4. **Environment Variables**:
   Click **Advanced** → **Add Environment Variable**
   
   ```
   Key: MONGODB_URI
   Value: mongodb+srv://NguyenXuanBach:Pep3005%40@cluster0.linphql.mongodb.net/groupDB?retryWrites=true&w=majority&appName=Cluster0
   
   Key: NODE_ENV
   Value: production
   
   Key: PORT
   Value: 3000
   ```

5. **Deploy**:
   - Click **Create Web Service**
   - Đợi 3-5 phút để deploy
   - Render sẽ build và khởi động server

### Bước 4: Lấy URL công khai

Sau khi deploy thành công:
```
https://group-5r-backend.onrender.com
```

Test API:
```
GET https://group-5r-backend.onrender.com/
GET https://group-5r-backend.onrender.com/api/users
```

---

## 🌐 **PHƯƠNG ÁN 2: RAILWAY.APP**

### Bước 1: Tạo tài khoản Railway
1. Truy cập: https://railway.app/
2. Sign up với GitHub

### Bước 2: Deploy
1. **New Project** → **Deploy from GitHub repo**
2. Chọn repository: `-group-5r--project`
3. Chọn branch: `main`

### Bước 3: Cấu hình
1. Click vào service vừa tạo
2. **Settings** → **Root Directory**: `/backend`
3. **Variables** → Add:
   ```
   MONGODB_URI=mongodb+srv://NguyenXuanBach:Pep3005%40@cluster0.linphql.mongodb.net/groupDB
   NODE_ENV=production
   PORT=3000
   ```

4. **Deploy** → Railway tự động deploy

### Bước 4: Lấy domain
- **Settings** → **Generate Domain**
- Copy domain: `https://xxx.railway.app`

---

## 🌐 **PHƯƠNG ÁN 3: VERCEL** (Cho Serverless)

### Bước 1: Cài Vercel CLI
```bash
npm install -g vercel
```

### Bước 2: Deploy
```bash
cd /Users/macbookpro/th-pmmnm/B4
vercel
```

Follow prompts:
- Set up and deploy? **Y**
- Which scope? **Your account**
- Link to existing project? **N**
- Project name? **group-5r-backend**
- In which directory? **backend**

### Bước 3: Set environment variables
```bash
vercel env add MONGODB_URI
# Paste: mongodb+srv://NguyenXuanBach:Pep3005%40@cluster0.linphql.mongodb.net/groupDB

vercel env add NODE_ENV
# Enter: production
```

### Bước 4: Deploy production
```bash
vercel --prod
```

---

## ✅ **KHUYÊN DÙNG: RENDER.COM**

### Tại sao?
- ✅ **Miễn phí** vĩnh viễn (với giới hạn hợp lý)
- ✅ **Dễ dùng** nhất cho người mới
- ✅ **Tự động deploy** khi push code
- ✅ **Logs** rõ ràng
- ✅ **SSL** miễn phí (HTTPS)
- ✅ **MongoDB Atlas** hoạt động tốt

### Giới hạn Free tier:
- Tự động sleep sau 15 phút không dùng
- Khởi động lại khi có request (chậm 30s lần đầu)
- Đủ để demo và học tập

---

## 🧪 **TEST API SAU KHI DEPLOY**

### Postman Tests:

**Base URL** (thay bằng URL Render của bạn):
```
https://group-5r-backend.onrender.com/api
```

**Tests:**
```
GET https://group-5r-backend.onrender.com/api/users
POST https://group-5r-backend.onrender.com/api/users
PUT https://group-5r-backend.onrender.com/api/users/:id
DELETE https://group-5r-backend.onrender.com/api/users/:id
```

### cURL Test:
```bash
# Test server health
curl https://group-5r-backend.onrender.com/

# Test GET users
curl https://group-5r-backend.onrender.com/api/users

# Test POST create user
curl -X POST https://group-5r-backend.onrender.com/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com"}'
```

---

## 📝 **CHECKLIST DEPLOY**

### Trước khi deploy:
- [x] Code đã push lên GitHub
- [x] MongoDB Atlas connection string đã chuẩn bị
- [x] .env không commit (đã có trong .gitignore)
- [x] package.json có start script
- [ ] Merge branch database vào main

### Sau khi deploy:
- [ ] Test GET /api/users
- [ ] Test POST /api/users
- [ ] Test PUT /api/users/:id
- [ ] Test DELETE /api/users/:id
- [ ] Kiểm tra logs trên Render
- [ ] Cập nhật README.md với URL production

---

## 🔧 **TROUBLESHOOTING**

### Lỗi: Cannot find module
**Fix**: Đảm bảo Root Directory = `backend` trong Render settings

### Lỗi: MongoDB connection timeout
**Fix**: 
1. MongoDB Atlas → Network Access
2. Whitelist: `0.0.0.0/0` (cho phép tất cả IP)

### Lỗi: Port already in use
**Fix**: Render tự động assign PORT, không cần config

### Server sleep (Render Free):
**Normal behavior**: Free tier sleep sau 15 phút
**Fix**: Upgrade lên paid tier hoặc ping server định kỳ

---

## 💡 **TIPS**

### Auto-deploy từ GitHub:
- Mỗi lần push code lên main
- Render tự động detect và redeploy
- Check logs trong Dashboard

### Keep server awake (optional):
Dùng cron job ping server mỗi 10 phút:
```
https://cron-job.org/
```

### Share với nhóm:
```
API Base URL: https://group-5r-backend.onrender.com/api

Endpoints:
- GET    /users
- GET    /users/:id  
- POST   /users
- PUT    /users/:id
- DELETE /users/:id
```

---

## 🎯 **NEXT STEPS**

1. **Deploy backend lên Render** ✅
2. **Test API online với Postman**
3. **Deploy frontend React** (sau khi SV2 hoàn thành)
4. **Cập nhật frontend URL** từ localhost → Render URL
5. **Demo sản phẩm hoàn chỉnh**

---

**Bắt đầu với Render.com - Dễ nhất!** 🚀
