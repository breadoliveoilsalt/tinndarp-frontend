import axiosWrapper from '../axiosWrapper';

// Use environment variable with fallback to localhost for backwards compatibility
export const baseURL =
  process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api';
export const fetchWrapper = axiosWrapper;
