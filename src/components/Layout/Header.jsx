/**
 * Header Component
 */

import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const styles = {
  header: {
    height: '70px',
    backgroundColor: '#fff',
    borderBottom: '1px solid #e5e7eb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  pageTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#1a1a2e',
    margin: 0,
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: '16px',
    fontWeight: '600',
  },
  userDetails: {
    display: 'flex',
    flexDirection: 'column',
  },
  userName: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1a1a2e',
    margin: 0,
  },
  userRole: {
    fontSize: '12px',
    color: '#6b7280',
    margin: 0,
    textTransform: 'capitalize',
  },
  logoutBtn: {
    padding: '8px 16px',
    backgroundColor: '#fee2e2',
    color: '#dc2626',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
};

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: Call logout API before clearing local state
    // Currently just clears local state
    logout();
    navigate('/login');
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header style={styles.header}>
      <div style={styles.left}>
        <h2 style={styles.pageTitle}>Welcome back!</h2>
      </div>
      
      <div style={styles.right}>
        <div style={styles.userInfo}>
          <div style={styles.avatar}>
            {getInitials(user?.fullName)}
          </div>
          <div style={styles.userDetails}>
            <p style={styles.userName}>{user?.fullName || 'User'}</p>
            <p style={styles.userRole}>{user?.role || 'Guest'}</p>
          </div>
        </div>
        
        <button
          style={styles.logoutBtn}
          onClick={handleLogout}
          onMouseOver={(e) => e.target.style.backgroundColor = '#fecaca'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#fee2e2'}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
