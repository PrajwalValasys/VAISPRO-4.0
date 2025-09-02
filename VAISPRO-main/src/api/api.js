import { hostBackURl } from "../config/http";

const BASE_URL = hostBackURl;

// API Endpoints organized by feature
const API_ENDPOINTS = {
  // Authentication endpoints
  AUTH: {
    LOGIN: `${BASE_URL}/login/`,
    REGISTER: `${BASE_URL}/register`,
    LOGOUT: `${BASE_URL}/logout/`,
    REFRESH_TOKEN: `${BASE_URL}/token/refresh/`,
    VERIFY_EMAIL: `${BASE_URL}/verify_email/`,
    VERIFY_EMAIL_OTP: `${BASE_URL}/validate-email-otp/`,
    VERIFY_PHONE_OTP: `${BASE_URL}/validate-phone-otp/`,
    PASSWORD_RESET_OTP_SENDER: `${BASE_URL}/password-reset-otp-sender/`,
    RESET_PASSWORD: `${BASE_URL}/password-reset`,
    FORGOT_PASSWORD_VERIFY_OTP: `${BASE_URL}/password-reset/`,
    CHANGE_PASSWORD: `${BASE_URL}/change_password`,
    RESEND_OTP_EMAIL: `${BASE_URL}/resend-otp-email/`,
    RESEND_OTP_PHONE: `${BASE_URL}/resend-otp-phone/`,
    LINKEDIN_LOGIN: `${BASE_URL}/user-accounts/linkedin/`
  },

  // User management endpoints
  USER: {
    DETAILS: `${BASE_URL}/get_profile`,
    UPDATE: `${BASE_URL}/update_profile/`,
    STATUS: `${BASE_URL}/get_user_status`,
    UPDATE_EMAIL: `${BASE_URL}/update_email`,
    UPDATE_EMAIL_VALIDATE_OTP: `${BASE_URL}/update_email_validate_otp`,
    UPDATE_PHONE: `${BASE_URL}/update_phone_number`,
    UPDATE_PHONE_VALIDATE_OTP: `${BASE_URL}/update_phone_number_validate_otp`,
    UPDATE_PROFILE_PIC: `${BASE_URL}/udpate_profile_pic/`,
    REMOVE_PROFILE_PHOTO: `${BASE_URL}/profile_delete`
  },

  // ICP (Ideal Customer Profile) endpoints
  ICP: {
    SCORE: `${BASE_URL}/icp-score/`,
    SPLIT: `${BASE_URL}/icp_split/`,
    PRODUCTS_CATEGORY: `${BASE_URL}/get-products-category`,
    PRODUCTS_SUB_CATEGORY: `${BASE_URL}/get_product_sub_category/`,
    FILTERED_DATA: `${BASE_URL}/get-filtered-data/`
  },

  // Prospect management endpoints
  PROSPECTS: {
    DROPDOWN: `${BASE_URL}/get_prospect_dropdown/`,
    FIND_DETAILS: `${BASE_URL}/find_prospect/`,
    DOWNLOAD_LIST: `${BASE_URL}/prospect_download_list/`,
    DOWNLOAD_CREDIT_CHECK: `${BASE_URL}/prospect_credit_check/`,
    JOB_TITLE_SUGGESTIONS: `${BASE_URL}/get_job_title_suggestions`
  },

  // ABM (Account Based Marketing) endpoints
  ABM: {
    SCORE: `${BASE_URL}/verify_abm/`,
    LAL_LIST: `${BASE_URL}/lal_list/`
  },

  // Downloads and files endpoints
  DOWNLOADS: {
    MY_LIST: `${BASE_URL}/my_download_list/`,
    GET_LIST: `${BASE_URL}/get_my_download_list/`,
    CREDIT_CHECK: `${BASE_URL}/download_credit_check/`,
    FILE_DOWNLOAD: `${BASE_URL}/download_file`
  },

  // Subscription and billing endpoints
  SUBSCRIPTION: {
    PLANS: `${BASE_URL}/get_plans/`,
    SUBSCRIBE: `${BASE_URL}/Subscribe/`,
    USER_PLAN: `${BASE_URL}/get_user_plan/`,
    BUNDLE_PLAN: `${BASE_URL}/buy_additional_credit/`,
    SPENDING_HISTORY: `${BASE_URL}/get_spending_history`,
    REQUEST: `${BASE_URL}/subscriptionrequest/`
  },

  // Dashboard and analytics endpoints
  DASHBOARD: {
    FILTER_WISE: `${BASE_URL}/dashboard/`,
    NO_FILTER: `${BASE_URL}/get_dashboard_stats/`,
    PROFILE_DOWNLOADS: `${BASE_URL}/get_dashboard_graph`,
    PIE_PROFILE_DOWNLOADS: `${BASE_URL}/get_dashboard_pai`
  },

  // Support and tickets endpoints
  SUPPORT: {
    TICKET_CATEGORY: `${BASE_URL}/get_ticket_category/`,
    TICKET_SUB_CATEGORY: `${BASE_URL}/get_ticket_sub_category`,
    CREATE_TICKET: `${BASE_URL}/tickets_create/`,
    TICKET_LIST: `${BASE_URL}/get_support_tickets`,
    ADD_COMMENTS: `${BASE_URL}/add_comments/`,
    GET_COMMENTS: `${BASE_URL}/get_ticket_comments/`,
    DELETE_TICKETS: `${BASE_URL}/delete_tickets/`,
    UPDATE_TICKET_IMAGE: (id) => `${BASE_URL}/tickets/${id}/update-image/`,
    GET_TICKET_BY_ID: `${BASE_URL}/get_ticket_details`,
    TICKET_GRAPH_DATA: `${BASE_URL}/get_ticket_graphdata`
  },

  // User management (staff/team) endpoints
  STAFF: {
    ADD: `${BASE_URL}/createSub_user`,
    LIST: `${BASE_URL}/userstaff`,
    DETAILS: `${BASE_URL}/get_update_userstaff`,
    UPDATE: `${BASE_URL}/get_update_userstaff`,
    DELETE: `${BASE_URL}/userstaff`,
    BLOCK: `${BASE_URL}/userstaff`
  },

  // Topics and content endpoints
  TOPICS: {
    GET_ALL: `${BASE_URL}/topics`,
    GET_WITH_URL: `${BASE_URL}/get_url_topics`
  },

  // Location and geography endpoints
  LOCATION: {
    ALL_COUNTRIES: `${BASE_URL}/get_all_country`
  },

  // Search and filters endpoints
  SEARCH: {
    RECENT_SEARCHES: `${BASE_URL}/vaisfilter`,
    DOMAIN_CHECK: `${BASE_URL}/check_domains/`
  },

  // Notifications endpoints
  NOTIFICATIONS: {
    GET: `${BASE_URL}/notification/`,
    NOTICE_LIST: `${BASE_URL}/dashbard/notices`
  },

  // Campaign management endpoints
  CAMPAIGNS: {
    BASE: `${BASE_URL}/campaign/`,
    GRAPH_TABLE_DATA: `${BASE_URL}/get-campaign-graph-table-data`,
    ACCEPT: `${BASE_URL}/accept-campaign`,
    DELETE: `${BASE_URL}/campaigns/soft-delete`,
    TRACK: `${BASE_URL}/user-campaign-tracks`
  },

  // External integrations endpoints
  INTEGRATIONS: {
    G2_URL: `${BASE_URL}/g2-url/`,
    INTENT_RANGE: `${BASE_URL}/api/bombora-intent-ranges/`
  },

  // Information and help endpoints
  INFO: {
    FAQ: `${BASE_URL}/get-faq/`,
    CONTACT_EMAIL: `${BASE_URL}/contact-us-email/`
  }
};

