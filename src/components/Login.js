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
      const response = await axios.post('https://group-5r-project.onrender.com/api/auth/login', formData);
      setMessage('Đăng nhập thành công!');
      // Lưu token vào localStorage
      localStorage.setItem('token', response.data.token);
      // Chuyển hướng
      navigate('/dashboard'); // Hoặc trang khác
    } catch (error) {
      setMessage(error.response?.data?.message || 'Lỗi đăng nhập');
    }
  };

  return (
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