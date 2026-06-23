/**
 * Doctor Service
 * Handles all doctor related API calls
 * 
 * ⚠️ INTERVIEW/TRAINING PROJECT
 * The API integration in this file is intentionally incomplete.
 * Candidates must implement the actual API calls.
 */

import api from './api';

/**
 * Get all doctors with filters and pagination
 * @param {Object} params - Query parameters
 * @param {string} params.search - Search by name or email
 * @param {string} params.specialty - Filter by specialty
 * @param {string} params.availability - Filter by status (available/unavailable/on-leave)
 * @param {number} params.page - Page number (default: 1)
 * @param {number} params.limit - Items per page (default: 10)
 * @param {string} params.sortBy - Sort field (default: fullName)
 * @param {string} params.order - Sort order: asc/desc (default: asc)
 * @returns {Promise} API response with doctors list and pagination
 * 
 * API Endpoint: GET /api/doctors
 * Response: { success, message, data: [...doctors], pagination: {...} }
 */
export const getAllDoctors = async (params = {}) => {
  // TODO: Implement get all doctors API call
  // 1. Make GET request to /api/doctors with query params
  // 2. Return the response data including doctors array and pagination
  // 3. Handle errors appropriately
  
  // Example implementation (uncomment and modify):
  // const response = await api.get('/doctors', { params });
  // return response.data;
  
  throw new Error('TODO: Implement get all doctors API integration');
};

/**
 * Get doctor by ID
 * @param {string} id - Doctor ID
 * @returns {Promise} API response with doctor details
 * 
 * API Endpoint: GET /api/doctors/:id
 * Response: { success, message, data: { doctor } }
 */
export const getDoctorById = async (id) => {
  // TODO: Implement get doctor by ID API call
  // 1. Make GET request to /api/doctors/:id
  // 2. Return the response data with doctor details
  // 3. Handle 404 errors for invalid ID
  
  // Example implementation (uncomment and modify):
  // const response = await api.get(`/doctors/${id}`);
  // return response.data;
  
  throw new Error('TODO: Implement get doctor by ID API integration');
};

/**
 * Get all unique specialties (for filter dropdown)
 * @returns {Promise} API response with specialties list
 * 
 * API Endpoint: GET /api/doctors/specialties
 * Response: { success, message, data: [...specialties] }
 */
export const getSpecialties = async () => {
  // TODO: Implement get specialties API call
  // 1. Make GET request to /api/doctors/specialties
  // 2. Return the response data with specialties array
  
  // Example implementation (uncomment and modify):
  // const response = await api.get('/doctors/specialties');
  // return response.data;
  
  throw new Error('TODO: Implement get specialties API integration');
};

export default {
  getAllDoctors,
  getDoctorById,
  getSpecialties
};
