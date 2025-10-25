# Ứng dụng Quản lý Người dùng MERN Stack (Buổi 5)

Mô tả ngắn:
Ứng dụng quản lý người dùng xây dựng bằng MERN stack, hỗ trợ đăng ký/đăng nhập, quản lý profile (CRUD), phân quyền admin, chức năng quên mật khẩu với email thực tế, và upload avatar lên Cloudinary. Dự án là bài thực hành Buổi 5.

Thành viên:
- Trưởng nhóm: [Tên của bạn]
- Lập trình Backend: [Tên của bạn]
- Lập trình Frontend: [Tên của bạn]

> Ghi chú: Thay thế `[Tên của bạn]` bằng tên thật trước khi nộp.

---

Công nghệ sử dụng:
- Frontend: React
- Backend: Node.js, Express
- Cơ sở dữ liệu: MongoDB (Mongoose)
- Bảo mật & xác thực: JWT, bcrypt
- Lưu trữ ảnh: Cloudinary (multer + multer-storage-cloudinary)
- Gửi email: SendGrid (khuyến nghị) / Nodemailer (dự phòng)
- Tiện ích khác: dotenv, axios, crypto, cors

Tính năng chính:
- Đăng ký (Sign Up) với kiểm tra trùng email
- Đăng nhập (Sign In) và trả JWT
- Xem và cập nhật profile (GET /api/profile, PUT /api/profile)
- Upload avatar (PUT /api/profile/avatar) lưu trên Cloudinary
- Quên mật khẩu: gửi email reset link (SendGrid) → reset mật khẩu bằng token
- Phân quyền Admin: xem danh sách user, xóa user
- Middleware bảo vệ route (auth, admin)
- Giao diện React cơ bản cho các chức năng trên

---

Hướng dẫn cài đặt (Local):

1. Clone repository:

```bash
git clone <URL_REPO>
```

2. Cài đặt backend:

```bash
cd backend
npm install
```

3. Cài đặt frontend:

```bash
cd ../src  # hoặc thư mục frontend nếu tách riêng
npm install
```

---

Biến môi trường (RẤT QUAN TRỌNG)

Tạo file `.env` trong thư mục `backend` với các biến sau (ví dụ tên biến có thể là MONGO_URI hoặc MONGODB_URI tùy codebase):

```
MONGODB_URI=<chuỗi kết nối MongoDB>
JWT_SECRET=<chuỗi bí mật JWT>
JWT_EXPIRES_IN=7d
CLOUDINARY_CLOUD_NAME=<Cloudinary cloud name>
CLOUDINARY_API_KEY=<Cloudinary API key>
CLOUDINARY_API_SECRET=<Cloudinary API secret>
EMAIL_HOST=<smtp host nếu dùng SMTP>
EMAIL_PORT=<smtp port>
EMAIL_USER=<email gửi đi>
EMAIL_PASS=<mật khẩu ứng dụng hoặc password>
SENDGRID_API_KEY=<nếu dùng SendGrid API>
FRONTEND_URL=http://localhost:3000
```

Ghi chú:
- Không commit `.env` lên GitHub.
- Trên hosting (Render/Heroku/Vercel) hãy lưu các biến môi trường trong phần Environment/Settings.
- Nếu deploy lên Render, khuyến nghị sử dụng SendGrid API (API key) thay vì SMTP vì Render chặn các cổng SMTP.

---

Chạy ứng dụng:

- Backend (dev):

```bash
cd backend
npm run dev
```

- Frontend:

```bash
cd frontend  # hoặc thư mục src chứa React
npm start
```

---

Kiểm thử nhanh (Postman):
- Đăng ký: POST /api/auth/signup
- Đăng nhập: POST /api/auth/login (lấy token)
- Xem profile: GET /api/profile (Authorization: Bearer <token>)
- Cập nhật profile: PUT /api/profile (Authorization: Bearer <token>)
- Upload avatar: PUT /api/profile/avatar (form-data key `avatar`, Authorization: Bearer <token>)
- Forgot password: POST /api/auth/forgot-password { "email": "you@example.com" }
- Reset password: PUT /api/auth/reset-password/:token { "password": "newpass" }

---

Lệnh Git (nếu bạn muốn cập nhật README trực tiếp trên `main`):

```bash
git checkout main
# Dán nội dung README.md vào file
git add README.md
git commit -m "Docs: Hoan thien file README.md"
git push origin main
```

---

Một số lưu ý vận hành & bảo mật:
- Không lưu API keys/public secrets trong code.
- Kiểm tra email landing (Spam) khi dùng SendGrid/ SMTP. Thiết lập DKIM/SPF để cải thiện tỉ lệ vào hộp thư chính.
- Đảm bảo giới hạn kích thước ảnh và loại file hợp lệ khi upload avatar.

---

Nếu bạn muốn, tôi có thể:
- Thay tên bạn vào phần "Thành viên" (gửi tên để tôi chèn).
- Tự tạo commit và push (tôi sẽ làm nếu bạn xác nhận).
- Tạo Postman collection để import nhanh (bạn chỉ cần dán token).

Cảm ơn và chúc bạn hoàn tất nộp bài suôn sẻ!
