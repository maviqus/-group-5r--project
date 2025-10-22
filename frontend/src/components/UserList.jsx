import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [validationError, setValidationError] = useState(null);
  const [updating, setUpdating] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${API}/users`);
      setUsers(res.data);
    } catch (err) {
      const status = err.response ? err.response.status : null;
      const data = err.response ? err.response.data : null;
      const message = status ? `Request failed with status code ${status}` : err.message || 'Error fetching users';
      setError(message + (data ? ` — ${JSON.stringify(data)}` : ''));
      console.error('Fetch users error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Xử lý sự kiện Xóa
  const handleDelete = async (id) => {
    // Confirmation dialog
    if (!window.confirm('Bạn có chắc chắn muốn xóa user này?')) {
      return;
    }

    try {
      await axios.delete(`${API}/users/${id}`);
      // Cập nhật state: lọc bỏ user đã xóa
      setUsers(users.filter(user => user.id !== id));
      console.log(`User ${id} deleted successfully`);
    } catch (err) {
      const message = err.response?.status 
        ? `Failed to delete: ${err.response.status}` 
        : err.message || 'Error deleting user';
      alert(`Xóa thất bại: ${message}`);
      console.error('Delete user error:', err);
    }
  };

  // Xử lý sự kiện Sửa - hiển thị form
  const handleEdit = (user) => {
    setEditingUser(user);
    setEditName(user.name);
    setEditEmail(user.email);
    setValidationError(null);
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setEditingUser(null);
    setEditName('');
    setEditEmail('');
    setValidationError(null);
  };

  // Submit edit - gửi PUT request
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    setValidationError(null);

    // Validation
    if (!editName.trim()) {
      setValidationError('Name không được để trống');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(editEmail)) {
      setValidationError('Email không hợp lệ');
      return;
    }

    setUpdating(true);
    try {
      const updatedUser = { 
        name: editName.trim(), 
        email: editEmail.trim() 
      };
      
      // Gửi PUT request để cập nhật
      const res = await axios.put(`${API}/users/${editingUser.id}`, updatedUser);
      
      // Cập nhật state: thay user cũ bằng user mới
      setUsers(users.map(u => u.id === editingUser.id ? res.data : u));
      
      // Reset form
      setEditingUser(null);
      setEditName('');
      setEditEmail('');
      console.log('User updated successfully');
    } catch (err) {
      const message = err.response?.status 
        ? `Failed to update: ${err.response.status}` 
        : err.message || 'Error updating user';
      setValidationError(`Cập nhật thất bại: ${message}`);
      console.error('Update user error:', err);
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    
    const onUserAdded = () => {
      console.log('User added event received, refreshing list...');
      fetchUsers();
    };
    
    window.addEventListener('user:added', onUserAdded);
    return () => window.removeEventListener('user:added', onUserAdded);
  }, []);

  return (
    <div>
      <h2>Users ({users.length})</h2>
      <button 
        onClick={fetchUsers} 
        disabled={loading}
        style={{
          padding: '8px 16px',
          backgroundColor: loading ? '#ccc' : '#2196F3',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer',
          marginBottom: '12px'
        }}
      >
        {loading ? 'Loading...' : 'Refresh'}
      </button>
      
      {loading && <p style={{ color: '#666' }}>⏳ Loading users...</p>}
      
      {error && (
        <div style={{ 
          padding: '12px', 
          backgroundColor: '#ffe0e0', 
          border: '1px solid #ffcccc',
          borderRadius: '4px',
          marginBottom: '12px'
        }}>
          <strong style={{ color: '#d32f2f' }}>Error:</strong>
          <p style={{ color: '#d32f2f', margin: '4px 0 0 0' }}>{error}</p>
        </div>
      )}

      {/* Edit Form Modal */}
      {editingUser && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '8px',
            minWidth: '400px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <h3>Sửa User</h3>
            <form onSubmit={handleUpdateUser}>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
                  Name:
                </label>
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  style={{ width: '100%', padding: '8px', fontSize: '14px' }}
                />
              </div>
              
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
                  Email:
                </label>
                <input
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  type="email"
                  style={{ width: '100%', padding: '8px', fontSize: '14px' }}
                />
              </div>

              {validationError && (
                <p style={{ color: '#ff6b6b', marginBottom: '12px', fontWeight: 'bold' }}>
                  ⚠️ {validationError}
                </p>
              )}

              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  disabled={updating}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#ccc',
                    color: '#333',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: updating ? 'not-allowed' : 'pointer'
                  }}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: updating ? '#ccc' : '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: updating ? 'not-allowed' : 'pointer'
                  }}
                >
                  {updating ? 'Đang cập nhật...' : 'Cập nhật'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {!loading && !error && (
        <div>
          {users && users.length > 0 ? (
            <table style={{ 
              width: '100%', 
              borderCollapse: 'collapse',
              marginTop: '8px'
            }}>
              <thead>
                <tr style={{ backgroundColor: '#f5f5f5' }}>
                  <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>ID</th>
                  <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Name</th>
                  <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Email</th>
                  <th style={{ padding: '10px', textAlign: 'center', borderBottom: '2px solid #ddd' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr 
                    key={user.id || user._id || index}
                    style={{ 
                      backgroundColor: index % 2 === 0 ? 'white' : '#fafafa',
                      borderBottom: '1px solid #eee'
                    }}
                  >
                    <td style={{ padding: '10px' }}>{user.id || user._id || '-'}</td>
                    <td style={{ padding: '10px' }}>{user.name || '-'}</td>
                    <td style={{ padding: '10px' }}>{user.email || '-'}</td>
                    <td style={{ padding: '10px', textAlign: 'center' }}>
                      <button 
                        onClick={() => handleEdit(user)}
                        style={{
                          padding: '6px 12px',
                          backgroundColor: '#2196F3',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          marginRight: '8px',
                          fontSize: '13px'
                        }}
                      >
                        ✏️ Sửa
                      </button>
                      <button 
                        onClick={() => handleDelete(user.id)}
                        style={{
                          padding: '6px 12px',
                          backgroundColor: '#f44336',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '13px'
                        }}
                      >
                        🗑️ Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ color: '#999', fontStyle: 'italic' }}>
              No users found. Add your first user above!
            </p>
          )}
        </div>
      )}
    </div>
  );
}
