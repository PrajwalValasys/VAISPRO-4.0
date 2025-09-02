// Import environment configuration
// Copy env.example.js to env.js and configure your environment variables
import { ENV_CONFIG, getEnvironmentUrls, getApiConfig } from './env.example';

// Fallback to process.env if env.js is not available
const getEnvVar = (key, fallback = null) => {
  try {
    // Try to get from ENV_CONFIG first, then process.env
    const configKey = key.replace('REACT_APP_', '');
    return ENV_CONFIG[configKey] || process.env[key] || fallback;
  } catch (error) {
    console.warn(`Environment variable ${key} not found, using fallback:`, fallback);
    return process.env[key] || fallback;
  }
};

// Environment configuration with fallbacks
export const URL = {
  "development": {
    "http": getEnvVar('REACT_APP_LOCAL_BACKEND_URL', 'http://localhost:5000')
  },
  "staging": {
    "http": getEnvVar('REACT_APP_STAGING_BACKEND_URL', 'https://staging-api.valasys.ai')
  },
  "prod": {
    "http": getEnvVar('REACT_APP_PROD_BACKEND_URL', 'https://api.valasys.ai')
  }
};

export const HOSTURL = {
  "development": {
    "http": getEnvVar('REACT_APP_LOCAL_URL', 'http://localhost:3000')
  },
  "staging": {
    "http": getEnvVar('REACT_APP_STAGING_URL', 'https://staging.valasys.ai')
  },
  "prod": {
    "http": getEnvVar('REACT_APP_PROD_URL', 'https://valasys.ai')
  }
};

// Get build environment with fallback
export const BUILD_ENV = parseInt(
  getEnvVar('REACT_APP_BUILD_ENV', '0')
);

// Environment mapping
const ENVIRONMENT_MAP = {
  0: 'development',
  1: 'staging',
  2: 'prod'
};

// Get current environment
export const CURRENT_ENVIRONMENT = ENVIRONMENT_MAP[BUILD_ENV] || 'development';

// Base URLs mapping
const baseUrls = {
  0: HOSTURL.development.http,
  1: HOSTURL.staging.http,
  2: HOSTURL.prod.http,
};

const baseBackendUrls = {
  0: URL.development.http,
  1: URL.staging.http,
  2: URL.prod.http,
};

// Export current URLs
export const hostURl = baseUrls[BUILD_ENV] || baseUrls[0];
export const hostBackURl = baseBackendUrls[BUILD_ENV] || baseBackendUrls[0];

// Enhanced API configuration
export const API_CONFIG = {
  baseURL: hostBackURl,
  timeout: parseInt(getEnvVar('REACT_APP_API_TIMEOUT', '30000')),
  retryAttempts: parseInt(getEnvVar('REACT_APP_API_RETRY_ATTEMPTS', '3')),
  retryDelay: parseInt(getEnvVar('REACT_APP_API_RETRY_DELAY', '1000')),
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-API-Version': getEnvVar('REACT_APP_API_VERSION', 'v1'),
    'X-Client-Version': getEnvVar('REACT_APP_VERSION', '1.0.0')
  }
};

// Security configuration
export const SECURITY_CONFIG = {
  enableCSP: getEnvVar('REACT_APP_ENABLE_CSP', 'true') === 'true',
  secureCookies: getEnvVar('REACT_APP_SECURE_COOKIES', 'true') === 'true',
  sameSiteCookies: getEnvVar('REACT_APP_SAME_SITE_COOKIES', 'strict'),
  sessionTimeout: parseInt(getEnvVar('REACT_APP_SESSION_TIMEOUT', '3600000')),
  tokenStorageKey: getEnvVar('REACT_APP_TOKEN_STORAGE_KEY', 'valasys_auth_token'),
  refreshTokenStorageKey: getEnvVar('REACT_APP_REFRESH_TOKEN_STORAGE_KEY', 'valasys_refresh_token')
};

// Feature flags
export const FEATURE_FLAGS = {
  enableAnalytics: getEnvVar('REACT_APP_ENABLE_ANALYTICS', 'true') === 'true',
  enableChatSupport: getEnvVar('REACT_APP_ENABLE_CHAT_SUPPORT', 'true') === 'true',
  enableNotifications: getEnvVar('REACT_APP_ENABLE_NOTIFICATIONS', 'true') === 'true',
  enableDarkMode: getEnvVar('REACT_APP_ENABLE_DARK_MODE', 'false') === 'true',
  enablePWA: getEnvVar('REACT_APP_ENABLE_PWA', 'false') === 'true',
  enableOfflineMode: getEnvVar('REACT_APP_ENABLE_OFFLINE_MODE', 'true') === 'true',
  enableBetaFeatures: getEnvVar('REACT_APP_ENABLE_BETA_FEATURES', 'false') === 'true'
};

