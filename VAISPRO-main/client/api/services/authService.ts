import apiService from '../client';
import { AUTH_ENDPOINTS } from '../endpoints';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  status: number;
  message: string;
  data: {
    user: any;
    token: string;
    refresh_token?: string;
    is_active: boolean;
  };
}

export interface RegisterRequest {
  first_name: string;
  last_name: string;
  email: string;
  company: string;
  designation: string;
  password: string;
  re_password: string;
}

export interface RegisterResponse {
  status: number;
  message: string;
  data: {
    user_id: string;
  };
}

export const authService = {
  // Login user
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await apiService.post<LoginResponse>(AUTH_ENDPOINTS.LOGIN, data);
    return response.data;
  },

  // Register user
  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    const response = await apiService.post<RegisterResponse>(AUTH_ENDPOINTS.REGISTER, data);
    return response.data;
  },

  // Logout user
  logout: async (): Promise<void> => {
    await apiService.post(AUTH_ENDPOINTS.LOGOUT);
  },

  // Verify email
  verifyEmail: async (data: { email: string }): Promise<any> => {
    const response = await apiService.post(AUTH_ENDPOINTS.VERIFY_EMAIL, data);
    return response.data;
  },

  // Verify email OTP
  verifyEmailOTP: async (data: { email: string; otp: string }): Promise<any> => {
    const response = await apiService.post(AUTH_ENDPOINTS.VERIFY_EMAIL_OTP, data);
    return response.data;
  },

  // Verify phone OTP
  verifyPhoneOTP: async (data: { phone_number: string; otp: string }): Promise<any> => {
    const response = await apiService.post(AUTH_ENDPOINTS.VERIFY_PHONE_OTP, data);
    return response.data;
  },

  // Send password reset OTP
  sendPasswordResetOTP: async (data: { email: string }): Promise<any> => {
    const response = await apiService.post(AUTH_ENDPOINTS.FORGOT_PASSWORD, data);
    return response.data;
  },

  // Reset password
  resetPassword: async (data: { uid: string; token: string; password: string }): Promise<any> => {
    const response = await apiService.patch(`${AUTH_ENDPOINTS.RESET_PASSWORD}/${data.uid}/${data.token}/`, {
      password: data.password,
    });
    return response.data;
  },

  // Change password
  changePassword: async (data: { old_password: string; new_password: string }): Promise<any> => {
    const response = await apiService.post(`${AUTH_ENDPOINTS.CHANGE_PASSWORD}/`, data);
    return response.data;
  },

  // Resend email OTP
  resendEmailOTP: async (data: { email: string }): Promise<any> => {
    const response = await apiService.post(AUTH_ENDPOINTS.RESEND_OTP_EMAIL, data);
    return response.data;
  },

  // Resend phone OTP
  resendPhoneOTP: async (data: { phone_number: string }): Promise<any> => {
    const response = await apiService.post(AUTH_ENDPOINTS.RESEND_OTP_PHONE, data);
    return response.data;
  },

  // LinkedIn login
  linkedinLogin: async (code: string): Promise<LoginResponse> => {
    const response = await apiService.post<LoginResponse>(AUTH_ENDPOINTS.LINKEDIN_LOGIN, { code });
    return response.data;
  },
};

export default authService;
