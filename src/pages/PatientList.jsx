/**
 * Patient List Page Component
 * 
 * ⚠️ INTERVIEW/TRAINING PROJECT
 * API integration is intentionally incomplete.
 * Candidate must implement the patient list fetching and filtering.
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
    transition: 'border-color 0.2s',
  },
  select: {
    padding: '10px 16px',
    border: '2px solid #e5e7eb',
    borderRadius: '10px',
    fontSize: '14px',
    outline: 'none',
    backgroundColor: '#fff',
    minWidth: '150px',
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
    gridTemplateColumns: '2fr 1fr 0.8fr 1fr 1fr 100px',
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
    gridTemplateColumns: '2fr 1fr 0.8fr 1fr 1fr 100px',
    padding: '16px 20px',
    borderBottom: '1px solid #e5e7eb',
    alignItems: 'center',
    transition: 'background-color 0.2s',
    cursor: 'pointer',
  },
  patientInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontWeight: '600',
    fontSize: '14px',
  },
  avatarMale: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  patientName: {
    fontWeight: '600',
    color: '#1a1a2e',
    margin: 0,
    fontSize: '14px',
  },
  patientEmail: {
    fontSize: '12px',
    color: '#6b7280',
    margin: '2px 0 0',
  },
  badge: {
    display: 'inline-block',
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '500',
  },
  badgeActive: {
    backgroundColor: '#dcfce7',
    color: '#166534',
  },
  badgeInactive: {
    backgroundColor: '#fee2e2',
    color: '#dc2626',
  },
  badgeMale: {
    backgroundColor: '#dbeafe',
    color: '#1d4ed8',
  },
  badgeFemale: {
    backgroundColor: '#fce7f3',
    color: '#be185d',
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
    display: 'inline-block',
    textAlign: 'center',
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
    transition: 'all 0.2s',
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
};

// Mock data - to be replaced with API data
const mockPatients = [
  { id: 'pat-001', fullName: 'John Smith', email: 'john.smith@email.com', phone: '+1-555-1001', age: 45, gender: 'male', status: 'active', lastVisitAt: '2024-03-10T10:00:00.000Z' },
  { id: 'pat-002', fullName: 'Mary Johnson', email: 'mary.johnson@email.com', phone: '+1-555-1002', age: 32, gender: 'female', status: 'active', lastVisitAt: '2024-03-12T14:30:00.000Z' },
  { id: 'pat-003', fullName: 'Robert Davis', email: 'robert.davis@email.com', phone: '+1-555-1003', age: 58, gender: 'male', status: 'active', lastVisitAt: '2024-03-08T09:00:00.000Z' },
  { id: 'pat-004', fullName: 'Jennifer Wilson', email: 'jennifer.wilson@email.com', phone: '+1-555-1004', age: 28, gender: 'female', status: 'active', lastVisitAt: '2024-03-15T11:00:00.000Z' },
  { id: 'pat-005', fullName: 'Michael Brown', email: 'michael.brown@email.com', phone: '+1-555-1005', age: 67, gender: 'male', status: 'inactive', lastVisitAt: '2023-12-20T10:30:00.000Z' },
  { id: 'pat-006', fullName: 'Linda Garcia', email: 'linda.garcia@email.com', phone: '+1-555-1006', age: 41, gender: 'female', status: 'active', lastVisitAt: '2024-03-14T15:00:00.000Z' },
  { id: 'pat-007', fullName: 'William Martinez', email: 'william.martinez@email.com', phone: '+1-555-1007', age: 52, gender: 'male', status: 'active', lastVisitAt: '2024-03-11T09:30:00.000Z' },
  { id: 'pat-008', fullName: 'Elizabeth Anderson', email: 'elizabeth.anderson@email.com', phone: '+1-555-1008', age: 36, gender: 'female', status: 'active', lastVisitAt: '2024-03-13T16:00:00.000Z' },
];

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [gender, setGender] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, totalPages: 1 });

  useEffect(() => {
    fetchPatients();
  }, [search, gender, status, page]);

  const fetchPatients = async () => {
    setLoading(true);
    setError('');

    // TODO: Implement patient list API call
    // 1. Import getAllPatients from patientService
    // 2. Call API with query params: { search, gender, status, page, limit: 10 }
    // 3. On success, setPatients with response.data and setPagination with response.pagination
    // 4. On error, setError with the error message

    try {
      // TODO: Replace this mock implementation with actual API call
      // const response = await patientService.getAllPatients({
      //   search,
      //   gender,
      //   status,
      //   page,
      //   limit: 10
      // });
      // setPatients(response.data);
      // setPagination(response.pagination);

      // Temporary mock - Remove this after implementing API
      setTimeout(() => {
        let filtered = [...mockPatients];
        
        if (search) {
          filtered = filtered.filter(p => 
            p.fullName.toLowerCase().includes(search.toLowerCase()) ||
            p.email.toLowerCase().includes(search.toLowerCase()) ||
            p.phone.includes(search)
          );
        }
        if (gender) {
          filtered = filtered.filter(p => p.gender === gender);
        }
        if (status) {
          filtered = filtered.filter(p => p.status === status);
        }
        
        setPatients(filtered);
        setPagination({ total: filtered.length, totalPages: Math.ceil(filtered.length / 10) });
        setLoading(false);
      }, 500);
    } catch (err) {
      setError('Failed to load patients. Please try again.');
      setLoading(false);
    }
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Patients</h1>
          <p style={styles.subtitle}>Manage your clinic's patients</p>
        </div>
      </div>

      {/* Filters */}
      <div style={styles.filters}>
        <div style={styles.filterRow}>
          <input
            type="text"
            placeholder="Search by name, email or phone..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            style={styles.searchInput}
            onFocus={(e) => e.target.style.borderColor = '#667eea'}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
          />
          <select
            value={gender}
            onChange={(e) => { setGender(e.target.value); setPage(1); }}
            style={styles.select}
          >
            <option value="">All Genders</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div style={styles.filterChips}>
          <span style={{ fontSize: '13px', color: '#6b7280', marginRight: '8px' }}>Status:</span>
          {['', 'active', 'inactive'].map(s => (
            <button
              key={s}
              style={{
                ...styles.chip,
                ...(status === s ? styles.chipActive : {}),
              }}
              onClick={() => { setStatus(s); setPage(1); }}
            >
              {s === '' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div style={styles.loadingState}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⏳</div>
          <p>Loading patients...</p>
        </div>
      ) : error ? (
        <div style={styles.errorState}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
          <p>{error}</p>
          <button onClick={fetchPatients} style={{ marginTop: '16px', padding: '10px 20px', backgroundColor: '#dc2626', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            Retry
          </button>
        </div>
      ) : patients.length === 0 ? (
        <div style={styles.emptyState}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
          <p>No patients found matching your criteria</p>
          <button 
            onClick={() => { setSearch(''); setGender(''); setStatus(''); }}
            style={{ marginTop: '16px', padding: '10px 20px', backgroundColor: '#667eea', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div style={styles.table}>
          <div style={styles.tableHeader}>
            <div>Patient</div>
            <div>Phone</div>
            <div>Age</div>
            <div>Gender</div>
            <div>Status</div>
            <div>Action</div>
          </div>
          {patients.map(patient => (
            <div
              key={patient.id}
              style={styles.tableRow}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#fff'}
            >
              <div style={styles.patientInfo}>
                <div style={{ ...styles.avatar, ...(patient.gender === 'male' ? styles.avatarMale : {}) }}>
                  {getInitials(patient.fullName)}
                </div>
                <div>
                  <p style={styles.patientName}>{patient.fullName}</p>
                  <p style={styles.patientEmail}>{patient.email}</p>
                </div>
              </div>
              <div style={{ fontSize: '14px', color: '#374151' }}>{patient.phone}</div>
              <div style={{ fontSize: '14px', color: '#374151' }}>{patient.age} yrs</div>
              <div>
                <span style={{ ...styles.badge, ...(patient.gender === 'male' ? styles.badgeMale : styles.badgeFemale) }}>
                  {patient.gender.charAt(0).toUpperCase() + patient.gender.slice(1)}
                </span>
              </div>
              <div>
                <span style={{ ...styles.badge, ...(patient.status === 'active' ? styles.badgeActive : styles.badgeInactive) }}>
                  {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
                </span>
              </div>
              <div>
                <Link to={`/patients/${patient.id}`} style={styles.viewBtn}>
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && !error && patients.length > 0 && (
        <div style={styles.pagination}>
          <button
            style={{ ...styles.pageBtn, ...(page === 1 ? styles.pageBtnDisabled : {}) }}
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            ← Previous
          </button>
          <span style={{ padding: '0 16px', fontSize: '14px', color: '#6b7280' }}>
            Page {page} of {pagination.totalPages || 1}
          </span>
          <button
            style={{ ...styles.pageBtn, ...(page >= pagination.totalPages ? styles.pageBtnDisabled : {}) }}
            onClick={() => setPage(p => p + 1)}
            disabled={page >= pagination.totalPages}
          >
            Next →
          </button>
        </div>
      )}

      <HelpDrawer content={helpContent.patientList} />
    </div>
  );
};

export default PatientList;
