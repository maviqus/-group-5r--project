import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
  const res = await axios.get(`${API}/users`);
      setUsers(res.data);
    } catch (err) {
      // Show detailed axios error when available
      const status = err.response ? err.response.status : null;
      const data = err.response ? err.response.data : null;
      const message = status ? `Request failed with status code ${status}` : err.message || 'Error fetching users';
      setError(message + (data ? ` — ${JSON.stringify(data)}` : ''));
      console.error('Fetch users error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    const onUserAdded = () => fetchUsers();
    window.addEventListener('user:added', onUserAdded);
    return () => window.removeEventListener('user:added', onUserAdded);
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <button onClick={fetchUsers} disabled={loading}>
        Refresh
      </button>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && (
        <ul>
          {users && users.length ? (
            users.map((u) => (
              <li key={u.id || u._id}>
                <strong>{u.name || u.username || String(u.id || '')}</strong>
                {u.email ? ` — ${u.email}` : ''}
              </li>
            ))
          ) : (
            <li>No users found</li>
          )}
        </ul>
      )}
    </div>
  );
}
