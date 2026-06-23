/**
 * Appointment List Page Component
 * 
 * ⚠️ INTERVIEW/TRAINING PROJECT
 * API integration is intentionally incomplete.
 * Candidate must implement all appointment CRUD operations.
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
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  newBtn: {
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
  filters: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
    border: '1px solid #e5e7eb',
  },
  filterRow: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  searchInput: {
    flex: '1',
    minWidth: '200px',
    padding: '10px 16px',
    border: '2px solid #e5e7eb',
    borderRadius: '10px',
    fontSize: '14px',
    outline: 'none',
  },
  select: {
    padding: '10px 16px',
    border: '2px solid #e5e7eb',
    borderRadius: '10px',
    fontSize: '14px',
    outline: 'none',
    backgroundColor: '#fff',
    minWidth: '140px',
    cursor: 'pointer',
  },
  dateInput: {
    padding: '10px 16px',
    border: '2px solid #e5e7eb',
    borderRadius: '10px',
    fontSize: '14px',
    outline: 'none',
    backgroundColor: '#fff',
    cursor: 'pointer',
  },
  filterChips: {
    display: 'flex',
    gap: '8px',
    marginTop: '16px',
  },
  chip: {
    padding: '6px 14px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
    border: '2px solid #e5e7eb',
    backgroundColor: '#fff',
    transition: 'all 0.2s',
  },
  chipActive: {
    backgroundColor: '#667eea',
    color: '#fff',
    borderColor: '#667eea',
  },
  table: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
    border: '1px solid #e5e7eb',
    overflow: 'hidden',
  },
  tableHeader: {
    display: 'grid',
    gridTemplateColumns: '1.5fr 1.5fr 1fr 1fr 1fr 120px',
    padding: '16px 20px',
    backgroundColor: '#f8fafc',
    borderBottom: '1px solid #e5e7eb',
    fontWeight: '600',
    fontSize: '13px',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  tableRow: {
    display: 'grid',
    gridTemplateColumns: '1.5fr 1.5fr 1fr 1fr 1fr 120px',
    padding: '16px 20px',
    borderBottom: '1px solid #e5e7eb',
    alignItems: 'center',
    transition: 'background-color 0.2s',
  },
  personInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  avatar: {
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontWeight: '600',
    fontSize: '12px',
  },
  avatarDoctor: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  avatarPatient: {
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  },
  nameText: {
    fontWeight: '600',
    color: '#1a1a2e',
    fontSize: '14px',
  },
  badge: {
    display: 'inline-block',
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '500',
  },
  badgeScheduled: {
    backgroundColor: '#dbeafe',
    color: '#1d4ed8',
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
  typeBadge: {
    padding: '4px 10px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '500',
    backgroundColor: '#f1f5f9',
    color: '#475569',
  },
  actionBtns: {
    display: 'flex',
    gap: '8px',
  },
  viewBtn: {
    padding: '6px 12px',
    backgroundColor: '#f0f9ff',
    color: '#0369a1',
    border: 'none',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
    textDecoration: 'none',
  },
  cancelBtn: {
    padding: '6px 12px',
    backgroundColor: '#fee2e2',
    color: '#dc2626',
    border: 'none',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    marginTop: '20px',
  },
  pageBtn: {
    padding: '8px 14px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    backgroundColor: '#fff',
    cursor: 'pointer',
    fontSize: '14px',
  },
  pageBtnDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  loadingState: {
    textAlign: 'center',
    padding: '60px',
    backgroundColor: '#fff',
    borderRadius: '16px',
    color: '#6b7280',
  },
  emptyState: {
    textAlign: 'center',
    padding: '60px',
    backgroundColor: '#fff',
    borderRadius: '16px',
    color: '#6b7280',
  },
  errorState: {
    textAlign: 'center',
    padding: '40px',
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
    maxWidth: '500px',
    maxHeight: '90vh',
    overflowY: 'auto',
  },
  modalTitle: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: '24px',
  },
  formGroup: {
    marginBottom: '16px',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '6px',
  },
  input: {
    width: '100%',
    padding: '10px 14px',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    padding: '10px 14px',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    resize: 'vertical',
    minHeight: '80px',
    boxSizing: 'border-box',
  },
  modalButtons: {
    display: 'flex',
    gap: '12px',
    marginTop: '24px',
  },
  submitBtn: {
    flex: 1,
    padding: '12px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  cancelModalBtn: {
    flex: 1,
    padding: '12px',
    backgroundColor: '#f1f5f9',
    color: '#475569',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  confirmModal: {
    textAlign: 'center',
  },
  confirmIcon: {
    fontSize: '48px',
    marginBottom: '16px',
  },
  confirmText: {
    fontSize: '16px',
    color: '#374151',
    marginBottom: '24px',
  },
};

// Mock data
const mockAppointments = [
  { id: 'apt-001', doctorId: 'doc-001', doctorName: 'Dr. Sarah Johnson', patientId: 'pat-001', patientName: 'John Smith', appointmentDate: '2024-03-18', appointmentTime: '09:00', type: 'consultation', status: 'scheduled', notes: 'Initial cardiac consultation' },
  { id: 'apt-002', doctorId: 'doc-002', doctorName: 'Dr. Michael Chen', patientId: 'pat-002', patientName: 'Mary Johnson', appointmentDate: '2024-03-18', appointmentTime: '10:00', type: 'checkup', status: 'scheduled', notes: 'Routine skin checkup' },
  { id: 'apt-003', doctorId: 'doc-003', doctorName: 'Dr. Emily Rodriguez', patientId: 'pat-004', patientName: 'Jennifer Wilson', appointmentDate: '2024-03-18', appointmentTime: '08:30', type: 'consultation', status: 'completed', notes: 'Pediatric consultation' },
  { id: 'apt-004', doctorId: 'doc-005', doctorName: 'Dr. Lisa Thompson', patientId: 'pat-003', patientName: 'Robert Davis', appointmentDate: '2024-03-17', appointmentTime: '14:00', type: 'follow-up', status: 'completed', notes: 'Neurological follow-up' },
  { id: 'apt-005', doctorId: 'doc-006', doctorName: 'Dr. Robert Martinez', patientId: 'pat-006', patientName: 'Linda Garcia', appointmentDate: '2024-03-18', appointmentTime: '11:00', type: 'checkup', status: 'scheduled', notes: 'Annual checkup' },
  { id: 'apt-006', doctorId: 'doc-002', doctorName: 'Dr. Michael Chen', patientId: 'pat-011', patientName: 'Christopher Lee', appointmentDate: '2024-03-16', appointmentTime: '14:30', type: 'checkup', status: 'cancelled', notes: 'Patient cancelled' },
  { id: 'apt-007', doctorId: 'doc-003', doctorName: 'Dr. Emily Rodriguez', patientId: 'pat-012', patientName: 'Jessica White', appointmentDate: '2024-03-14', appointmentTime: '09:00', type: 'checkup', status: 'no-show', notes: 'Patient did not appear' },
];

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [date, setDate] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, totalPages: 1 });
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [formData, setFormData] = useState({
    doctorId: '',
    patientId: '',
    appointmentDate: '',
    appointmentTime: '',
    type: 'consultation',
    notes: ''
  });

  useEffect(() => {
    fetchAppointments();
  }, [search, status, date, page]);

  const fetchAppointments = async () => {
    setLoading(true);
    setError('');

    // TODO: Implement appointment list API call
    // 1. Import getAllAppointments from appointmentService
    // 2. Call API with query params: { search, status, date, page, limit: 10 }
    // 3. On success, setAppointments and setPagination
    // 4. On error, setError with the error message

    try {
      // TODO: Replace with actual API call
      setTimeout(() => {
        let filtered = [...mockAppointments];
        if (search) {
          filtered = filtered.filter(a => 
            a.doctorName.toLowerCase().includes(search.toLowerCase()) ||
            a.patientName.toLowerCase().includes(search.toLowerCase())
          );
        }
        if (status) {
          filtered = filtered.filter(a => a.status === status);
        }
        if (date) {
          filtered = filtered.filter(a => a.appointmentDate === date);
        }
        setAppointments(filtered);
        setPagination({ total: filtered.length, totalPages: Math.ceil(filtered.length / 10) });
        setLoading(false);
      }, 500);
    } catch (err) {
      setError('Failed to load appointments. Please try again.');
      setLoading(false);
    }
  };

  const handleCreateAppointment = async (e) => {
    e.preventDefault();
    
    // TODO: Implement create appointment API call
    // 1. Call createAppointment from appointmentService
    // 2. On success, close modal, show success message, refetch list
    // 3. On error (conflict, validation), show error message

    alert('TODO: Implement create appointment API integration');
    setShowModal(false);
  };

  const handleCancelAppointment = async () => {
    // TODO: Implement cancel appointment API call
    // 1. Call updateAppointmentStatus or deleteAppointment from appointmentService
    // 2. On success, close confirm modal, refetch list
    // 3. On error, show error message

    alert('TODO: Implement cancel appointment API integration');
    setShowConfirm(false);
    setSelectedAppointment(null);
  };

  const getStatusBadge = (status) => {
    const badgeStyles = {
      scheduled: styles.badgeScheduled,
      completed: styles.badgeCompleted,
      cancelled: styles.badgeCancelled,
      'no-show': styles.badgeNoShow,
    };
    return { ...styles.badge, ...badgeStyles[status] };
  };

  const getInitials = (name) => name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Appointments</h1>
          <p style={styles.subtitle}>Manage clinic appointments</p>
        </div>
        <button style={styles.newBtn} onClick={() => setShowModal(true)}>
          ➕ New Appointment
        </button>
      </div>

      {/* Filters */}
      <div style={styles.filters}>
        <div style={styles.filterRow}>
          <input
            type="text"
            placeholder="Search by doctor or patient..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            style={styles.searchInput}
          />
          <input
            type="date"
            value={date}
            onChange={(e) => { setDate(e.target.value); setPage(1); }}
            style={styles.dateInput}
          />
        </div>
        <div style={styles.filterChips}>
          <span style={{ fontSize: '13px', color: '#6b7280', marginRight: '8px' }}>Status:</span>
          {['', 'scheduled', 'completed', 'cancelled', 'no-show'].map(s => (
            <button
              key={s}
              style={{ ...styles.chip, ...(status === s ? styles.chipActive : {}) }}
              onClick={() => { setStatus(s); setPage(1); }}
            >
              {s === '' ? 'All' : s === 'no-show' ? 'No Show' : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div style={styles.loadingState}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⏳</div>
          <p>Loading appointments...</p>
        </div>
      ) : error ? (
        <div style={styles.errorState}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
          <p>{error}</p>
          <button onClick={fetchAppointments} style={{ marginTop: '16px', padding: '10px 20px', backgroundColor: '#dc2626', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            Retry
          </button>
        </div>
      ) : appointments.length === 0 ? (
        <div style={styles.emptyState}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📅</div>
          <p>No appointments found</p>
          <button onClick={() => { setSearch(''); setStatus(''); setDate(''); }} style={{ marginTop: '16px', padding: '10px 20px', backgroundColor: '#667eea', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            Clear Filters
          </button>
        </div>
      ) : (
        <div style={styles.table}>
          <div style={styles.tableHeader}>
            <div>Doctor</div>
            <div>Patient</div>
            <div>Date & Time</div>
            <div>Type</div>
            <div>Status</div>
            <div>Actions</div>
          </div>
          {appointments.map(apt => (
            <div
              key={apt.id}
              style={styles.tableRow}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#fff'}
            >
              <div style={styles.personInfo}>
                <div style={{ ...styles.avatar, ...styles.avatarDoctor }}>{getInitials(apt.doctorName)}</div>
                <span style={styles.nameText}>{apt.doctorName}</span>
              </div>
              <div style={styles.personInfo}>
                <div style={{ ...styles.avatar, ...styles.avatarPatient }}>{getInitials(apt.patientName)}</div>
                <span style={styles.nameText}>{apt.patientName}</span>
              </div>
              <div style={{ fontSize: '14px', color: '#374151' }}>
                <div>{formatDate(apt.appointmentDate)}</div>
                <div style={{ color: '#6b7280', fontSize: '12px' }}>{apt.appointmentTime}</div>
              </div>
              <div>
                <span style={styles.typeBadge}>{apt.type}</span>
              </div>
              <div>
                <span style={getStatusBadge(apt.status)}>
                  {apt.status === 'no-show' ? 'No Show' : apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                </span>
              </div>
              <div style={styles.actionBtns}>
                <Link to={`/appointments/${apt.id}`} style={styles.viewBtn}>View</Link>
                {apt.status === 'scheduled' && (
                  <button 
                    style={styles.cancelBtn}
                    onClick={() => { setSelectedAppointment(apt); setShowConfirm(true); }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && !error && appointments.length > 0 && (
        <div style={styles.pagination}>
          <button style={{ ...styles.pageBtn, ...(page === 1 ? styles.pageBtnDisabled : {}) }} onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
            ← Previous
          </button>
          <span style={{ padding: '0 16px', fontSize: '14px', color: '#6b7280' }}>
            Page {page} of {pagination.totalPages || 1}
          </span>
          <button style={{ ...styles.pageBtn, ...(page >= pagination.totalPages ? styles.pageBtnDisabled : {}) }} onClick={() => setPage(p => p + 1)} disabled={page >= pagination.totalPages}>
            Next →
          </button>
        </div>
      )}

      {/* New Appointment Modal */}
      {showModal && (
        <div style={styles.modal} onClick={() => setShowModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2 style={styles.modalTitle}>📅 New Appointment</h2>
            <form onSubmit={handleCreateAppointment}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Doctor ID *</label>
                <input type="text" placeholder="e.g., doc-001" value={formData.doctorId} onChange={(e) => setFormData({...formData, doctorId: e.target.value})} style={styles.input} required />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Patient ID *</label>
                <input type="text" placeholder="e.g., pat-001" value={formData.patientId} onChange={(e) => setFormData({...formData, patientId: e.target.value})} style={styles.input} required />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Date *</label>
                <input type="date" value={formData.appointmentDate} onChange={(e) => setFormData({...formData, appointmentDate: e.target.value})} style={styles.input} required />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Time *</label>
                <input type="time" value={formData.appointmentTime} onChange={(e) => setFormData({...formData, appointmentTime: e.target.value})} style={styles.input} required />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Type *</label>
                <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} style={styles.input}>
                  <option value="consultation">Consultation</option>
                  <option value="follow-up">Follow-up</option>
                  <option value="checkup">Checkup</option>
                </select>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Notes</label>
                <textarea placeholder="Additional notes..." value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} style={styles.textarea} />
              </div>
              <div style={styles.modalButtons}>
                <button type="button" style={styles.cancelModalBtn} onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" style={styles.submitBtn}>Create Appointment</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirm && (
        <div style={styles.modal} onClick={() => setShowConfirm(false)}>
          <div style={{ ...styles.modalContent, ...styles.confirmModal }} onClick={(e) => e.stopPropagation()}>
            <div style={styles.confirmIcon}>⚠️</div>
            <h2 style={styles.modalTitle}>Cancel Appointment?</h2>
            <p style={styles.confirmText}>
              Are you sure you want to cancel the appointment for <strong>{selectedAppointment?.patientName}</strong> with <strong>{selectedAppointment?.doctorName}</strong>?
            </p>
            <div style={styles.modalButtons}>
              <button style={styles.cancelModalBtn} onClick={() => setShowConfirm(false)}>No, Keep It</button>
              <button style={{ ...styles.submitBtn, background: '#dc2626' }} onClick={handleCancelAppointment}>Yes, Cancel</button>
            </div>
          </div>
        </div>
      )}

      <HelpDrawer content={helpContent.appointmentList} />
    </div>
  );
};

export default AppointmentList;
