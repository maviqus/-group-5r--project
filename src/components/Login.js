import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // const response = await axios.post('https://group-5r-project.onrender.com/api/auth/login', formData);
            // Tạm thời bỏ API call để test UI
            setMessage('Đăng nhập thành công!');
            // Lưu token giả vào localStorage
            const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MzQ1Njc4OTBhYzEyMzQ1Njc4OTBhIiwiaWF0IjoxNzMxMjM0NTY3LCJleHAiOjE3MzEyNzA1Njd9.fake_signature_for_testing';
            localStorage.setItem('token', fakeToken);
            // Chuyển hướng
            navigate('/dashboard');
        } catch (error) {
            setMessage(error.response?.data?.message || 'Lỗi đăng nhập');
        }
    }; return (
        <div>
            <h2>Đăng nhập</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Đăng nhập</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;