/**
 * Doctor Details Page Component
 * 
 * ⚠️ INTERVIEW/TRAINING PROJECT
 * API integration is intentionally incomplete.
 * Candidate must implement the doctor details fetching.
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
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '32px',
    color: '#fff',
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
  specialty: {
    fontSize: '16px',
    opacity: 0.9,
    marginTop: '4px',
  },
  qualification: {
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
  badgeAvailable: {
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
  slotGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  slot: {
    padding: '8px 14px',
    backgroundColor: '#f0f9ff',
    color: '#0369a1',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '500',
  },
  dayTag: {
    padding: '6px 12px',
    backgroundColor: '#dcfce7',
    color: '#166534',
    borderRadius: '6px',
    fontSize: '13px',
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
const mockDoctor = {
  id: 'doc-001',
  fullName: 'Dr. Sarah Johnson',
  email: 'sarah.johnson@clinic.com',
  phone: '+1-555-0101',
  specialty: 'Cardiology',
  qualification: 'MD, FACC',
  experienceYears: 15,
  fee: 200,
  status: 'available',
  availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  availableSlots: ['09:00', '09:30', '10:00', '10:30', '11:00', '14:00', '14:30', '15:00', '15:30'],
  createdAt: '2023-01-10T00:00:00.000Z'
};

const DoctorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDoctor();
  }, [id]);

  const fetchDoctor = async () => {
    setLoading(true);
    setError('');

    // TODO: Implement get doctor by ID API call
    // 1. Import getDoctorById from doctorService
    // 2. Call API with the doctor ID from URL params
    // 3. On success, setDoctor with response.data
    // 4. On 404 error, setError with "Doctor not found"
    // 5. On other errors, setError with the error message

    try {
      // TODO: Replace this mock implementation with actual API call
      // const response = await doctorService.getDoctorById(id);
      // setDoctor(response.data);

      // Temporary mock - Remove this after implementing API
      setTimeout(() => {
        if (id === 'invalid-id') {
          setError('Doctor not found');
        } else {
          setDoctor({ ...mockDoctor, id });
        }
        setLoading(false);
      }, 500);
    } catch (err) {
      if (err.response?.status === 404) {
        setError('Doctor not found');
      } else {
        setError('Failed to load doctor details. Please try again.');
      }
      setLoading(false);
    }
  };

  const getInitials = (name) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'DR';
  };

  const getStatusBadge = (status) => {
    const colors = {
      available: { bg: '#dcfce7', color: '#166534' },
      unavailable: { bg: '#fee2e2', color: '#dc2626' },
      'on-leave': { bg: '#fef3c7', color: '#92400e' },
    };
    const c = colors[status] || colors.available;
    return { ...styles.badge, backgroundColor: c.bg, color: c.color };
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <Link to="/doctors" style={styles.backBtn}>← Back to Doctors</Link>
        <div style={styles.loadingState}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⏳</div>
          <p>Loading doctor details...</p>
        </div>
        <HelpDrawer content={helpContent.doctorDetails} />
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <Link to="/doctors" style={styles.backBtn}>← Back to Doctors</Link>
        <div style={styles.errorState}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
          <p>{error}</p>
          <button
            onClick={() => navigate('/doctors')}
            style={{ marginTop: '16px', padding: '10px 20px', backgroundColor: '#dc2626', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
          >
            Go Back
          </button>
        </div>
        <HelpDrawer content={helpContent.doctorDetails} />
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <Link to="/doctors" style={styles.backBtn}>← Back to Doctors</Link>
      
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.headerContent}>
            <div style={styles.avatar}>{getInitials(doctor.fullName)}</div>
            <div style={styles.headerInfo}>
              <h1 style={styles.name}>{doctor.fullName}</h1>
              <p style={styles.specialty}>{doctor.specialty}</p>
              <p style={styles.qualification}>🎓 {doctor.qualification}</p>
            </div>
            <span style={getStatusBadge(doctor.status)}>
              {doctor.status === 'on-leave' ? 'On Leave' : doctor.status?.charAt(0).toUpperCase() + doctor.status?.slice(1)}
            </span>
          </div>
        </div>

        <div style={styles.content}>
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Contact Information</h2>
            <div style={styles.grid}>
              <div style={styles.infoItem}>
                <span style={styles.label}>Email</span>
                <span style={styles.value}>{doctor.email}</span>
              </div>
              <div style={styles.infoItem}>
                <span style={styles.label}>Phone</span>
                <span style={styles.value}>{doctor.phone || 'Not provided'}</span>
              </div>
            </div>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Professional Details</h2>
            <div style={styles.grid}>
              <div style={styles.infoItem}>
                <span style={styles.label}>Specialty</span>
                <span style={styles.value}>{doctor.specialty}</span>
              </div>
              <div style={styles.infoItem}>
                <span style={styles.label}>Qualification</span>
                <span style={styles.value}>{doctor.qualification}</span>
              </div>
              <div style={styles.infoItem}>
                <span style={styles.label}>Experience</span>
                <span style={styles.value}>{doctor.experienceYears} Years</span>
              </div>
              <div style={styles.infoItem}>
                <span style={styles.label}>Consultation Fee</span>
                <span style={{ ...styles.value, color: '#059669', fontSize: '20px' }}>${doctor.fee}</span>
              </div>
            </div>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Available Days</h2>
            <div style={styles.slotGrid}>
              {doctor.availableDays?.map(day => (
                <span key={day} style={styles.dayTag}>{day}</span>
              ))}
            </div>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Available Time Slots</h2>
            <div style={styles.slotGrid}>
              {doctor.availableSlots?.map(slot => (
                <span key={slot} style={styles.slot}>{slot}</span>
              ))}
            </div>
          </div>

          <div style={styles.actionButtons}>
            <Link to="/appointments" style={styles.primaryBtn}>
              📅 Book Appointment
            </Link>
          </div>
        </div>
      </div>

      <HelpDrawer content={helpContent.doctorDetails} />
    </div>
  );
};

export default DoctorDetails;