// External service configurations
export const EXTERNAL_SERVICES = {
  google: {
    analyticsId: getEnvVar('REACT_APP_GOOGLE_ANALYTICS_ID'),
    mapsApiKey: getEnvVar('REACT_APP_GOOGLE_MAPS_API_KEY'),
    tagManagerId: getEnvVar('REACT_APP_GOOGLE_TAG_MANAGER_ID')
  },
  recaptcha: {
    siteKey: getEnvVar('REACT_APP_RECAPTCHA_SITE_KEY', '6Ld7dygpAAAAACiHzxJ9F5TTdAJl25uxmqHK0IjZ')
  },
  stripe: {
    publishableKey: getEnvVar('REACT_APP_STRIPE_PUBLISHABLE_KEY')
  },
  socialAuth: {
    linkedinClientId: getEnvVar('REACT_APP_LINKEDIN_CLIENT_ID'),
    googleClientId: getEnvVar('REACT_APP_GOOGLE_CLIENT_ID'),
    facebookAppId: getEnvVar('REACT_APP_FACEBOOK_APP_ID')
  }
};

// Application-specific configurations
export const APP_CONFIG = {
  company: {
    name: getEnvVar('REACT_APP_COMPANY_NAME', 'Valasys AI'),
    email: getEnvVar('REACT_APP_COMPANY_EMAIL', 'info@valasys.ai'),
    supportEmail: getEnvVar('REACT_APP_SUPPORT_EMAIL', 'support@valasys.ai'),
    salesEmail: getEnvVar('REACT_APP_SALES_EMAIL', 'sales@valasys.ai')
  },
  pagination: {
    defaultPageSize: parseInt(getEnvVar('REACT_APP_DEFAULT_PAGE_SIZE', '20')),
    maxPageSize: parseInt(getEnvVar('REACT_APP_MAX_PAGE_SIZE', '100'))
  },
  files: {
    maxFileSize: parseInt(getEnvVar('REACT_APP_MAX_FILE_SIZE', '10485760')), // 10MB
    allowedFileTypes: getEnvVar('REACT_APP_ALLOWED_FILE_TYPES', '.csv,.xlsx,.xls,.pdf,.doc,.docx').split(',')
  },
  cache: {
    duration: parseInt(getEnvVar('REACT_APP_CACHE_DURATION', '300000')), // 5 minutes
    enabled: getEnvVar('REACT_APP_ENABLE_CACHE', 'true') === 'true'
  }
};

// Debug configuration
export const DEBUG_CONFIG = {
  debugMode: getEnvVar('REACT_APP_DEBUG_MODE', 'false') === 'true',
  logLevel: getEnvVar('REACT_APP_LOG_LEVEL', 'info'),
  enableReduxDevTools: getEnvVar('REACT_APP_ENABLE_REDUX_DEVTOOLS', 'true') === 'true',
  enableReactDevTools: getEnvVar('REACT_APP_ENABLE_REACT_DEVTOOLS', 'true') === 'true',
  enablePerformanceMonitoring: getEnvVar('REACT_APP_ENABLE_PERFORMANCE_MONITORING', 'true') === 'true'
};

// Monitoring and analytics
export const MONITORING_CONFIG = {
  sentry: {
    dsn: getEnvVar('REACT_APP_SENTRY_DSN'),
    enabled: getEnvVar('REACT_APP_ENABLE_ERROR_REPORTING', 'false') === 'true'
  },
  analytics: {
    mixpanelToken: getEnvVar('REACT_APP_MIXPANEL_TOKEN'),
    amplitudeApiKey: getEnvVar('REACT_APP_AMPLITUDE_API_KEY'),
    hotjarId: getEnvVar('REACT_APP_HOTJAR_ID')
  }
};

// Utility functions
export const isProduction = () => BUILD_ENV === 2;
export const isStaging = () => BUILD_ENV === 1;
export const isDevelopment = () => BUILD_ENV === 0;

export const getApiBaseUrl = () => hostBackURl;
export const getFrontendBaseUrl = () => hostURl;

export const isFeatureEnabled = (featureName) => {
  return FEATURE_FLAGS[featureName] || false;
};

// Environment validation
export const validateEnvironment = () => {
  const required = [
    'REACT_APP_BUILD_ENV'
  ];

  const missing = required.filter(key => !getEnvVar(key));
  
  if (missing.length > 0) {
    console.warn('Missing required environment variables:', missing);
  }

  // Validate URLs
  try {
    new URL(hostBackURl);
    new URL(hostURl);
  } catch (error) {
    console.error('Invalid URL configuration:', error);
  }

  return missing.length === 0;
};

// Log configuration in development
if (isDevelopment() && DEBUG_CONFIG.debugMode) {
  console.group('🔧 Environment Configuration');
  console.log('Environment:', CURRENT_ENVIRONMENT);
  console.log('Frontend URL:', hostURl);
  console.log('Backend URL:', hostBackURl);
  console.log('Feature Flags:', FEATURE_FLAGS);
  console.log('API Config:', API_CONFIG);
  console.groupEnd();
}

// Validate environment on load
validateEnvironment();

// Export everything for backward compatibility
export default {
  URL,
  HOSTURL,
  BUILD_ENV,
  CURRENT_ENVIRONMENT,
  hostURl,
  hostBackURl,
  API_CONFIG,
  SECURITY_CONFIG,
  FEATURE_FLAGS,
  EXTERNAL_SERVICES,
  APP_CONFIG,
  DEBUG_CONFIG,
  MONITORING_CONFIG,
  isProduction,
  isStaging,
  isDevelopment,
  getApiBaseUrl,
  getFrontendBaseUrl,
  isFeatureEnabled,
  validateEnvironment
};