// Export individual endpoints for backward compatibility
export const LOGIN_URL = API_ENDPOINTS.AUTH.LOGIN;
export const REGISTER_URL = API_ENDPOINTS.AUTH.REGISTER;
export const PASSWORD_RESET_OTP_SENDER = API_ENDPOINTS.AUTH.PASSWORD_RESET_OTP_SENDER;
export const RESET_PASSWORD_URL = API_ENDPOINTS.AUTH.RESET_PASSWORD;
export const CHANGE_PASSWORD_URL = API_ENDPOINTS.AUTH.CHANGE_PASSWORD;
export const USER_DETAILS_URL = API_ENDPOINTS.USER.DETAILS;
export const USER_DETAILS_UPDATE_URL = API_ENDPOINTS.USER.UPDATE;
export const VERIFY_EMAIL = API_ENDPOINTS.AUTH.VERIFY_EMAIL;
export const VERIFY_EMAIL_OTP = API_ENDPOINTS.AUTH.VERIFY_EMAIL_OTP;
export const VERIFY_PHONE_OTP = API_ENDPOINTS.AUTH.VERIFY_PHONE_OTP;
export const GET_PRODUCTS_CATEGORY = API_ENDPOINTS.ICP.PRODUCTS_CATEGORY;
export const GET_PRODUCTS_SUB_CATEGORY = API_ENDPOINTS.ICP.PRODUCTS_SUB_CATEGORY;
export const GET_FILTERED_DATA = API_ENDPOINTS.ICP.FILTERED_DATA;
export const GET_ICP_SCORE_RESULT = API_ENDPOINTS.ICP.SCORE;
export const GET_ABM_SCORE_RESULT = API_ENDPOINTS.ABM.SCORE;
export const GET_LAL_LIST_RESULT = API_ENDPOINTS.ABM.LAL_LIST;
export const FORGOT_PASSWORD_VERIFY_OTP = API_ENDPOINTS.AUTH.FORGOT_PASSWORD_VERIFY_OTP;
export const GET_ICP_SPLIT = API_ENDPOINTS.ICP.SPLIT;
export const RESEND_OTP_EMAIL = API_ENDPOINTS.AUTH.RESEND_OTP_EMAIL;
export const RESEND_OTP_PHONE = API_ENDPOINTS.AUTH.RESEND_OTP_PHONE;
export const MY_DOWNLOAD_LIST = API_ENDPOINTS.DOWNLOADS.MY_LIST;
export const GET_PROSPECT_DROPDOWN = API_ENDPOINTS.PROSPECTS.DROPDOWN;
export const FIND_PROSPECT_DETAILS = API_ENDPOINTS.PROSPECTS.FIND_DETAILS;
export const GET_MY_DOWNLOAD_LIST = API_ENDPOINTS.DOWNLOADS.GET_LIST;

