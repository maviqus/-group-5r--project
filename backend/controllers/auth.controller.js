const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');
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
        const token = generateToken(user._id, user.role);

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
        const token = generateToken(user._id, user.role);

        res.json({ message: 'Đăng nhập thành công', token });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

const logout = (req, res) => {
    res.status(200).json({ message: 'Đăng xuất thành công' });
};

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Không tìm thấy email này' });
        }

        // Tạo reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 phút
        await user.save();

        // Tạo reset URL (sử dụng HashRouter)
        const resetUrl = `${process.env.FRONTEND_URL}/#/reset-password/${resetToken}`;

        // Gửi email bằng SendGrid (works on Render)
        if (process.env.SENDGRID_API_KEY) {
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);

            const msg = {
                to: user.email,
                from: process.env.EMAIL_USER, // Must be verified sender in SendGrid
                subject: '🔐 Yêu cầu đặt lại mật khẩu - Auth App',
                html: `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <style>
                            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                            .button { display: inline-block; padding: 15px 30px; background: #667eea; color: white !important; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold; }
                            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
                            .warning { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="header">
                                <h1>🔐 Đặt lại mật khẩu</h1>
                            </div>
                            <div class="content">
                                <p>Xin chào <strong>${user.name}</strong>,</p>
                                <p>Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn.</p>
                                <p>Click vào nút bên dưới để đặt lại mật khẩu:</p>
                                <p style="text-align: center;">
                                    <a href="${resetUrl}" class="button">Đặt lại mật khẩu</a>
                                </p>
                                <p>Hoặc copy link sau vào trình duyệt:</p>
                                <p style="word-break: break-all; background: #fff; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
                                    <a href="${resetUrl}">${resetUrl}</a>
                                </p>
                                <div class="warning">
                                    <strong>⚠️ Lưu ý:</strong>
                                    <ul>
                                        <li>Link này chỉ có hiệu lực trong <strong>10 phút</strong></li>
                                        <li>Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này</li>
                                        <li>Không chia sẻ link này với bất kỳ ai</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="footer">
                                <p>Email này được gửi từ Auth App</p>
                                <p>Nếu bạn cần hỗ trợ, vui lòng liên hệ: ${process.env.EMAIL_USER}</p>
                            </div>
                        </div>
                    </body>
                    </html>
                `
            };

            await sgMail.send(msg);
            console.log('✅ Email sent successfully via SendGrid to:', user.email);

            return res.status(200).json({ message: 'Email đặt lại mật khẩu đã được gửi' });
        } else {
            // Fallback: Use nodemailer for local development
            console.log('⚠️ SENDGRID_API_KEY not found, using nodemailer...');

            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASSWORD
                },
                tls: {
                    rejectUnauthorized: false
                }
            });

            const mailOptions = {
                from: `"Auth App" <${process.env.EMAIL_USER}>`,
                to: user.email,
                subject: '🔐 Yêu cầu đặt lại mật khẩu - Auth App',
                html: `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <style>
                            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                            .button { display: inline-block; padding: 15px 30px; background: #667eea; color: white !important; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold; }
                            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
                            .warning { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="header">
                                <h1>🔐 Đặt lại mật khẩu</h1>
                            </div>
                            <div class="content">
                                <p>Xin chào <strong>${user.name}</strong>,</p>
                                <p>Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn.</p>
                                <p>Click vào nút bên dưới để đặt lại mật khẩu:</p>
                                <p style="text-align: center;">
                                    <a href="${resetUrl}" class="button">Đặt lại mật khẩu</a>
                                </p>
                                <p>Hoặc copy link sau vào trình duyệt:</p>
                                <p style="word-break: break-all; background: #fff; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
                                    <a href="${resetUrl}">${resetUrl}</a>
                                </p>
                                <div class="warning">
                                    <strong>⚠️ Lưu ý:</strong>
                                    <ul>
                                        <li>Link này chỉ có hiệu lực trong <strong>10 phút</strong></li>
                                        <li>Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này</li>
                                        <li>Không chia sẻ link này với bất kỳ ai</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="footer">
                                <p>Email này được gửi từ Auth App</p>
                                <p>Nếu bạn cần hỗ trợ, vui lòng liên hệ: ${process.env.EMAIL_USER}</p>
                            </div>
                        </div>
                    </body>
                    </html>
                `
            };

            await transporter.sendMail(mailOptions);
            console.log('✅ Email sent successfully via Gmail SMTP to:', user.email);

            return res.status(200).json({ message: 'Email đặt lại mật khẩu đã được gửi' });
        }
    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// @desc    Reset password
// @route   PUT /api/auth/reset-password/:token
// @access  Public
const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        // Hash token để so sánh
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
        }

        // Đặt lại password
        user.password = password;
        user.resetPasswordToken = null;
        user.resetPasswordExpire = null;
        await user.save();

        res.status(200).json({ message: 'Đặt lại mật khẩu thành công' });
    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

module.exports = { signup, login, logout, forgotPassword, resetPassword };