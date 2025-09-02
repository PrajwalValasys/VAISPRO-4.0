// ===================================================================
// VALASYS AI - ENVIRONMENT CONFIGURATION TEMPLATE
// ===================================================================
// Copy this file to env.js and update values as needed
// Import this in your http.js file: import { ENV_CONFIG } from './env';

export const ENV_CONFIG = {
  // ===================================================================
  // APPLICATION ENVIRONMENT
  // ===================================================================
  BUILD_ENV: 0, // 0 = development, 1 = staging, 2 = production
  NODE_ENV: 'development',
  VERSION: '1.0.0',
  BUILD_DATE: '2024-01-01',

  // ===================================================================
  // APPLICATION URLs
  // ===================================================================
  URLS: {
    development: {
      frontend: 'http://localhost:3000',
      backend: 'http://localhost:5000'
    },
    staging: {
      frontend: 'https://staging.valasys.ai',
      backend: 'https://staging-api.valasys.ai'
    },
    production: {
      frontend: 'https://valasys.ai',
      backend: 'https://api.valasys.ai'
    }
  },

  // CDN and Asset URLs
  CDN_URL: 'https://cdn.valasys.ai',
  STATIC_ASSETS_URL: 'https://assets.valasys.ai',

  // ===================================================================
  // API CONFIGURATION
  // ===================================================================
  API: {
    TIMEOUT: 30000,
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 1000,
    BASE_PATH: '/api/v1',
    RATE_LIMIT: 100,
    RATE_LIMIT_WINDOW: 60000
  },

  // ===================================================================
  // AUTHENTICATION & SECURITY
  // ===================================================================
  AUTH: {
    JWT_SECRET: 'your-jwt-secret-key-here-change-in-production',
    SESSION_TIMEOUT: 3600000, // 1 hour
    REFRESH_TOKEN_EXPIRY: 604800000, // 7 days
    TOKEN_STORAGE_KEY: 'valasys_auth_token',
    REFRESH_TOKEN_STORAGE_KEY: 'valasys_refresh_token',
    
    // Security settings
    ENABLE_CSP: true,
    SECURE_COOKIES: true,
    SAME_SITE_COOKIES: 'strict',

    // Password requirements
    MIN_PASSWORD_LENGTH: 8,
    REQUIRE_UPPERCASE: true,
    REQUIRE_LOWERCASE: true,
    REQUIRE_NUMBERS: true,
    REQUIRE_SYMBOLS: true
  },

  // ===================================================================
  // EXTERNAL SERVICES & INTEGRATIONS
  // ===================================================================
  GOOGLE: {
    ANALYTICS_ID: 'GA-XXXXXXXX-X',
    MAPS_API_KEY: 'your-google-maps-api-key',
    TAG_MANAGER_ID: 'GTM-XXXXXXX',
    CLIENT_ID: 'your-google-client-id'
  },

  RECAPTCHA: {
    SITE_KEY: '6Ld7dygpAAAAACiHzxJ9F5TTdAJl25uxmqHK0IjZ',
    SECRET_KEY: 'your-recaptcha-secret-key'
  },

  STRIPE: {
    PUBLISHABLE_KEY: 'pk_test_xxxxxxxxxxxxxxxxxxxxxxxx'
  },

  SOCIAL_AUTH: {
    LINKEDIN_CLIENT_ID: 'your-linkedin-client-id',
    LINKEDIN_CLIENT_SECRET: 'your-linkedin-client-secret',
    FACEBOOK_APP_ID: 'your-facebook-app-id'
  },

  EMAIL_SERVICES: {
    SENDGRID_API_KEY: 'your-sendgrid-api-key',
    MAILGUN_API_KEY: 'your-mailgun-api-key'
  },

  // ===================================================================
  // THIRD-PARTY INTEGRATIONS
  // ===================================================================
  CRM: {
    HUBSPOT_API_KEY: 'your-hubspot-api-key',
    SALESFORCE_CLIENT_ID: 'your-salesforce-client-id',
    PIPEDRIVE_API_KEY: 'your-pipedrive-api-key'
  },

  MARKETING: {
    ZAPIER_WEBHOOK_URL: 'your-zapier-webhook-url',
    MARKETO_CLIENT_ID: 'your-marketo-client-id'
  },

  COMMUNICATION: {
    PUSHER_APP_KEY: 'your-pusher-app-key',
    PUSHER_CLUSTER: 'us2',
    TWILIO_ACCOUNT_SID: 'your-twilio-account-sid',
    SLACK_WEBHOOK_URL: 'your-slack-webhook-url'
  },

  // ===================================================================
  // FEATURE FLAGS & TOGGLES
  // ===================================================================
  FEATURES: {
    ENABLE_ANALYTICS: true,
    ENABLE_CHAT_SUPPORT: true,
    ENABLE_NOTIFICATIONS: true,
    ENABLE_DARK_MODE: false,
    ENABLE_PWA: false,
    ENABLE_SERVICE_WORKER: false,
    ENABLE_OFFLINE_MODE: true,
    ENABLE_BETA_FEATURES: false,
    ENABLE_A_B_TESTING: false,
    ENABLE_REAL_TIME_SYNC: true,
    ENABLE_COLLABORATIVE_EDITING: false,
    ENABLE_VOICE_COMMANDS: false,
    ENABLE_MOBILE_APP_DEEP_LINKS: false
  },

  // ===================================================================
  // FILE UPLOAD & STORAGE
  // ===================================================================
  FILES: {
    MAX_FILE_SIZE: 10485760, // 10MB
    ALLOWED_FILE_TYPES: ['.csv', '.xlsx', '.xls', '.pdf', '.doc', '.docx', '.png', '.jpg', '.jpeg'],
    UPLOAD_CHUNK_SIZE: 1048576, // 1MB
    MAX_CONCURRENT_UPLOADS: 3
  },

  CLOUD_STORAGE: {
    AWS_BUCKET_NAME: 'your-aws-bucket',
    AWS_REGION: 'us-east-1',
    CLOUDINARY_CLOUD_NAME: 'your-cloudinary-cloud-name'
  },

  // ===================================================================
  // PAGINATION & PERFORMANCE
  // ===================================================================
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 20,
    MAX_PAGE_SIZE: 100,
    VIRTUAL_SCROLL_THRESHOLD: 1000,
    INFINITE_SCROLL_THRESHOLD: 10
  },

  CACHE: {
    DURATION: 300000, // 5 minutes
    ENABLE_CACHE: true,
    MAX_SIZE: 50
  },

  // ===================================================================
  // DEBUGGING & DEVELOPMENT
  // ===================================================================
  DEBUG: {
    DEBUG_MODE: false,
    LOG_LEVEL: 'info',
    ENABLE_REDUX_DEVTOOLS: true,
    ENABLE_REACT_DEVTOOLS: true,
    ENABLE_PERFORMANCE_MONITORING: true,
    GENERATE_SOURCEMAP: true,
    ENABLE_SOURCE_MAPS: true
  },

  // ===================================================================
  // MONITORING & ANALYTICS
  // ===================================================================
  MONITORING: {
    SENTRY_DSN: 'your-sentry-dsn-here',
    ENABLE_ERROR_REPORTING: false,
    ERROR_BOUNDARY_FALLBACK: true,
    NEW_RELIC_LICENSE_KEY: 'your-new-relic-license-key',
    DATADOG_APPLICATION_ID: 'your-datadog-app-id'
  },

  USER_ANALYTICS: {
    MIXPANEL_TOKEN: 'your-mixpanel-token',
    AMPLITUDE_API_KEY: 'your-amplitude-api-key',
    HOTJAR_ID: 'your-hotjar-id'
  },

  // ===================================================================
  // LOCALIZATION & INTERNATIONALIZATION
  // ===================================================================
  I18N: {
    DEFAULT_LANGUAGE: 'en',
    SUPPORTED_LANGUAGES: ['en', 'es', 'fr', 'de', 'pt', 'it'],
    ENABLE_RTL: false,
    DATE_FORMAT: 'MM/DD/YYYY',
    TIME_FORMAT: 12,
    CURRENCY: 'USD',
    TIMEZONE: 'America/New_York'
  },

  // ===================================================================
  // COMPANY & CONTACT INFORMATION
  // ===================================================================
  COMPANY: {
    NAME: 'Valasys AI',
    ADDRESS: '123 Business Street, Tech City, TC 12345',
    PHONE: '+1-555-0123',
    EMAIL: 'info@valasys.ai',
    
    CONTACT_EMAILS: {
      SUPPORT: 'support@valasys.ai',
      SALES: 'sales@valasys.ai',
      PRIVACY: 'privacy@valasys.ai',
      SECURITY: 'security@valasys.ai'
    }
  },

  // ===================================================================
  // SOCIAL MEDIA & EXTERNAL LINKS
  // ===================================================================
  SOCIAL_LINKS: {
    LINKEDIN: 'https://linkedin.com/company/valasys',
    TWITTER: 'https://twitter.com/valasys',
    FACEBOOK: 'https://facebook.com/valasys',
    YOUTUBE: 'https://youtube.com/c/valasys',
    GITHUB: 'https://github.com/valasys'
  },

  DOCUMENTATION: {
    DOCS_URL: 'https://docs.valasys.ai',
    API_DOCS_URL: 'https://api-docs.valasys.ai',
    HELP_CENTER_URL: 'https://help.valasys.ai',
    COMMUNITY_URL: 'https://community.valasys.ai'
  },

  // ===================================================================
  // WEBSOCKET & REAL-TIME FEATURES
  // ===================================================================
  WEBSOCKET: {
    URL: 'wss://ws.valasys.ai',
    RECONNECT_INTERVAL: 5000,
    MAX_RECONNECT_ATTEMPTS: 5,
    ENABLE_WEBSOCKET: true
  },

  SSE: {
    URL: 'https://events.valasys.ai',
    ENABLE_SSE: true
  },

  // ===================================================================
  // MOBILE & PWA CONFIGURATION
  // ===================================================================
  PWA: {
    THEME_COLOR: '#1A73E8',
    BACKGROUND_COLOR: '#FFFFFF',
    DISPLAY: 'standalone',
    ORIENTATION: 'portrait'
  },

  MOBILE: {
    APP_SCHEME: 'valasysai',
    IOS_APP_ID: '123456789',
    ANDROID_PACKAGE_NAME: 'ai.valasys.app'
  },

  // ===================================================================
  // CONTENT SECURITY & COMPLIANCE
  // ===================================================================
  COMPLIANCE: {
    ENABLE_GDPR: true,
    ENABLE_CCPA: true,
    COOKIE_CONSENT_REQUIRED: true,
    DATA_RETENTION_DAYS: 365,
    CSP_REPORT_URI: 'https://valasys.report-uri.com/r/d/csp/enforce'
  },

  // ===================================================================
  // CUSTOM APPLICATION SETTINGS
  // ===================================================================
  APPLICATION: {
    ICP: {
      DEFAULT_THRESHOLD: 70,
      MAX_RESULTS: 1000,
      CACHE_DURATION: 1800000 // 30 minutes
    },

    PROSPECTS: {
      BATCH_SIZE: 100,
      EXPORT_LIMIT: 10000,
      REFRESH_INTERVAL: 300000 // 5 minutes
    },

    CAMPAIGNS: {
      MAX_DURATION_DAYS: 365,
      MIN_BUDGET: 100,
      DEFAULT_BUDGET: 1000
    },

    SUBSCRIPTION: {
      FREE_TRIAL_DAYS: 14,
      FREE_TIER_LIMITS: 100,
      BILLING_CYCLE_DAY: 1
    }
  }
};

// Helper function to get environment-specific URLs
export const getEnvironmentUrls = (buildEnv = ENV_CONFIG.BUILD_ENV) => {
  const envMap = ['development', 'staging', 'production'];
  const environment = envMap[buildEnv] || 'development';
  return ENV_CONFIG.URLS[environment];
};

// Helper function to check if feature is enabled
export const isFeatureEnabled = (featureName) => {
  return ENV_CONFIG.FEATURES[featureName] || false;
};

// Helper function to get API configuration
export const getApiConfig = () => {
  const urls = getEnvironmentUrls();
  return {
    baseURL: urls.backend + ENV_CONFIG.API.BASE_PATH,
    timeout: ENV_CONFIG.API.TIMEOUT,
    retryAttempts: ENV_CONFIG.API.RETRY_ATTEMPTS,
    retryDelay: ENV_CONFIG.API.RETRY_DELAY
  };
};

export default ENV_CONFIG;
