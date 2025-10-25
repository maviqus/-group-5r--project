import { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    avatar: ''
  });

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
          avatar: response.data.avatar || ''
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
                  {user.avatar ? (
                    <img
                      src={user.avatar}
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
                transition: 'background-color 0.3s'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
            >
              Chỉnh Sửa Thông Tin
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
                name="avatar"
                value={formData.avatar}
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