// API Configuration for VAIS Application
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// Environment configuration
const getEnvVar = (key: string, fallback: string = ''): string => {
  return (process.env as any)[key] || fallback;
};

// Environment mapping
const BUILD_ENV = parseInt(getEnvVar('REACT_APP_BUILD_ENV', '0'));

const baseUrls = {
  0: getEnvVar('REACT_APP_LOCAL_BACKEND_URL', 'http://localhost:8000'),
  1: getEnvVar('REACT_APP_STAGING_BACKEND_URL', 'https://staging-api.valasys.ai'),
  2: getEnvVar('REACT_APP_PROD_BACKEND_URL', 'https://api.valasys.ai'),
};

export const API_BASE_URL = baseUrls[BUILD_ENV as keyof typeof baseUrls] || baseUrls[0];

// API Configuration
export const API_CONFIG = {
  baseURL: API_BASE_URL,
  timeout: parseInt(getEnvVar('REACT_APP_API_TIMEOUT', '30000')),
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-API-Version': getEnvVar('REACT_APP_API_VERSION', 'v1'),
  }
};

// Create axios instance
export const apiClient: AxiosInstance = axios.create(API_CONFIG);

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem('valasys_auth_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 errors (token expired)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // Try to refresh token
      const refreshToken = localStorage.getItem('valasys_refresh_token');
      if (refreshToken) {
        try {
          const response = await axios.post(`${API_BASE_URL}/token/refresh/`, {
            refresh: refreshToken
          });
          
          const newToken = response.data.access;
          localStorage.setItem('valasys_auth_token', newToken);
          
          // Retry the original request with new token
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axios(originalRequest);
        } catch (refreshError) {
          // Refresh failed, redirect to login
          localStorage.removeItem('valasys_auth_token');
          localStorage.removeItem('valasys_refresh_token');
          window.location.href = '/login';
        }
      } else {
        // No refresh token, redirect to login
        localStorage.removeItem('valasys_auth_token');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

// API response types
export interface ApiResponse<T = any> {
  status: number;
  message: string;
  data?: T;
  error?: string;
}

// API endpoints
export const API_ENDPOINTS = {
  // Authentication endpoints
  AUTH: {
    LOGIN: '/login/',
    REGISTER: '/register',
    LOGOUT: '/logout/',
    REFRESH_TOKEN: '/token/refresh/',
    VERIFY_EMAIL: '/verify_email/',
    VERIFY_EMAIL_OTP: '/validate-email-otp/',
    VERIFY_PHONE_OTP: '/validate-phone-otp/',
    PASSWORD_RESET_OTP_SENDER: '/password-reset-otp-sender/',
    RESET_PASSWORD: '/password-reset',
    FORGOT_PASSWORD_VERIFY_OTP: '/password-reset/',
    CHANGE_PASSWORD: '/change_password',
    RESEND_OTP_EMAIL: '/resend-otp-email/',
    RESEND_OTP_PHONE: '/resend-otp-phone/',
    LINKEDIN_LOGIN: '/user-accounts/linkedin/'
  },
  
  // User management endpoints
  USER: {
    DETAILS: '/get_profile',
    UPDATE: '/update_profile/',
    STATUS: '/get_user_status',
  }
};

// Utility functions
export const isProduction = (): boolean => BUILD_ENV === 2;
export const isStaging = (): boolean => BUILD_ENV === 1;
export const isDevelopment = (): boolean => BUILD_ENV === 0;

export default apiClient;