export const GET_PROSPECT_DOWNLOAD_LIST = API_ENDPOINTS.PROSPECTS.DOWNLOAD_LIST;
export const GET_SUBSCRIPTION_PLANS_DETAILS = API_ENDPOINTS.SUBSCRIPTION.PLANS;
export const SUBSCRIBE = API_ENDPOINTS.SUBSCRIPTION.SUBSCRIBE;
export const UPDATE_PROFILE_PIC = API_ENDPOINTS.USER.UPDATE_PROFILE_PIC;
export const SUBSCRIPTION_PLAN_DETAILS_OF_USER = API_ENDPOINTS.SUBSCRIPTION.USER_PLAN;
export const DOWNLOAD_CREDIT_CHECK = API_ENDPOINTS.DOWNLOADS.CREDIT_CHECK;
export const BUNDLE_PLAN = API_ENDPOINTS.SUBSCRIPTION.BUNDLE_PLAN;
export const DASHBOARD_DETAILS_FILTER_WISE = API_ENDPOINTS.DASHBOARD.FILTER_WISE;
export const GET_DASHBORAD_DETAILS_WITH_NO_FILTER = API_ENDPOINTS.DASHBOARD.NO_FILTER;
export const GET_SPENDING_HISTORY_DETAILS = API_ENDPOINTS.SUBSCRIPTION.SPENDING_HISTORY;
export const GET_TICKET_CATEGORY = API_ENDPOINTS.SUPPORT.TICKET_CATEGORY;
export const GET_TICKET_SUB_CATEGORY = API_ENDPOINTS.SUPPORT.TICKET_SUB_CATEGORY;
export const CREATE_TICKET = API_ENDPOINTS.SUPPORT.CREATE_TICKET;
export const GET_SUPPORT_TICKET_LIST = API_ENDPOINTS.SUPPORT.TICKET_LIST;
export const ADD_COMMENTS = API_ENDPOINTS.SUPPORT.ADD_COMMENTS;
export const GET_TICKIT_COMMENTS = API_ENDPOINTS.SUPPORT.GET_COMMENTS;
export const LINKDIN_LOGIN = API_ENDPOINTS.AUTH.LINKEDIN_LOGIN;
export const GET_USER_STATUS = API_ENDPOINTS.USER.STATUS;
export const UPDATE_USER_EMAIL = API_ENDPOINTS.USER.UPDATE_EMAIL;
export const UPDATE_EMAIL_VALIDATE_OTP = API_ENDPOINTS.USER.UPDATE_EMAIL_VALIDATE_OTP;
export const UPDATE_USER_PHONE_NUMBER = API_ENDPOINTS.USER.UPDATE_PHONE;
export const UPDATE_PHONE_NUMBER_VALIDATE_OTP = API_ENDPOINTS.USER.UPDATE_PHONE_VALIDATE_OTP;

