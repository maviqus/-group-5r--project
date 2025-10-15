import React from 'react';
import UserList from './components/UserList';
import AddUser from './components/AddUser';

export default function App() {
  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1>User Management</h1>
      <AddUser />
      <hr />
      <UserList />
    </div>
  );
}
