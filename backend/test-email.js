// Test script để kiểm tra Gmail config
require('dotenv').config();
const nodemailer = require('nodemailer');

async function testEmail() {
    console.log('🧪 Testing Email Configuration...\n');

    console.log('Environment Variables:');
    console.log('EMAIL_USER:', process.env.EMAIL_USER);
    console.log('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? '***' + process.env.EMAIL_PASSWORD.slice(-4) : 'NOT SET');
    console.log('FRONTEND_URL:', process.env.FRONTEND_URL);
    console.log('');

    try {
        // Tạo transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        console.log('✅ Transporter created');

        // Verify connection
        console.log('🔍 Verifying connection...');
        await transporter.verify();
        console.log('✅ SMTP connection verified!\n');

        // Send test email
        console.log('📧 Sending test email...');
        const info = await transporter.sendMail({
            from: `"Auth App Test" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER, // Gửi cho chính mình
            subject: '🧪 Test Email - Auth App',
            html: `
                <h1>✅ Email Configuration Working!</h1>
                <p>Nếu bạn nhận được email này, Gmail config đã đúng.</p>
                <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
                <p><strong>From:</strong> ${process.env.EMAIL_USER}</p>
                <p><strong>Frontend URL:</strong> ${process.env.FRONTEND_URL}</p>
                <hr>
                <p><small>Test script: backend/test-email.js</small></p>
            `
        });

        console.log('✅ Email sent successfully!');
        console.log('Message ID:', info.messageId);
        console.log('');
        console.log('🎉 Email config is working correctly!');
        console.log('📬 Check your inbox:', process.env.EMAIL_USER);

    } catch (error) {
        console.error('❌ Email test failed!');
        console.error('Error:', error.message);
        console.error('');

        if (error.code === 'EAUTH') {
            console.log('💡 Suggestions:');
            console.log('1. Check EMAIL_USER is correct');
            console.log('2. Check EMAIL_PASSWORD (Gmail App Password)');
            console.log('3. Generate new App Password: https://myaccount.google.com/apppasswords');
        } else if (error.code === 'ECONNECTION') {
            console.log('💡 Suggestions:');
            console.log('1. Check internet connection');
            console.log('2. Check firewall settings');
        }
    }
}

// Run test
testEmail();
