/**
 * Doctor List Page Component
 * 
 * ⚠️ INTERVIEW/TRAINING PROJECT
 * API integration is intentionally incomplete.
 * Candidate must implement the doctor list fetching and filtering.
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
    gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1fr 100px',
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
    gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1fr 100px',
    padding: '16px 20px',
    borderBottom: '1px solid #e5e7eb',
    alignItems: 'center',
    transition: 'background-color 0.2s',
    cursor: 'pointer',
  },
  doctorInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontWeight: '600',
    fontSize: '14px',
  },
  doctorName: {
    fontWeight: '600',
    color: '#1a1a2e',
    margin: 0,
    fontSize: '14px',
  },
  doctorEmail: {
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
  badgeAvailable: {
    backgroundColor: '#dcfce7',
    color: '#166534',
  },
  badgeUnavailable: {
    backgroundColor: '#fee2e2',
    color: '#dc2626',
  },
  badgeOnLeave: {
    backgroundColor: '#fef3c7',
    color: '#92400e',
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
  pageBtnActive: {
    backgroundColor: '#667eea',
    color: '#fff',
    borderColor: '#667eea',
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
const mockDoctors = [
  { id: 'doc-001', fullName: 'Dr. Sarah Johnson', email: 'sarah.johnson@clinic.com', specialty: 'Cardiology', qualification: 'MD, FACC', experienceYears: 15, fee: 200, status: 'available' },
  { id: 'doc-002', fullName: 'Dr. Michael Chen', email: 'michael.chen@clinic.com', specialty: 'Dermatology', qualification: 'MD, FAAD', experienceYears: 12, fee: 175, status: 'available' },
  { id: 'doc-003', fullName: 'Dr. Emily Rodriguez', email: 'emily.rodriguez@clinic.com', specialty: 'Pediatrics', qualification: 'MD, FAAP', experienceYears: 10, fee: 150, status: 'available' },
  { id: 'doc-004', fullName: 'Dr. James Wilson', email: 'james.wilson@clinic.com', specialty: 'Orthopedics', qualification: 'MD, FAAOS', experienceYears: 18, fee: 225, status: 'on-leave' },
  { id: 'doc-005', fullName: 'Dr. Lisa Thompson', email: 'lisa.thompson@clinic.com', specialty: 'Neurology', qualification: 'MD, PhD', experienceYears: 20, fee: 250, status: 'available' },
  { id: 'doc-006', fullName: 'Dr. Robert Martinez', email: 'robert.martinez@clinic.com', specialty: 'General Medicine', qualification: 'MD, FACP', experienceYears: 8, fee: 120, status: 'available' },
  { id: 'doc-007', fullName: 'Dr. Amanda Foster', email: 'amanda.foster@clinic.com', specialty: 'Gynecology', qualification: 'MD, FACOG', experienceYears: 14, fee: 180, status: 'unavailable' },
  { id: 'doc-008', fullName: 'Dr. David Kim', email: 'david.kim@clinic.com', specialty: 'Ophthalmology', qualification: 'MD, FACS', experienceYears: 16, fee: 195, status: 'available' },
];

const specialties = ['Cardiology', 'Dermatology', 'Pediatrics', 'Orthopedics', 'Neurology', 'General Medicine', 'Gynecology', 'Ophthalmology'];

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [availability, setAvailability] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, totalPages: 1 });

  useEffect(() => {
    fetchDoctors();
  }, [search, specialty, availability, page]);

  const fetchDoctors = async () => {
    setLoading(true);
    setError('');

    // TODO: Implement doctor list API call
    // 1. Import getAllDoctors from doctorService
    // 2. Call API with query params: { search, specialty, availability, page, limit: 10 }
    // 3. On success, setDoctors with response.data and setPagination with response.pagination
    // 4. On error, setError with the error message

    try {
      // TODO: Replace this mock implementation with actual API call
      // const response = await doctorService.getAllDoctors({
      //   search,
      //   specialty,
      //   availability,
      //   page,
      //   limit: 10
      // });
      // setDoctors(response.data);
      // setPagination(response.pagination);

      // Temporary mock - Remove this after implementing API
      setTimeout(() => {
        let filtered = [...mockDoctors];
        
        if (search) {
          filtered = filtered.filter(d => 
            d.fullName.toLowerCase().includes(search.toLowerCase()) ||
            d.email.toLowerCase().includes(search.toLowerCase())
          );
        }
        if (specialty) {
          filtered = filtered.filter(d => d.specialty === specialty);
        }
        if (availability) {
          filtered = filtered.filter(d => d.status === availability);
        }
        
        setDoctors(filtered);
        setPagination({ total: filtered.length, totalPages: Math.ceil(filtered.length / 10) });
        setLoading(false);
      }, 500);
    } catch (err) {
      setError('Failed to load doctors. Please try again.');
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const badgeStyles = {
      available: styles.badgeAvailable,
      unavailable: styles.badgeUnavailable,
      'on-leave': styles.badgeOnLeave,
    };
    return { ...styles.badge, ...badgeStyles[status] };
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Doctors</h1>
          <p style={styles.subtitle}>Manage your clinic's doctors</p>
        </div>
      </div>

      {/* Filters */}
      <div style={styles.filters}>
        <div style={styles.filterRow}>
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            style={styles.searchInput}
            onFocus={(e) => e.target.style.borderColor = '#667eea'}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
          />
          <select
            value={specialty}
            onChange={(e) => { setSpecialty(e.target.value); setPage(1); }}
            style={styles.select}
          >
            <option value="">All Specialties</option>
            {specialties.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div style={styles.filterChips}>
          <span style={{ fontSize: '13px', color: '#6b7280', marginRight: '8px' }}>Availability:</span>
          {['', 'available', 'unavailable', 'on-leave'].map(status => (
            <button
              key={status}
              style={{
                ...styles.chip,
                ...(availability === status ? styles.chipActive : {}),
              }}
              onClick={() => { setAvailability(status); setPage(1); }}
            >
              {status === '' ? 'All' : status === 'on-leave' ? 'On Leave' : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div style={styles.loadingState}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⏳</div>
          <p>Loading doctors...</p>
        </div>
      ) : error ? (
        <div style={styles.errorState}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
          <p>{error}</p>
          <button onClick={fetchDoctors} style={{ marginTop: '16px', padding: '10px 20px', backgroundColor: '#dc2626', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            Retry
          </button>
        </div>
      ) : doctors.length === 0 ? (
        <div style={styles.emptyState}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
          <p>No doctors found matching your criteria</p>
          <button 
            onClick={() => { setSearch(''); setSpecialty(''); setAvailability(''); }}
            style={{ marginTop: '16px', padding: '10px 20px', backgroundColor: '#667eea', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div style={styles.table}>
          <div style={styles.tableHeader}>
            <div>Doctor</div>
            <div>Specialty</div>
            <div>Experience</div>
            <div>Fee</div>
            <div>Status</div>
            <div>Action</div>
          </div>
          {doctors.map(doctor => (
            <div
              key={doctor.id}
              style={styles.tableRow}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#fff'}
            >
              <div style={styles.doctorInfo}>
                <div style={styles.avatar}>{getInitials(doctor.fullName)}</div>
                <div>
                  <p style={styles.doctorName}>{doctor.fullName}</p>
                  <p style={styles.doctorEmail}>{doctor.email}</p>
                </div>
              </div>
              <div style={{ fontSize: '14px', color: '#374151' }}>{doctor.specialty}</div>
              <div style={{ fontSize: '14px', color: '#374151' }}>{doctor.experienceYears} years</div>
              <div style={{ fontSize: '14px', color: '#374151', fontWeight: '600' }}>${doctor.fee}</div>
              <div>
                <span style={getStatusBadge(doctor.status)}>
                  {doctor.status === 'on-leave' ? 'On Leave' : doctor.status.charAt(0).toUpperCase() + doctor.status.slice(1)}
                </span>
              </div>
              <div>
                <Link to={`/doctors/${doctor.id}`} style={styles.viewBtn}>
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && !error && doctors.length > 0 && (
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

      <HelpDrawer content={helpContent.doctorList} />
    </div>
  );
};

export default DoctorList;
