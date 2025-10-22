const User = require('../models/User');

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
    const { id } = req.params;
    users = users.filter(u => u.id != id);
    res.json({ message: "User deleted" });
};
