import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import Profile from './components/Profile';
import AdminUserList from './components/AdminUserList';

function Dashboard() {
    const token = localStorage.getItem('token');
    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>Dashboard - Đăng nhập thành công!</h1>
            <p>JWT Token của bạn:</p>
            <textarea
                value={token || 'Không có token'}
                readOnly
                style={{ width: '80%', height: '100px', padding: '10px', fontFamily: 'monospace' }}
            />
            <br />
            <Link to="/" style={{ textDecoration: 'none', color: '#007bff', marginTop: '20px', display: 'inline-block' }}>Quay lại Home</Link>
        </div>
    );
}

function RegisterSuccess() {
    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>Đăng ký thành công!</h1>
            <p>Tài khoản của bạn đã được tạo. Hãy đăng nhập để tiếp tục.</p>
            <Link to="/login" style={{ textDecoration: 'none', color: '#007bff', marginTop: '20px', display: 'inline-block' }}>Đăng nhập</Link>
        </div>
    );
}

function App() {
    return (
        <Router>
            <div className="App">
                <nav style={{ padding: '10px', backgroundColor: '#f0f0f0', marginBottom: '20px' }}>
                    <Link to="/" style={{ marginRight: '20px', textDecoration: 'none', color: '#007bff' }}>Home</Link>
                    <Link to="/register" style={{ marginRight: '20px', textDecoration: 'none', color: '#007bff' }}>Đăng ký</Link>
                    <Link to="/login" style={{ marginRight: '20px', textDecoration: 'none', color: '#007bff' }}>Đăng nhập</Link>
                    <Link to="/profile" style={{ marginRight: '20px', textDecoration: 'none', color: '#007bff' }}>Profile</Link>
                    <Link to="/admin" style={{ textDecoration: 'none', color: '#007bff' }}>Admin</Link>
                </nav>
                <Routes>
                    <Route path="/" element={
                        <div style={{ textAlign: 'center', padding: '50px' }}>
                            <h1>Welcome to Auth App</h1>
                            <p>Chọn Đăng ký hoặc Đăng nhập để bắt đầu.</p>
                        </div>
                    } />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register-success" element={<RegisterSuccess />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile" element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    } />
                    <Route path="/admin" element={
                        <AdminRoute>
                            <AdminUserList />
                        </AdminRoute>
                    } />
                </Routes>
            </div>
        </Router>
    );
}

export default App;