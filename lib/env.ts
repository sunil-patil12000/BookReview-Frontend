/**
 * Environment configuration utility for the frontend
 * Access backend URLs and other environment variables safely
 */

// API URL with fallback
export const API_URL = 
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Base backend URL with fallback
export const BACKEND_URL = 
  process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

// Environment (development, production, etc)
export const ENV = 
  process.env.NEXT_PUBLIC_ENV || 'development';

// Check if we're in production
export const isProd = ENV === 'production';

// Check if we're in development
export const isDev = ENV === 'development';

/**
 * Get the full API URL for a specific endpoint
 * @param {string} endpoint - The API endpoint (without leading slash)
 * @returns {string} The complete API URL
 */
export const getApiUrl = (endpoint: string): string => {
  const formattedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${API_URL}${formattedEndpoint}`;
};

/**
 * Get URL for static assets from backend
 * @param {string} path - The asset path (without leading slash)
 * @returns {string} The complete asset URL
 */
export const getAssetUrl = (path: string): string => {
  const formattedPath = path.startsWith('/') ? path : `/${path}`;
  return `${BACKEND_URL}${formattedPath}`;
};
