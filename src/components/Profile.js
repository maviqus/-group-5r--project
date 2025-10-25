import { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');

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
        setName(response.data.name);
      } catch (err) {
        setError('Không thể tải thông tin profile');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('https://group-5r-project-9jdh.onrender.com/api/profile',
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setUser(response.data);
      setIsEditing(false);
      alert('Cập nhật thành công!');
    } catch (err) {
      setError('Không thể cập nhật profile');
      console.error(err);
    }
  };

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="profile-container">
      <h2>Thông tin cá nhân</h2>
      <div className="profile-info">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Tên:</strong> {user.name}</p>
        {user.avatar && <img src={user.avatar} alt="Avatar" style={{width: '100px', height: '100px'}} />}
      </div>

      {!isEditing ? (
        <button onClick={() => setIsEditing(true)}>Chỉnh sửa tên</button>
      ) : (
        <form onSubmit={handleUpdateProfile}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nhập tên mới"
            required
          />
          <button type="submit">Lưu</button>
          <button type="button" onClick={() => setIsEditing(false)}>Hủy</button>
        </form>
      )}
    </div>
  );
};

export default Profile;