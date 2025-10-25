import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [resetUrl, setResetUrl] = useState(''); // For demo mode

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');

        try {
            const response = await axios.post(
                'https://group-5r-project-9jdh.onrender.com/api/auth/forgot-password',
                { email },
                { timeout: 30000 } // 30 seconds timeout
            );
            setMessage(response.data.message);
            
            // Check if demo mode (response includes resetUrl)
            if (response.data.resetUrl) {
                setResetUrl(response.data.resetUrl);
            }
            
            setEmail('');
        } catch (err) {
            console.error('Forgot password error:', err);
            if (err.code === 'ECONNABORTED') {
                setError('Request timeout. Backend có thể đang khởi động, vui lòng thử lại sau 30 giây.');
            } else if (err.response?.status === 500) {
                setError('Lỗi server: ' + (err.response?.data?.error || 'Vui lòng kiểm tra Render logs'));
            } else {
                setError(err.response?.data?.message || 'Có lỗi xảy ra: ' + err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Quên Mật Khẩu</h2>

            <form onSubmit={handleSubmit} style={{
                backgroundColor: '#f8f9fa',
                padding: '30px',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                        Email:
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Nhập email của bạn"
                        style={{
                            width: '100%',
                            padding: '12px',
                            border: '1px solid #ced4da',
                            borderRadius: '4px',
                            fontSize: '16px',
                            boxSizing: 'border-box'
                        }}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        width: '100%',
                        backgroundColor: loading ? '#6c757d' : '#007bff',
                        color: 'white',
                        border: 'none',
                        padding: '12px',
                        borderRadius: '4px',
                        fontSize: '16px',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        marginBottom: '15px'
                    }}
                >
                    {loading ? 'Đang gửi...' : 'Gửi Email Đặt Lại Mật Khẩu'}
                </button>

                {message && (
                    <div style={{
                        padding: '12px',
                        backgroundColor: '#d4edda',
                        color: '#155724',
                        borderRadius: '4px',
                        marginBottom: '15px',
                        textAlign: 'center'
                    }}>
                        {message}
                    </div>
                )}

                {resetUrl && (
                    <div style={{
                        padding: '15px',
                        backgroundColor: '#fff3cd',
                        border: '1px solid #ffc107',
                        borderRadius: '4px',
                        marginBottom: '15px'
                    }}>
                        <p style={{ margin: '0 0 10px 0', fontWeight: 'bold', color: '#856404' }}>
                            🎯 Demo Mode: Click link bên dưới để reset password
                        </p>
                        <a 
                            href={resetUrl}
                            style={{
                                color: '#007bff',
                                wordBreak: 'break-all',
                                textDecoration: 'underline'
                            }}
                        >
                            {resetUrl}
                        </a>
                        <p style={{ margin: '10px 0 0 0', fontSize: '12px', color: '#856404' }}>
                            ⏰ Link có hiệu lực trong 10 phút
                        </p>
                    </div>
                )}

                {error && (
                    <div style={{
                        padding: '12px',
                        backgroundColor: '#f8d7da',
                        color: '#721c24',
                        borderRadius: '4px',
                        marginBottom: '15px',
                        textAlign: 'center'
                    }}>
                        {error}
                    </div>
                )}

                <div style={{ textAlign: 'center' }}>
                    <Link to="/login" style={{ color: '#007bff', textDecoration: 'none' }}>
                        Quay lại Đăng nhập
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default ForgotPassword;
