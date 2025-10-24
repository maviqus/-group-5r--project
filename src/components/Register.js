import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
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
            // const response = await axios.post('https://group-5r-project.onrender.com/api/auth/signup', formData);
            // Tạm thời bỏ API call để test UI
            setMessage('Đăng ký thành công!');
            // Chuyển hướng đến trang success
            navigate('/register-success');
        } catch (error) {
            setMessage(error.response?.data?.message || 'Lỗi đăng ký');
        }
    };

    return (
        <div>
            <h2>Đăng ký</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
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
                <button type="submit">Đăng ký</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Register;