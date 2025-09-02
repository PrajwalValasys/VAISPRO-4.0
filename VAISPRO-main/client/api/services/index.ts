// Export all API services
export { default as authService } from './authService';
export { default as userService } from './userService';

// Export types
export type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from './authService';
export type { UserProfile, UpdateProfileRequest } from './userService';

// Re-export API client for direct access
export { default as apiService, apiClient } from '../client';

// Re-export endpoints
export { API_ENDPOINTS } from '../endpoints';

// Re-export config
export { getCurrentEnvironment, BASE_URL, hostBackURl, hostURl } from '../config';
