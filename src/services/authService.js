/**
 * Authentication Service
 * Handles all authentication related API calls
 * 
 * ⚠️ INTERVIEW/TRAINING PROJECT
 * The API integration in this file is intentionally incomplete.
 * Candidates must implement the actual API calls.
 */

import api from './api';

/**
 * Sign up a new user
 * @param {Object} userData - { fullName, email, password }
 * @returns {Promise} API response
 * 
 * API Endpoint: POST /api/auth/signup
 * Request Body: { fullName, email, password, role? }
 * Response: { success, message, data: { user } }
 */
export const signup = async (userData) => {
  // TODO: Implement signup API call
  // 1. Make POST request to /api/auth/signup with userData
  // 2. Return the response data
  // 3. Handle errors appropriately
  
  // Example implementation (uncomment and modify):
  // const response = await api.post('/auth/signup', userData);
  // return response.data;
  
  throw new Error('TODO: Implement signup API integration');
};

/**
 * Login user
 * @param {Object} credentials - { email, password }
 * @returns {Promise} API response with user and token
 * 
 * API Endpoint: POST /api/auth/login
 * Request Body: { email, password }
 * Response: { success, message, data: { user, token } }
 */
export const login = async (credentials) => {
  // TODO: Implement login API call
  // 1. Make POST request to /api/auth/login with credentials
  // 2. Return the response data containing user and token
  // 3. Handle errors appropriately
  
  // Example implementation (uncomment and modify):
  // const response = await api.post('/auth/login', credentials);
  // return response.data;
  
  throw new Error('TODO: Implement login API integration');
};

/**
 * Request password reset
 * @param {string} email - User's email address
 * @returns {Promise} API response with reset token (mock)
 * 
 * API Endpoint: POST /api/auth/forgot-password
 * Request Body: { email }
 * Response: { success, message, data: { resetToken } }
 */
export const forgotPassword = async (email) => {
  // TODO: Implement forgot password API call
  // 1. Make POST request to /api/auth/forgot-password
  // 2. Return the response data
  // 3. Handle errors (e.g., email not found)
  
  // Example implementation (uncomment and modify):
  // const response = await api.post('/auth/forgot-password', { email });
  // return response.data;
  
  throw new Error('TODO: Implement forgot password API integration');
};

/**
 * Reset password with token
 * @param {Object} data - { token, newPassword }
 * @returns {Promise} API response
 * 
 * API Endpoint: POST /api/auth/reset-password
 * Request Body: { token, newPassword }
 * Response: { success, message }
 */
export const resetPassword = async (data) => {
  // TODO: Implement reset password API call
  // 1. Make POST request to /api/auth/reset-password
  // 2. Return the response data
  // 3. Handle errors (e.g., invalid/expired token)
  
  // Example implementation (uncomment and modify):
  // const response = await api.post('/auth/reset-password', data);
  // return response.data;
  
  throw new Error('TODO: Implement reset password API integration');
};

/**
 * Logout user
 * @returns {Promise} API response
 * 
 * API Endpoint: POST /api/auth/logout
 * Response: { success, message }
 */
export const logout = async () => {
  // TODO: Implement logout API call
  // 1. Make POST request to /api/auth/logout
  // 2. Return the response data
  // 3. Clear local storage after successful logout
  
  // Example implementation (uncomment and modify):
  // const response = await api.post('/auth/logout');
  // return response.data;
  
  throw new Error('TODO: Implement logout API integration');
};

export default {
  signup,
  login,
  forgotPassword,
  resetPassword,
  logout
};
