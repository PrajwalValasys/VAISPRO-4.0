// API Configuration
export const API_CONFIG = {
  development: {
    baseURL: import.meta.env.VITE_LOCAL_BACKEND_URL || 'http://localhost:3001',
    frontendURL: import.meta.env.VITE_LOCAL_URL || 'http://localhost:8080',
  },
  staging: {
    baseURL: import.meta.env.VITE_STAGING_BACKEND_URL || 'https://staging-api.vais.com',
    frontendURL: import.meta.env.VITE_STAGING_URL || 'https://staging.vais.com',
  },
  production: {
    baseURL: import.meta.env.VITE_PROD_BACKEND_URL || 'https://api.vais.com',
    frontendURL: import.meta.env.VITE_PROD_URL || 'https://vais.com',
  },
};

// Get current environment
export const BUILD_ENV = parseInt(import.meta.env.VITE_BUILD_ENV || '0');

// Environment names
export const ENVIRONMENTS = {
  0: 'development',
  1: 'staging', 
  2: 'production',
} as const;

// Get current environment config
export const getCurrentEnvironment = () => {
  const envName = ENVIRONMENTS[BUILD_ENV as keyof typeof ENVIRONMENTS] || 'development';
  return API_CONFIG[envName as keyof typeof API_CONFIG];
};

// Export URLs for backward compatibility
export const { baseURL: hostBackURl, frontendURL: hostURl } = getCurrentEnvironment();

// API endpoints base
export const BASE_URL = hostBackURl;

// Request timeout (30 seconds)
export const REQUEST_TIMEOUT = 30000;

// API version
export const API_VERSION = 'v1';

// API rate limiting
export const RATE_LIMIT = {
  maxRequests: 100,
  windowMs: 60000, // 1 minute
};
