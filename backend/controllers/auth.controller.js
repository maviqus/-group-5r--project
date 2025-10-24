const User = require('../models/User');
const jwt = require('jsonwebtoken');
const generateToken = require('../utils/generateToken');

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Kiểm tra email trùng
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email đã tồn tại' });
    }

    // Tạo user mới
    const user = new User({ name, email, password });
    await user.save();

    // Tạo JWT
    const token = generateToken(user._id);

    res.status(201).json({ message: 'Đăng ký thành công', token });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Tìm user với password
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({ message: 'Thông tin đăng nhập không hợp lệ' });
    }

    // So sánh password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Thông tin đăng nhập không hợp lệ' });
    }

    // Tạo JWT
    const token = generateToken(user._id);

    res.json({ message: 'Đăng nhập thành công', token });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

const logout = (req, res) => {
  res.status(200).json({ message: 'Đăng xuất thành công' });
};

module.exports = { signup, login, logout };