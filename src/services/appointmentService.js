/**
 * Appointment Service
 * Handles all appointment related API calls
 * 
 * ⚠️ INTERVIEW/TRAINING PROJECT
 * The API integration in this file is intentionally incomplete.
 * Candidates must implement the actual API calls.
 */

import api from './api';

/**
 * Get all appointments with filters and pagination
 * @param {Object} params - Query parameters
 * @param {string} params.search - Search by doctor or patient name
 * @param {string} params.doctorId - Filter by doctor ID
 * @param {string} params.patientId - Filter by patient ID
 * @param {string} params.status - Filter by status (scheduled/completed/cancelled/no-show)
 * @param {string} params.date - Filter by date (YYYY-MM-DD)
 * @param {number} params.page - Page number (default: 1)
 * @param {number} params.limit - Items per page (default: 10)
 * @param {string} params.sortBy - Sort field (default: appointmentDate)
 * @param {string} params.order - Sort order: asc/desc (default: desc)
 * @returns {Promise} API response with appointments list and pagination
 * 
 * API Endpoint: GET /api/appointments
 * Response: { success, message, data: [...appointments], pagination: {...} }
 */
export const getAllAppointments = async (params = {}) => {
  // TODO: Implement get all appointments API call
  // 1. Make GET request to /api/appointments with query params
  // 2. Return the response data including appointments array and pagination
  // 3. Handle errors appropriately
  
  // Example implementation (uncomment and modify):
  // const response = await api.get('/appointments', { params });
  // return response.data;
  
  throw new Error('TODO: Implement get all appointments API integration');
};

/**
 * Get appointment by ID
 * @param {string} id - Appointment ID
 * @returns {Promise} API response with appointment details
 * 
 * API Endpoint: GET /api/appointments/:id
 * Response: { success, message, data: { appointment } }
 */
export const getAppointmentById = async (id) => {
  // TODO: Implement get appointment by ID API call
  // 1. Make GET request to /api/appointments/:id
  // 2. Return the response data with appointment details
  // 3. Handle 404 errors for invalid ID
  
  // Example implementation (uncomment and modify):
  // const response = await api.get(`/appointments/${id}`);
  // return response.data;
  
  throw new Error('TODO: Implement get appointment by ID API integration');
};

/**
 * Create a new appointment
 * @param {Object} appointmentData - Appointment data
 * @param {string} appointmentData.doctorId - Doctor ID (required)
 * @param {string} appointmentData.patientId - Patient ID (required)
 * @param {string} appointmentData.appointmentDate - Date in YYYY-MM-DD format (required)
 * @param {string} appointmentData.appointmentTime - Time in HH:MM format (required)
 * @param {string} appointmentData.type - Type: consultation/follow-up/checkup (required)
 * @param {string} appointmentData.notes - Optional notes
 * @returns {Promise} API response with created appointment
 * 
 * API Endpoint: POST /api/appointments
 * Response: { success, message, data: { appointment } }
 */
export const createAppointment = async (appointmentData) => {
  // TODO: Implement create appointment API call
  // 1. Make POST request to /api/appointments with appointment data
  // 2. Return the response data with created appointment
  // 3. Handle validation errors (missing fields)
  // 4. Handle 404 errors (doctor/patient not found)
  // 5. Handle 409 conflict errors (slot already booked)
  
  // Example implementation (uncomment and modify):
  // const response = await api.post('/appointments', appointmentData);
  // return response.data;
  
  throw new Error('TODO: Implement create appointment API integration');
};

/**
 * Update an appointment
 * @param {string} id - Appointment ID
 * @param {Object} updateData - Data to update
 * @param {string} updateData.appointmentDate - New date (optional)
 * @param {string} updateData.appointmentTime - New time (optional)
 * @param {string} updateData.type - New type (optional)
 * @param {string} updateData.notes - New notes (optional)
 * @returns {Promise} API response with updated appointment
 * 
 * API Endpoint: PUT /api/appointments/:id
 * Response: { success, message, data: { appointment } }
 */
export const updateAppointment = async (id, updateData) => {
  // TODO: Implement update appointment API call
  // 1. Make PUT request to /api/appointments/:id with update data
  // 2. Return the response data with updated appointment
  // 3. Handle 404 errors for invalid ID
  // 4. Handle 409 conflict errors (new slot already booked)
  
  // Example implementation (uncomment and modify):
  // const response = await api.put(`/appointments/${id}`, updateData);
  // return response.data;
  
  throw new Error('TODO: Implement update appointment API integration');
};

/**
 * Update appointment status
 * @param {string} id - Appointment ID
 * @param {string} status - New status: scheduled/completed/cancelled/no-show
 * @returns {Promise} API response with updated appointment
 * 
 * API Endpoint: PATCH /api/appointments/:id/status
 * Request Body: { status }
 * Response: { success, message, data: { appointment } }
 */
export const updateAppointmentStatus = async (id, status) => {
  // TODO: Implement update appointment status API call
  // 1. Make PATCH request to /api/appointments/:id/status with status
  // 2. Return the response data with updated appointment
  // 3. Handle 400 errors for invalid status
  // 4. Handle 404 errors for invalid ID
  
  // Example implementation (uncomment and modify):
  // const response = await api.patch(`/appointments/${id}/status`, { status });
  // return response.data;
  
  throw new Error('TODO: Implement update appointment status API integration');
};

/**
 * Delete an appointment
 * @param {string} id - Appointment ID
 * @returns {Promise} API response
 * 
 * API Endpoint: DELETE /api/appointments/:id
 * Response: { success, message }
 */
export const deleteAppointment = async (id) => {
  // TODO: Implement delete appointment API call
  // 1. Make DELETE request to /api/appointments/:id
  // 2. Return the response data
  // 3. Handle 404 errors for invalid ID
  
  // Example implementation (uncomment and modify):
  // const response = await api.delete(`/appointments/${id}`);
  // return response.data;
  
  throw new Error('TODO: Implement delete appointment API integration');
};

export default {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  updateAppointmentStatus,
  deleteAppointment
};
