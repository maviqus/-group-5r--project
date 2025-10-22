import React, { useState } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export default function AddUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [validationError, setValidationError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setValidationError(null);
    setSuccess(false);

    // Validation: Name không được để trống
    if (!name.trim()) {
      setValidationError('Name không được để trống');
      return;
    }

    // Validation: Email phải hợp lệ
    if (!/\S+@\S+\.\S+/.test(email)) {
      setValidationError('Email không hợp lệ');
      return;
    }

    setSaving(true);
    try {
      const newUser = { name: name.trim(), email: email.trim() };
      await axios.post(`${API}/users`, newUser);
      setName('');
      setEmail('');
      setSuccess(true);
      // Dispatch event để UserList tự động refresh
      window.dispatchEvent(new CustomEvent('user:added'));
      
      // Tự động ẩn thông báo success sau 3 giây
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      const status = err.response ? err.response.status : null;
      const data = err.response ? err.response.data : null;
      const message = status ? `Request failed with status code ${status}` : err.message || 'Error adding user';
      setError(message + (data ? ` — ${JSON.stringify(data)}` : ''));
      console.error('Add user error:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <input 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          style={{ padding: '8px', minWidth: '200px' }}
        />
        <input 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          style={{ padding: '8px', minWidth: '200px' }}
        />
        <button 
          type="submit" 
          disabled={saving}
          style={{ 
            padding: '8px 16px', 
            backgroundColor: saving ? '#ccc' : '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: saving ? 'not-allowed' : 'pointer'
          }}
        >
          {saving ? 'Saving...' : 'Add'}
        </button>
      </form>
      
      {validationError && (
        <p style={{ color: '#ff6b6b', marginTop: '8px', fontWeight: 'bold' }}>
          ⚠️ {validationError}
        </p>
      )}
      
      {error && (
        <p style={{ color: '#ff6b6b', marginTop: '8px' }}>
          ❌ {error}
        </p>
      )}
      
      {success && (
        <p style={{ color: '#51cf66', marginTop: '8px', fontWeight: 'bold' }}>
          ✅ User added successfully!
        </p>
      )}
    </div>
  );
}
