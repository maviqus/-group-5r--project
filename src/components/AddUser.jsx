import React, { useState } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export default function AddUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const newUser = { name, email };
  await axios.post(`${API}/users`, newUser);
      setName('');
      setEmail('');
      window.dispatchEvent(new CustomEvent('user:added'));
      // show a short success message
      setSuccess(`Added user "${newUser.name}"`);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      const status = err.response ? err.response.status : null;
      const data = err.response ? err.response.data : null;
      const message = status ? `Request failed with status code ${status}` : err.message || 'Error adding user';
      setError(message + (data ? ` — ${JSON.stringify(data)}` : ''));
      console.error('Add user error:', err);
      setSuccess(null);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Add'}</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
}
