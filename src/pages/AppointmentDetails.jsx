/**
 * Appointment Details Page Component
 * 
 * ⚠️ INTERVIEW/TRAINING PROJECT
 * API integration is intentionally incomplete.
 * Candidate must implement appointment details, update, and delete functionality.
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
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  appointmentId: {
    fontSize: '14px',
    opacity: 0.8,
    marginBottom: '8px',
  },
  headerTitle: {
    fontSize: '24px',
    fontWeight: '700',
    margin: 0,
  },
  headerSubtitle: {
    fontSize: '16px',
    opacity: 0.9,
    marginTop: '8px',
  },
  badge: {
    display: 'inline-block',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '600',
  },
  badgeScheduled: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: '#fff',
  },
  badgeCompleted: {
    backgroundColor: '#dcfce7',
    color: '#166534',
  },
  badgeCancelled: {
    backgroundColor: '#fee2e2',
    color: '#dc2626',
  },
  badgeNoShow: {
    backgroundColor: '#fef3c7',
    color: '#92400e',
  },
  content: {
    padding: '32px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
    marginBottom: '32px',
  },
  section: {
    backgroundColor: '#f8fafc',
    borderRadius: '12px',
    padding: '24px',
  },
  sectionTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '16px',
  },
  personCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  avatar: {
    width: '56px',
    height: '56px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontWeight: '700',
    fontSize: '20px',
  },
  avatarDoctor: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  avatarPatient: {
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  },
  personInfo: {
    flex: 1,
  },
  personName: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1a1a2e',
    margin: 0,
  },
  personSubtext: {
    fontSize: '14px',
    color: '#6b7280',
    marginTop: '4px',
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px 0',
    borderBottom: '1px solid #e5e7eb',
  },
  infoLabel: {
    fontSize: '14px',
    color: '#6b7280',
  },
  infoValue: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1a1a2e',
  },
  notesSection: {
    marginTop: '24px',
  },
  notes: {
    backgroundColor: '#f8fafc',
    borderRadius: '12px',
    padding: '20px',
    fontSize: '14px',
    color: '#374151',
    lineHeight: '1.6',
  },
  actionButtons: {
    display: 'flex',
    gap: '12px',
    marginTop: '32px',
    paddingTop: '24px',
    borderTop: '1px solid #e5e7eb',
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
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  secondaryBtn: {
    padding: '12px 24px',
    backgroundColor: '#f1f5f9',
    color: '#475569',
    border: 'none',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  dangerBtn: {
    padding: '12px 24px',
    backgroundColor: '#fee2e2',
    color: '#dc2626',
    border: 'none',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  successBtn: {
    padding: '12px 24px',
    backgroundColor: '#dcfce7',
    color: '#166534',
    border: 'none',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
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
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '32px',
    width: '90%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  modalIcon: {
    fontSize: '48px',
    marginBottom: '16px',
  },
  modalTitle: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: '12px',
  },
  modalText: {
    fontSize: '14px',
    color: '#6b7280',
    marginBottom: '24px',
  },
  modalButtons: {
    display: 'flex',
    gap: '12px',
  },
  modalBtn: {
    flex: 1,
    padding: '12px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    border: 'none',
  },
};

// Mock data
const mockAppointment = {
  id: 'apt-001',
  doctorId: 'doc-001',
  doctorName: 'Dr. Sarah Johnson',
  patientId: 'pat-001',
  patientName: 'John Smith',
  appointmentDate: '2024-03-18',
  appointmentTime: '09:00',
  type: 'consultation',
  status: 'scheduled',
  notes: 'Initial cardiac consultation for chest pain symptoms. Patient has reported recurring chest discomfort over the past two weeks.',
  createdAt: '2024-03-10T08:00:00.000Z'
};

const AppointmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  useEffect(() => {
    fetchAppointment();
  }, [id]);

  const fetchAppointment = async () => {
    setLoading(true);
    setError('');

    // TODO: Implement get appointment by ID API call
    // 1. Import getAppointmentById from appointmentService
    // 2. Call API with the appointment ID from URL params
    // 3. On success, setAppointment with response.data
    // 4. On 404 error, setError with "Appointment not found"

    try {
      // TODO: Replace with actual API call
      setTimeout(() => {
        if (id === 'invalid-id') {
          setError('Appointment not found');
        } else {
          setAppointment({ ...mockAppointment, id });
        }
        setLoading(false);
      }, 500);
    } catch (err) {
      if (err.response?.status === 404) {
        setError('Appointment not found');
      } else {
        setError('Failed to load appointment details. Please try again.');
      }
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    // TODO: Implement status update API call
    // 1. Call updateAppointmentStatus from appointmentService
    // 2. On success, update local state and show success message
    // 3. On error, show error message

    alert(`TODO: Implement status update to "${newStatus}"`);
    setShowConfirm(false);
  };

  const handleDelete = async () => {
    // TODO: Implement delete appointment API call
    // 1. Call deleteAppointment from appointmentService
    // 2. On success, redirect to appointments list
    // 3. On error, show error message

    alert('TODO: Implement delete appointment API integration');
    setShowConfirm(false);
  };

  const getInitials = (name) => name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || '';

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getStatusBadge = (status) => {
    const badgeStyles = {
      scheduled: styles.badgeScheduled,
      completed: styles.badgeCompleted,
      cancelled: styles.badgeCancelled,
      'no-show': styles.badgeNoShow,
    };
    return { ...styles.badge, ...(badgeStyles[status] || styles.badgeScheduled) };
  };

  const openConfirm = (action) => {
    setConfirmAction(action);
    setShowConfirm(true);
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <Link to="/appointments" style={styles.backBtn}>← Back to Appointments</Link>
        <div style={styles.loadingState}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⏳</div>
          <p>Loading appointment details...</p>
        </div>
        <HelpDrawer content={helpContent.appointmentDetails} />
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <Link to="/appointments" style={styles.backBtn}>← Back to Appointments</Link>
        <div style={styles.errorState}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
          <p>{error}</p>
          <button onClick={() => navigate('/appointments')} style={{ marginTop: '16px', padding: '10px 20px', backgroundColor: '#dc2626', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            Go Back
          </button>
        </div>
        <HelpDrawer content={helpContent.appointmentDetails} />
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <Link to="/appointments" style={styles.backBtn}>← Back to Appointments</Link>
      
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.headerContent}>
            <div>
              <div style={styles.appointmentId}>ID: {appointment.id}</div>
              <h1 style={styles.headerTitle}>
                📅 {formatDate(appointment.appointmentDate)}
              </h1>
              <p style={styles.headerSubtitle}>
                🕐 {appointment.appointmentTime} • {appointment.type?.charAt(0).toUpperCase() + appointment.type?.slice(1)}
              </p>
            </div>
            <span style={getStatusBadge(appointment.status)}>
              {appointment.status === 'no-show' ? 'No Show' : appointment.status?.charAt(0).toUpperCase() + appointment.status?.slice(1)}
            </span>
          </div>
        </div>

        <div style={styles.content}>
          <div style={styles.grid}>
            {/* Doctor Info */}
            <div style={styles.section}>
              <div style={styles.sectionTitle}>👨‍⚕️ Doctor</div>
              <div style={styles.personCard}>
                <div style={{ ...styles.avatar, ...styles.avatarDoctor }}>
                  {getInitials(appointment.doctorName)}
                </div>
                <div style={styles.personInfo}>
                  <p style={styles.personName}>{appointment.doctorName}</p>
                  <p style={styles.personSubtext}>ID: {appointment.doctorId}</p>
                </div>
              </div>
            </div>

            {/* Patient Info */}
            <div style={styles.section}>
              <div style={styles.sectionTitle}>👤 Patient</div>
              <div style={styles.personCard}>
                <div style={{ ...styles.avatar, ...styles.avatarPatient }}>
                  {getInitials(appointment.patientName)}
                </div>
                <div style={styles.personInfo}>
                  <p style={styles.personName}>{appointment.patientName}</p>
                  <p style={styles.personSubtext}>ID: {appointment.patientId}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Appointment Details */}
          <div style={styles.section}>
            <div style={styles.sectionTitle}>📋 Appointment Details</div>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Date</span>
              <span style={styles.infoValue}>{formatDate(appointment.appointmentDate)}</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Time</span>
              <span style={styles.infoValue}>{appointment.appointmentTime}</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Type</span>
              <span style={styles.infoValue}>{appointment.type?.charAt(0).toUpperCase() + appointment.type?.slice(1)}</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Status</span>
              <span style={styles.infoValue}>{appointment.status === 'no-show' ? 'No Show' : appointment.status?.charAt(0).toUpperCase() + appointment.status?.slice(1)}</span>
            </div>
            <div style={{ ...styles.infoRow, borderBottom: 'none' }}>
              <span style={styles.infoLabel}>Created</span>
              <span style={styles.infoValue}>{new Date(appointment.createdAt).toLocaleString()}</span>
            </div>
          </div>

          {/* Notes */}
          {appointment.notes && (
            <div style={styles.notesSection}>
              <div style={styles.sectionTitle}>📝 Notes</div>
              <div style={styles.notes}>{appointment.notes}</div>
            </div>
          )}

          {/* Action Buttons */}
          <div style={styles.actionButtons}>
            {appointment.status === 'scheduled' && (
              <>
                <button style={styles.successBtn} onClick={() => openConfirm('complete')}>
                  ✅ Mark Complete
                </button>
                <button style={styles.secondaryBtn} onClick={() => openConfirm('no-show')}>
                  ⚠️ No Show
                </button>
                <button style={styles.dangerBtn} onClick={() => openConfirm('cancel')}>
                  ❌ Cancel
                </button>
              </>
            )}
            <button style={styles.dangerBtn} onClick={() => openConfirm('delete')}>
              🗑️ Delete
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div style={styles.modal} onClick={() => setShowConfirm(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalIcon}>
              {confirmAction === 'complete' ? '✅' : confirmAction === 'delete' ? '🗑️' : '⚠️'}
            </div>
            <h2 style={styles.modalTitle}>
              {confirmAction === 'complete' && 'Mark as Complete?'}
              {confirmAction === 'cancel' && 'Cancel Appointment?'}
              {confirmAction === 'no-show' && 'Mark as No Show?'}
              {confirmAction === 'delete' && 'Delete Appointment?'}
            </h2>
            <p style={styles.modalText}>
              {confirmAction === 'delete' 
                ? 'This action cannot be undone. The appointment will be permanently deleted.'
                : 'Are you sure you want to proceed with this action?'
              }
            </p>
            <div style={styles.modalButtons}>
              <button 
                style={{ ...styles.modalBtn, backgroundColor: '#f1f5f9', color: '#475569' }} 
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
              <button 
                style={{ 
                  ...styles.modalBtn, 
                  backgroundColor: confirmAction === 'complete' ? '#22c55e' : '#dc2626', 
                  color: '#fff' 
                }}
                onClick={() => confirmAction === 'delete' ? handleDelete() : handleStatusUpdate(confirmAction === 'complete' ? 'completed' : confirmAction === 'cancel' ? 'cancelled' : 'no-show')}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      <HelpDrawer content={helpContent.appointmentDetails} />
    </div>
  );
};

export default AppointmentDetails;
