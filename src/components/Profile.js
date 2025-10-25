import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        avatarUrl: ''
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadLoading, setUploadLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('https://group-5r-project-9jdh.onrender.com/api/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser(response.data);
                setFormData({
                    name: response.data.name || '',
                    avatarUrl: response.data.avatarUrl || ''
                });
            } catch (err) {
                setError('Không thể tải thông tin profile');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put('https://group-5r-project-9jdh.onrender.com/api/profile',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setUser(response.data);
            setIsEditing(false);
            alert('Cập nhật thông tin thành công!');
        } catch (err) {
            setError('Không thể cập nhật profile');
            console.error(err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUploadAvatar = async () => {
        if (!selectedFile) {
            alert('Vui lòng chọn file ảnh!');
            return;
        }

        const formData = new FormData();
        formData.append('avatar', selectedFile);

        setUploadLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(
                'https://group-5r-project-9jdh.onrender.com/api/profile/avatar',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            setUser(response.data);
            setSelectedFile(null);
            alert('Upload avatar thành công!');
        } catch (err) {
            setError('Không thể upload avatar');
            console.error(err);
            alert('Lỗi upload avatar: ' + (err.response?.data?.message || err.message));
        } finally {
            setUploadLoading(false);
        }
    };

    if (loading) return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <div>Đang tải thông tin...</div>
        </div>
    );

    if (error) return (
        <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>
            <div>{error}</div>
        </div>
    );

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}>
                Thông Tin Cá Nhân
            </h1>

            {!isEditing ? (
                <div>
                    <table style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                        marginBottom: '30px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        borderRadius: '8px',
                        overflow: 'hidden'
                    }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f8f9fa' }}>
                                <th style={{
                                    padding: '15px',
                                    textAlign: 'left',
                                    borderBottom: '2px solid #dee2e6',
                                    fontWeight: 'bold',
                                    color: '#495057'
                                }}>Thông Tin</th>
                                <th style={{
                                    padding: '15px',
                                    textAlign: 'left',
                                    borderBottom: '2px solid #dee2e6',
                                    fontWeight: 'bold',
                                    color: '#495057'
                                }}>Giá Trị</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{
                                    padding: '15px',
                                    borderBottom: '1px solid #dee2e6',
                                    fontWeight: 'bold',
                                    backgroundColor: '#f8f9fa'
                                }}>Email</td>
                                <td style={{
                                    padding: '15px',
                                    borderBottom: '1px solid #dee2e6'
                                }}>{user.email}</td>
                            </tr>
                            <tr>
                                <td style={{
                                    padding: '15px',
                                    borderBottom: '1px solid #dee2e6',
                                    fontWeight: 'bold',
                                    backgroundColor: '#f8f9fa'
                                }}>Tên</td>
                                <td style={{
                                    padding: '15px',
                                    borderBottom: '1px solid #dee2e6'
                                }}>{user.name}</td>
                            </tr>
                            <tr>
                                <td style={{
                                    padding: '15px',
                                    borderBottom: '1px solid #dee2e6',
                                    fontWeight: 'bold',
                                    backgroundColor: '#f8f9fa'
                                }}>Avatar</td>
                                <td style={{
                                    padding: '15px',
                                    borderBottom: '1px solid #dee2e6'
                                }}>
                                    {user.avatarUrl ? (
                                        <img
                                            src={user.avatarUrl}
                                            alt="Avatar"
                                            style={{
                                                width: '80px',
                                                height: '80px',
                                                borderRadius: '50%',
                                                objectFit: 'cover'
                                            }}
                                        />
                                    ) : (
                                        <span style={{ color: '#6c757d' }}>Chưa có avatar</span>
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div style={{
                        backgroundColor: '#f8f9fa',
                        padding: '20px',
                        borderRadius: '8px',
                        marginBottom: '30px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}>
                        <h3 style={{ marginTop: 0, marginBottom: '15px', color: '#333' }}>Upload Avatar</h3>
                        <div style={{ marginBottom: '15px' }}>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                style={{
                                    padding: '8px',
                                    border: '1px solid #ced4da',
                                    borderRadius: '4px',
                                    backgroundColor: 'white'
                                }}
                            />
                        </div>
                        <button
                            onClick={handleUploadAvatar}
                            disabled={!selectedFile || uploadLoading}
                            style={{
                                backgroundColor: !selectedFile || uploadLoading ? '#6c757d' : '#17a2b8',
                                color: 'white',
                                border: 'none',
                                padding: '10px 20px',
                                borderRadius: '6px',
                                fontSize: '14px',
                                cursor: !selectedFile || uploadLoading ? 'not-allowed' : 'pointer',
                                transition: 'background-color 0.3s'
                            }}
                            onMouseOver={(e) => {
                                if (!(!selectedFile || uploadLoading)) {
                                    e.target.style.backgroundColor = '#138496';
                                }
                            }}
                            onMouseOut={(e) => {
                                if (!(!selectedFile || uploadLoading)) {
                                    e.target.style.backgroundColor = '#17a2b8';
                                }
                            }}
                        >
                            {uploadLoading ? 'Đang upload...' : 'Upload Avatar'}
                        </button>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <button
                            onClick={() => setIsEditing(true)}
                            style={{
                                backgroundColor: '#007bff',
                                color: 'white',
                                border: 'none',
                                padding: '12px 24px',
                                borderRadius: '6px',
                                fontSize: '16px',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s',
                                marginRight: '10px'
                            }}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                            onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
                        >
                            Chỉnh Sửa Thông Tin
                        </button>
                        <button
                            onClick={handleLogout}
                            style={{
                                backgroundColor: '#dc3545',
                                color: 'white',
                                border: 'none',
                                padding: '12px 24px',
                                borderRadius: '6px',
                                fontSize: '16px',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s'
                            }}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#c82333'}
                            onMouseOut={(e) => e.target.style.backgroundColor = '#dc3545'}
                        >
                            Đăng Xuất
                        </button>
                    </div>
                </div>
            ) : (
                <div>
                    <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>
                        Cập Nhật Thông Tin
                    </h2>
                    <form onSubmit={handleUpdateProfile} style={{
                        backgroundColor: '#f8f9fa',
                        padding: '30px',
                        borderRadius: '8px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '8px',
                                fontWeight: 'bold',
                                color: '#495057'
                            }}>
                                Tên:
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    border: '1px solid #ced4da',
                                    borderRadius: '4px',
                                    fontSize: '16px',
                                    boxSizing: 'border-box'
                                }}
                                placeholder="Nhập tên của bạn"
                            />
                        </div>

                        <div style={{ marginBottom: '30px' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '8px',
                                fontWeight: 'bold',
                                color: '#495057'
                            }}>
                                Avatar URL:
                            </label>
                            <input
                                type="url"
                                name="avatarUrl"
                                value={formData.avatarUrl}
                                onChange={handleInputChange}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    border: '1px solid #ced4da',
                                    borderRadius: '4px',
                                    fontSize: '16px',
                                    boxSizing: 'border-box'
                                }}
                                placeholder="https://example.com/avatar.jpg"
                            />
                        </div>

                        <div style={{ textAlign: 'center' }}>
                            <button
                                type="submit"
                                style={{
                                    backgroundColor: '#28a745',
                                    color: 'white',
                                    border: 'none',
                                    padding: '12px 24px',
                                    borderRadius: '6px',
                                    fontSize: '16px',
                                    cursor: 'pointer',
                                    marginRight: '10px',
                                    transition: 'background-color 0.3s'
                                }}
                                onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
                                onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
                            >
                                Lưu Thay Đổi
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsEditing(false)}
                                style={{
                                    backgroundColor: '#6c757d',
                                    color: 'white',
                                    border: 'none',
                                    padding: '12px 24px',
                                    borderRadius: '6px',
                                    fontSize: '16px',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.3s'
                                }}
                                onMouseOver={(e) => e.target.style.backgroundColor = '#545b62'}
                                onMouseOut={(e) => e.target.style.backgroundColor = '#6c757d'}
                            >
                                Hủy
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Profile;