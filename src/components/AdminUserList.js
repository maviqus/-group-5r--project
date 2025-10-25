import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminUserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Token:', token);
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        console.log('Fetching users from:', 'https://group-5r-project-9jdh.onrender.com/api/users');
        const { data } = await axios.get('https://group-5r-project-9jdh.onrender.com/api/users', config);
        console.log('Users data:', data);
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError(error.response?.data?.message || 'Bạn không có quyền');
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(`https://group-5r-project-9jdh.onrender.com/api/users/${id}`, config);
      setUsers(users.filter(user => user._id !== id));
    } catch (error) {
      setError('Không thể xóa user');
    }
  };

  if (error) {
    return <div className="container mx-auto p-4"><h2 className="text-2xl font-bold mb-4">Admin Panel</h2><p className="text-red-500">{error}</p></div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Panel - Quản lý User</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Tên</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Vai trò</th>
            <th className="py-2 px-4 border-b">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td className="py-2 px-4 border-b">{user._id}</td>
              <td className="py-2 px-4 border-b">{user.name}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">{user.role}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => deleteUser(user._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUserList;