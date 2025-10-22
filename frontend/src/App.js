import React from 'react';
import UserList from './components/UserList';
import AddUser from './components/AddUser';

export default function App() {
  return (
    <div style={{ 
      padding: 20, 
      fontFamily: 'Arial, sans-serif',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <h1 style={{ 
        color: '#333',
        borderBottom: '3px solid #4CAF50',
        paddingBottom: '10px',
        marginBottom: '24px'
      }}>
        User Management System
      </h1>
      
      <div style={{ 
        backgroundColor: '#f9f9f9',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '24px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <AddUser />
      </div>
      
      <hr style={{ border: 'none', borderTop: '1px solid #ddd', margin: '24px 0' }} />
      
      <div style={{
        backgroundColor: '#ffffff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <UserList />
      </div>
      
      <footer style={{ 
        marginTop: '32px',
        padding: '16px',
        textAlign: 'center',
        color: '#666',
        fontSize: '14px',
        borderTop: '1px solid #eee'
      }}>
        <p>Hoạt động 8: Quản lý state nâng cao & validation</p>
        <p style={{ fontSize: '12px', marginTop: '4px' }}>
          Frontend with React • State management with useState & useEffect
        </p>
      </footer>
    </div>
  );
}
