/**
 * Dashboard Page Component
 * 
 * ⚠️ INTERVIEW/TRAINING PROJECT
 * API integration is intentionally incomplete.
 * Candidate must implement the dashboard stats fetching.
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HelpDrawer from '../components/HelpDrawer';
import { helpContent } from '../data/helpContent';

const styles = {
  container: {
    padding: '0',
  },
  header: {
    marginBottom: '24px',
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1a1a2e',
    margin: 0,
  },
  subtitle: {
    fontSize: '14px',
    color: '#6b7280',
    marginTop: '4px',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '20px',
    marginBottom: '32px',
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
    border: '1px solid #e5e7eb',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  statCardHover: {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
  },
  statIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    marginBottom: '16px',
  },
  statValue: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#1a1a2e',
    margin: 0,
  },
  statLabel: {
    fontSize: '14px',
    color: '#6b7280',
    marginTop: '4px',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
    border: '1px solid #e5e7eb',
    marginBottom: '24px',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1a1a2e',
    margin: 0,
  },
  viewAllLink: {
    color: '#667eea',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
  },
  quickActions: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
  },
  actionCard: {
    padding: '20px',
    borderRadius: '12px',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    transition: 'transform 0.2s ease',
  },
  actionIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
  },
  actionText: {
    flex: 1,
  },
  actionTitle: {
    fontSize: '14px',
    fontWeight: '600',
    margin: 0,
  },
  actionDesc: {
    fontSize: '12px',
    margin: '2px 0 0',
    opacity: 0.8,
  },
  loadingState: {
    textAlign: 'center',
    padding: '40px',
    color: '#6b7280',
  },
  errorState: {
    textAlign: 'center',
    padding: '40px',
    backgroundColor: '#fee2e2',
    borderRadius: '12px',
    color: '#dc2626',
  },
};

// Mock data - to be replaced with API data
const mockStats = {
  totalDoctors: 10,
  availableDoctors: 7,
  totalPatients: 22,
  activePatients: 18,
  totalAppointments: 28,
  todayAppointments: 8,
  scheduledAppointments: 12,
  completedAppointments: 10,
  cancelledAppointments: 4,
  noShowAppointments: 2,
};

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    setLoading(true);
    setError('');

    // TODO: Implement dashboard stats API call
    // 1. Import getStats function from dashboardService
    // 2. Call the API to fetch dashboard statistics
    // 3. On success, setStats with the response data
    // 4. On error, setError with the error message

    try {
      // TODO: Replace this mock implementation with actual API call
      // const response = await dashboardService.getStats();
      // setStats(response.data);

      // Temporary mock - Remove this after implementing API
      setTimeout(() => {
        setStats(mockStats);
        setLoading(false);
      }, 800);
    } catch (err) {
      setError('Failed to load dashboard statistics. Please try again.');
      setLoading(false);
    }
  };

  const statCards = [
    { icon: '👨‍⚕️', label: 'Total Doctors', value: stats?.totalDoctors, color: '#dbeafe', iconBg: '#3b82f6' },
    { icon: '✓', label: 'Available Doctors', value: stats?.availableDoctors, color: '#dcfce7', iconBg: '#22c55e' },
    { icon: '👥', label: 'Total Patients', value: stats?.totalPatients, color: '#fef3c7', iconBg: '#f59e0b' },
    { icon: '📅', label: 'Total Appointments', value: stats?.totalAppointments, color: '#e0e7ff', iconBg: '#6366f1' },
    { icon: '📆', label: 'Today\'s Appointments', value: stats?.todayAppointments, color: '#fce7f3', iconBg: '#ec4899' },
    { icon: '✅', label: 'Completed', value: stats?.completedAppointments, color: '#d1fae5', iconBg: '#10b981' },
    { icon: '🕐', label: 'Scheduled', value: stats?.scheduledAppointments, color: '#e0f2fe', iconBg: '#0ea5e9' },
    { icon: '❌', label: 'Cancelled', value: stats?.cancelledAppointments, color: '#fee2e2', iconBg: '#ef4444' },
  ];

  const quickActions = [
    { 
      to: '/appointments', 
      icon: '➕', 
      title: 'New Appointment', 
      desc: 'Schedule a new appointment',
      bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: '#fff'
    },
    { 
      to: '/doctors', 
      icon: '👨‍⚕️', 
      title: 'View Doctors', 
      desc: 'Manage doctor list',
      bg: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
      color: '#fff'
    },
    { 
      to: '/patients', 
      icon: '👥', 
      title: 'View Patients', 
      desc: 'Manage patient records',
      bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      color: '#fff'
    },
    { 
      to: '/appointments', 
      icon: '📋', 
      title: 'All Appointments', 
      desc: 'View all appointments',
      bg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      color: '#fff'
    },
  ];

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>Dashboard</h1>
          <p style={styles.subtitle}>Overview of your clinic</p>
        </div>
        <div style={styles.loadingState}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⏳</div>
          <p>Loading dashboard statistics...</p>
        </div>
        <HelpDrawer content={helpContent.dashboard} />
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>Dashboard</h1>
          <p style={styles.subtitle}>Overview of your clinic</p>
        </div>
        <div style={styles.errorState}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
          <p>{error}</p>
          <button
            onClick={fetchDashboardStats}
            style={{
              marginTop: '16px',
              padding: '10px 20px',
              backgroundColor: '#dc2626',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            Retry
          </button>
        </div>
        <HelpDrawer content={helpContent.dashboard} />
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Dashboard</h1>
        <p style={styles.subtitle}>Overview of your clinic's performance</p>
      </div>

      {/* Stats Grid */}
      <div style={styles.statsGrid}>
        {statCards.map((stat, index) => (
          <div
            key={index}
            style={{ ...styles.statCard, backgroundColor: stat.color }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
            }}
          >
            <div style={{ ...styles.statIcon, backgroundColor: stat.iconBg, color: '#fff' }}>
              {stat.icon}
            </div>
            <p style={styles.statValue}>{stat.value ?? '-'}</p>
            <p style={styles.statLabel}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Quick Actions</h2>
        </div>
        <div style={styles.quickActions}>
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.to}
              style={{ ...styles.actionCard, background: action.bg, color: action.color }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div style={{ ...styles.actionIcon, backgroundColor: 'rgba(255,255,255,0.2)' }}>
                {action.icon}
              </div>
              <div style={styles.actionText}>
                <p style={styles.actionTitle}>{action.title}</p>
                <p style={styles.actionDesc}>{action.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Summary Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Appointment Status</h2>
            <Link to="/appointments" style={styles.viewAllLink}>View All →</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', backgroundColor: '#f0fdf4', borderRadius: '8px' }}>
              <span style={{ color: '#166534' }}>✅ Completed</span>
              <strong style={{ color: '#166534' }}>{stats?.completedAppointments || 0}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', backgroundColor: '#eff6ff', borderRadius: '8px' }}>
              <span style={{ color: '#1e40af' }}>🕐 Scheduled</span>
              <strong style={{ color: '#1e40af' }}>{stats?.scheduledAppointments || 0}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', backgroundColor: '#fef2f2', borderRadius: '8px' }}>
              <span style={{ color: '#dc2626' }}>❌ Cancelled</span>
              <strong style={{ color: '#dc2626' }}>{stats?.cancelledAppointments || 0}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', backgroundColor: '#fefce8', borderRadius: '8px' }}>
              <span style={{ color: '#a16207' }}>⚠️ No-show</span>
              <strong style={{ color: '#a16207' }}>{stats?.noShowAppointments || 0}</strong>
            </div>
          </div>
        </div>

        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Quick Stats</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #3b82f6' }}>
              <span>Active Patients</span>
              <strong>{stats?.activePatients || 0}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #22c55e' }}>
              <span>Available Doctors</span>
              <strong>{stats?.availableDoctors || 0}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #f59e0b' }}>
              <span>Today's Appointments</span>
              <strong>{stats?.todayAppointments || 0}</strong>
            </div>
          </div>
        </div>
      </div>

      <HelpDrawer content={helpContent.dashboard} />
    </div>
  );
};

export default Dashboard;
