/**
 * Patient Service
 * Handles all patient related API calls
 * 
 * ⚠️ INTERVIEW/TRAINING PROJECT
 * The API integration in this file is intentionally incomplete.
 * Candidates must implement the actual API calls.
 */

import api from './api';

/**
 * Get all patients with filters and pagination
 * @param {Object} params - Query parameters
 * @param {string} params.search - Search by name, email, or phone
 * @param {string} params.gender - Filter by gender (male/female)
 * @param {string} params.status - Filter by status (active/inactive)
 * @param {number} params.page - Page number (default: 1)
 * @param {number} params.limit - Items per page (default: 10)
 * @param {string} params.sortBy - Sort field (default: fullName)
 * @param {string} params.order - Sort order: asc/desc (default: asc)
 * @returns {Promise} API response with patients list and pagination
 * 
 * API Endpoint: GET /api/patients
 * Response: { success, message, data: [...patients], pagination: {...} }
 */
export const getAllPatients = async (params = {}) => {
  // TODO: Implement get all patients API call
  // 1. Make GET request to /api/patients with query params
  // 2. Return the response data including patients array and pagination
  // 3. Handle errors appropriately
  
  // Example implementation (uncomment and modify):
  // const response = await api.get('/patients', { params });
  // return response.data;
  
  throw new Error('TODO: Implement get all patients API integration');
};

/**
 * Get patient by ID
 * @param {string} id - Patient ID
 * @returns {Promise} API response with patient details
 * 
 * API Endpoint: GET /api/patients/:id
 * Response: { success, message, data: { patient } }
 */
export const getPatientById = async (id) => {
  // TODO: Implement get patient by ID API call
  // 1. Make GET request to /api/patients/:id
  // 2. Return the response data with patient details
  // 3. Handle 404 errors for invalid ID
  
  // Example implementation (uncomment and modify):
  // const response = await api.get(`/patients/${id}`);
  // return response.data;
  
  throw new Error('TODO: Implement get patient by ID API integration');
};

export default {
  getAllPatients,
  getPatientById
};