export const PROSPECT_DOWNLOAD_CREDIT_CHECK = API_ENDPOINTS.PROSPECTS.DOWNLOAD_CREDIT_CHECK;
export const REMOVE_PROFILE_PHOTO = API_ENDPOINTS.USER.REMOVE_PROFILE_PHOTO;
export const DELETE_TICKETS = API_ENDPOINTS.SUPPORT.DELETE_TICKETS;
export const CHECK_DOMAIN_NAMES = API_ENDPOINTS.SEARCH.DOMAIN_CHECK;
export const GET_PROFILE_DOWNLOADS = API_ENDPOINTS.DASHBOARD.PROFILE_DOWNLOADS;
export const GET_PIE_PROFILE_DOWNLOADS = API_ENDPOINTS.DASHBOARD.PIE_PROFILE_DOWNLOADS;
export const GET_TICKET_GRAPH_DATA = API_ENDPOINTS.SUPPORT.TICKET_GRAPH_DATA;

export const ADD_STANDARD_USER_DATA = API_ENDPOINTS.STAFF.ADD;
export const ALL_STANDARD_USERS = API_ENDPOINTS.STAFF.LIST;
export const STANDARD_USER_DETAILS_UPDATE_URL = API_ENDPOINTS.STAFF.UPDATE;
export const DELETE_STANDARD_USER = API_ENDPOINTS.STAFF.DELETE;
export const BLOCK_STANDARD_USER = API_ENDPOINTS.STAFF.BLOCK;
export const STANDARD_USER_DETAILS_URL = API_ENDPOINTS.STAFF.DETAILS;

export const GET_ALL_TOPICS = API_ENDPOINTS.TOPICS.GET_ALL;
export const GET_TOPICS_WITH_URL = API_ENDPOINTS.TOPICS.GET_WITH_URL;
export const UPDATE_TICKET_IMAGE = API_ENDPOINTS.SUPPORT.UPDATE_TICKET_IMAGE;

export const GET_TICKET_BY_ID = API_ENDPOINTS.SUPPORT.GET_TICKET_BY_ID;

export const GET_ALL_COUNTRY = API_ENDPOINTS.LOCATION.ALL_COUNTRIES;
export const GET_PROSPECT_JOB_TITLE = API_ENDPOINTS.PROSPECTS.JOB_TITLE_SUGGESTIONS;
// Save Searches
export const GETALLRECENTSEARCHES = API_ENDPOINTS.SEARCH.RECENT_SEARCHES;
// Save Searches END
export const GET_FILE_DOWNLOAD = API_ENDPOINTS.DOWNLOADS.FILE_DOWNLOAD;

export const GET_NOTICE_LIST = API_ENDPOINTS.NOTIFICATIONS.NOTICE_LIST;

export const getNotifications = API_ENDPOINTS.NOTIFICATIONS.GET;

export const getCampaign = API_ENDPOINTS.CAMPAIGNS.BASE;

export const GET_CAMPAIGN_GRAPH_TABLE_DATA = API_ENDPOINTS.CAMPAIGNS.GRAPH_TABLE_DATA;

export const Accept_campaign_URL = API_ENDPOINTS.CAMPAIGNS.ACCEPT;

export const Delete_campaign_URL = API_ENDPOINTS.CAMPAIGNS.DELETE;

export const GtwoURL = API_ENDPOINTS.INTEGRATIONS.G2_URL;

export const GET_FAQ = API_ENDPOINTS.INFO.FAQ;

export const GET_IntentRange = API_ENDPOINTS.INTEGRATIONS.INTENT_RANGE;

export const GET_USER_CAMPAIGN_TRACK = API_ENDPOINTS.CAMPAIGNS.TRACK;

export const SEND_CONTACT_US_EMAIL = API_ENDPOINTS.INFO.CONTACT_EMAIL;

export const SUBSCRIPTION_REQUEST = API_ENDPOINTS.SUBSCRIPTION.REQUEST;

// Export the organized endpoints object
export default API_ENDPOINTS;

// API helper functions
export const buildUrl = (endpoint, params = {}) => {
  let url = endpoint;
  Object.keys(params).forEach(key => {
    url = url.replace(`:${key}`, params[key]);
  });
  return url;
};

export const getApiUrl = (category, endpoint, params = {}) => {
  const url = API_ENDPOINTS[category]?.[endpoint];
  if (!url) {
    throw new Error(`API endpoint ${category}.${endpoint} not found`);
  }
  return typeof url === 'function' ? url(params) : buildUrl(url, params);
};

// API status codes
export const API_STATUS = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500
};

// Common API configurations
export const API_CONFIG = {
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000
};
