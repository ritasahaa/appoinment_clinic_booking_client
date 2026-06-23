/**
 * Sidebar Navigation Component
 */

import { NavLink, useLocation } from 'react-router-dom';

const styles = {
  sidebar: {
    width: '260px',
    height: '100vh',
    backgroundColor: '#1a1a2e',
    position: 'fixed',
    left: 0,
    top: 0,
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
  },
  logo: {
    padding: '24px 20px',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
  },
  logoText: {
    color: '#fff',
    fontSize: '18px',
    fontWeight: '700',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  logoIcon: {
    width: '36px',
    height: '36px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
  },
  nav: {
    flex: 1,
    padding: '20px 0',
    overflowY: 'auto',
  },
  navSection: {
    marginBottom: '24px',
  },
  sectionTitle: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: '11px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    padding: '0 20px',
    marginBottom: '8px',
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 20px',
    color: 'rgba(255,255,255,0.7)',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    borderLeft: '3px solid transparent',
  },
  navItemActive: {
    backgroundColor: 'rgba(102, 126, 234, 0.15)',
    color: '#667eea',
    borderLeftColor: '#667eea',
  },
  navIcon: {
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
  },
  footer: {
    padding: '20px',
    borderTop: '1px solid rgba(255,255,255,0.1)',
  },
  footerText: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: '12px',
    margin: 0,
    textAlign: 'center',
  },
};

const navItems = [
  {
    section: 'Main',
    items: [
      { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    ]
  },
  {
    section: 'Management',
    items: [
      { path: '/doctors', label: 'Doctors', icon: '👨‍⚕️' },
      { path: '/patients', label: 'Patients', icon: '👥' },
      { path: '/appointments', label: 'Appointments', icon: '📅' },
    ]
  },
];

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside style={styles.sidebar}>
      <div style={styles.logo}>
        <h1 style={styles.logoText}>
          <span style={styles.logoIcon}>🏥</span>
          Clinic Admin
        </h1>
      </div>

      <nav style={styles.nav}>
        {navItems.map((section, sectionIndex) => (
          <div key={sectionIndex} style={styles.navSection}>
            <div style={styles.sectionTitle}>{section.section}</div>
            {section.items.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                style={{
                  ...styles.navItem,
                  ...(isActive(item.path) ? styles.navItemActive : {}),
                }}
              >
                <span style={styles.navIcon}>{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      <div style={styles.footer}>
        <p style={styles.footerText}>
          Clinic Booking Admin v1.0
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
