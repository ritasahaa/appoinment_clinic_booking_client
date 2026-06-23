/**
 * Patient Details Page Component
 * 
 * ⚠️ INTERVIEW/TRAINING PROJECT
 * API integration is intentionally incomplete.
 * Candidate must implement the patient details fetching.
 */

import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import HelpDrawer from '../components/HelpDrawer';
import { helpContent } from '../data/helpContent';

const styles = {
  container: {
    padding: '0',
  },
  backBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    backgroundColor: '#f1f5f9',
    color: '#475569',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    marginBottom: '24px',
    textDecoration: 'none',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
    border: '1px solid #e5e7eb',
    overflow: 'hidden',
  },
  header: {
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    padding: '32px',
    color: '#fff',
  },
  headerMale: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  headerContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
  },
  avatar: {
    width: '100px',
    height: '100px',
    borderRadius: '20px',
    backgroundColor: 'rgba(255,255,255,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '36px',
    fontWeight: '700',
  },
  headerInfo: {
    flex: 1,
  },
  name: {
    fontSize: '28px',
    fontWeight: '700',
    margin: 0,
  },
  email: {
    fontSize: '16px',
    opacity: 0.9,
    marginTop: '4px',
  },
  phone: {
    fontSize: '14px',
    opacity: 0.8,
    marginTop: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  badge: {
    display: 'inline-block',
    padding: '6px 14px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: '600',
  },
  badgeActive: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: '#fff',
  },
  content: {
    padding: '32px',
  },
  section: {
    marginBottom: '32px',
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: '16px',
    paddingBottom: '8px',
    borderBottom: '2px solid #e5e7eb',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
  },
  infoItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  label: {
    fontSize: '12px',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  value: {
    fontSize: '16px',
    color: '#1a1a2e',
    fontWeight: '500',
  },
  loadingState: {
    textAlign: 'center',
    padding: '80px',
    color: '#6b7280',
  },
  errorState: {
    textAlign: 'center',
    padding: '60px',
    backgroundColor: '#fee2e2',
    borderRadius: '16px',
    color: '#dc2626',
  },
  actionButtons: {
    display: 'flex',
    gap: '12px',
    marginTop: '24px',
  },
  primaryBtn: {
    padding: '12px 24px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
  },
};

// Mock data - to be replaced with API data
const mockPatient = {
  id: 'pat-001',
  fullName: 'John Smith',
  email: 'john.smith@email.com',
  phone: '+1-555-1001',
  age: 45,
  gender: 'male',
  status: 'active',
  address: '123 Main St, New York, NY 10001',
  bloodGroup: 'A+',
  lastVisitAt: '2024-03-10T10:00:00.000Z',
  createdAt: '2023-01-05T00:00:00.000Z'
};

const PatientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPatient();
  }, [id]);

  const fetchPatient = async () => {
    setLoading(true);
    setError('');

    // TODO: Implement get patient by ID API call
    // 1. Import getPatientById from patientService
    // 2. Call API with the patient ID from URL params
    // 3. On success, setPatient with response.data
    // 4. On 404 error, setError with "Patient not found"
    // 5. On other errors, setError with the error message

    try {
      // TODO: Replace this mock implementation with actual API call
      // const response = await patientService.getPatientById(id);
      // setPatient(response.data);

      // Temporary mock - Remove this after implementing API
      setTimeout(() => {
        if (id === 'invalid-id') {
          setError('Patient not found');
        } else {
          setPatient({ ...mockPatient, id });
        }
        setLoading(false);
      }, 500);
    } catch (err) {
      if (err.response?.status === 404) {
        setError('Patient not found');
      } else {
        setError('Failed to load patient details. Please try again.');
      }
      setLoading(false);
    }
  };

  const getInitials = (name) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'PA';
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getStatusBadge = (status) => {
    const colors = {
      active: { bg: '#dcfce7', color: '#166534' },
      inactive: { bg: '#fee2e2', color: '#dc2626' },
    };
    const c = colors[status] || colors.active;
    return { ...styles.badge, backgroundColor: c.bg, color: c.color };
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <Link to="/patients" style={styles.backBtn}>← Back to Patients</Link>
        <div style={styles.loadingState}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⏳</div>
          <p>Loading patient details...</p>
        </div>
        <HelpDrawer content={helpContent.patientDetails} />
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <Link to="/patients" style={styles.backBtn}>← Back to Patients</Link>
        <div style={styles.errorState}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
          <p>{error}</p>
          <button
            onClick={() => navigate('/patients')}
            style={{ marginTop: '16px', padding: '10px 20px', backgroundColor: '#dc2626', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
          >
            Go Back
          </button>
        </div>
        <HelpDrawer content={helpContent.patientDetails} />
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <Link to="/patients" style={styles.backBtn}>← Back to Patients</Link>
      
      <div style={styles.card}>
        <div style={{ ...styles.header, ...(patient.gender === 'male' ? styles.headerMale : {}) }}>
          <div style={styles.headerContent}>
            <div style={styles.avatar}>{getInitials(patient.fullName)}</div>
            <div style={styles.headerInfo}>
              <h1 style={styles.name}>{patient.fullName}</h1>
              <p style={styles.email}>{patient.email}</p>
              <p style={styles.phone}>📞 {patient.phone}</p>
            </div>
            <span style={getStatusBadge(patient.status)}>
              {patient.status?.charAt(0).toUpperCase() + patient.status?.slice(1)}
            </span>
          </div>
        </div>

        <div style={styles.content}>
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Personal Information</h2>
            <div style={styles.grid}>
              <div style={styles.infoItem}>
                <span style={styles.label}>Age</span>
                <span style={styles.value}>{patient.age} Years</span>
              </div>
              <div style={styles.infoItem}>
                <span style={styles.label}>Gender</span>
                <span style={styles.value}>{patient.gender?.charAt(0).toUpperCase() + patient.gender?.slice(1)}</span>
              </div>
              <div style={styles.infoItem}>
                <span style={styles.label}>Blood Group</span>
                <span style={{ ...styles.value, color: '#dc2626' }}>{patient.bloodGroup || 'Unknown'}</span>
              </div>
              <div style={styles.infoItem}>
                <span style={styles.label}>Status</span>
                <span style={styles.value}>{patient.status?.charAt(0).toUpperCase() + patient.status?.slice(1)}</span>
              </div>
            </div>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Contact Information</h2>
            <div style={styles.grid}>
              <div style={styles.infoItem}>
                <span style={styles.label}>Email</span>
                <span style={styles.value}>{patient.email}</span>
              </div>
              <div style={styles.infoItem}>
                <span style={styles.label}>Phone</span>
                <span style={styles.value}>{patient.phone}</span>
              </div>
              <div style={{ ...styles.infoItem, gridColumn: '1 / -1' }}>
                <span style={styles.label}>Address</span>
                <span style={styles.value}>{patient.address || 'Not provided'}</span>
              </div>
            </div>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Visit History</h2>
            <div style={styles.grid}>
              <div style={styles.infoItem}>
                <span style={styles.label}>Last Visit</span>
                <span style={styles.value}>{formatDate(patient.lastVisitAt)}</span>
              </div>
              <div style={styles.infoItem}>
                <span style={styles.label}>Registered On</span>
                <span style={styles.value}>{formatDate(patient.createdAt)}</span>
              </div>
            </div>
          </div>

          <div style={styles.actionButtons}>
            <Link to="/appointments" style={styles.primaryBtn}>
              📅 Book Appointment
            </Link>
          </div>
        </div>
      </div>

      <HelpDrawer content={helpContent.patientDetails} />
    </div>
  );
};

export default PatientDetails;
