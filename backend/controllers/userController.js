const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Mảng tạm nếu chưa dùng MongoDB
let users = [];

// Seed: thêm vài users để test (mảng tạm)
exports.seedUsers = (req, res) => {
    users = [
        { id: 'u1', name: 'Nguyen Van A', email: 'a@example.com' },
        { id: 'u2', name: 'Tran Thi B', email: 'b@example.com' }
    ];
    res.json({ message: 'Seeded users', data: users });
};

// Debug: trả về mảng users in-memory (dùng để test)
exports.getInMemoryUsers = (req, res) => {
    res.json({ data: users });
};

// GET: Lấy tất cả users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi khi lấy danh sách người dùng',
            error: error.message
        });
    }
};

// GET: Lấy user theo ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy người dùng'
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi khi lấy thông tin người dùng',
            error: error.message
        });
    }
};

// POST: Tạo user mới
exports.createUser = async (req, res) => {
    try {
        const { name, email } = req.body;

        // Validation
        if (!name || !email) {
            return res.status(400).json({
                success: false,
                message: 'Vui lòng cung cấp đầy đủ thông tin (name, email)'
            });
        }

        // Kiểm tra email đã tồn tại chưa
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Email đã được sử dụng'
            });
        }

        // Tạo user mới
        const user = await User.create({ name, email });

        res.status(201).json({
            success: true,
            message: 'Tạo người dùng thành công',
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi khi tạo người dùng',
            error: error.message
        });
    }
};

// PUT: sửa user (sử dụng mảng tạm nếu chưa có MongoDB)
exports.updateUser = (req, res) => {
    // Debug log to see incoming params and body
    console.log('[debug] updateUser called  params: - userController.js:107', req.params, 'body:', req.body);
    const { id } = req.params;
    const index = users.findIndex(u => u.id == id);
    if (index !== -1) {
        users[index] = { ...users[index], ...req.body };
        res.json(users[index]);
    } else {
        res.status(404).json({ message: "User not found" });
    }
};

// DELETE: xóa user (sử dụng mảng tạm nếu chưa có MongoDB)
exports.deleteUser = (req, res) => {
    console.log('[debug] deleteUser called  params: - userController.js:120', req.params);
    const { id } = req.params;
    users = users.filter(u => u.id != id);
    res.json({ message: "User deleted" });
};

// Đăng ký (Sign Up)
exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'Thiếu thông tin đăng ký' });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email đã tồn tại' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });
        res.status(201).json({ success: true, message: 'Đăng ký thành công', data: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Lỗi đăng ký', error: error.message });
    }
};

// Đăng nhập (Login)
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Thiếu thông tin đăng nhập' });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Email không tồn tại' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Sai mật khẩu' });
        }
        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
        res.json({ success: true, message: 'Đăng nhập thành công', token });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Lỗi đăng nhập', error: error.message });
    }
};

// Đăng xuất (Logout) - phía client chỉ cần xóa token
exports.logout = (req, res) => {
    // Backend không lưu token, chỉ mô phỏng
    res.json({ success: true, message: 'Đăng xuất thành công. Hãy xóa token ở phía client.' });
};

// Middleware xác thực JWT
exports.authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ success: false, message: 'Thiếu token xác thực' });
    jwt.verify(token, process.env.JWT_SECRET || 'secret', (err, user) => {
        if (err) return res.status(403).json({ success: false, message: 'Token không hợp lệ' });
        req.user = user;
        next();
    });
};

// GET /profile: Xem thông tin cá nhân
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        if (!user) return res.status(404).json({ success: false, message: 'Không tìm thấy người dùng' });
        res.json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Lỗi lấy thông tin cá nhân', error: error.message });
    }
};

// PUT /profile: Cập nhật thông tin cá nhân
exports.updateProfile = async (req, res) => {
    try {
        const updates = req.body;
        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }
        const user = await User.findByIdAndUpdate(req.user.userId, updates, { new: true, runValidators: true }).select('-password');
        if (!user) return res.status(404).json({ success: false, message: 'Không tìm thấy người dùng' });
        res.json({ success: true, message: 'Cập nhật thành công', data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Lỗi cập nhật thông tin cá nhân', error: error.message });
    }
};
