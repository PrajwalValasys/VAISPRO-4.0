import {
  ICP_SCORE_SUCCESS,
  LOG_OUT,
  REQUEST_LOGIN_SUCCESS,
  USER_EMAIL_SUCCESS,
  USER_EMAIL_OTP_SUCCESS,
  SET_TOKEN_UID,
  NEW_USER_SIGNUP_DETAIL,
  PROSPECT_DETAILS_SUCCESS,
  USER_SUBSCRIPTION_DATA_SUCCESS,
  GEOLOCATION_SUCCESS,
  INTENT_RANGE_SUCCESS,
  LOADER
} from "../../utils/constants";

// Initial state for user authentication
const userInitialState = {
  token: null,
  isLoggedIn: false,
  userInfo: null,
  error: null,
  lastLoginTime: null
};

export const userLoginReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case REQUEST_LOGIN_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
        isLoggedIn: true,
        error: null,
        lastLoginTime: new Date().toISOString()
      };

    case LOG_OUT:
      return {
        ...userInitialState,
        isLoggedIn: false
      };

    case "LOGIN_ERROR":
      return {
        ...state,
        error: action.payload,
        isLoggedIn: false
      };

    case "CLEAR_USER_ERROR":
      return {
        ...state,
        error: null
      };

    default:
      return state;
  }
};

// Email verification reducer
const emailInitialState = {
  regEmailInfo: null,
  isVerified: false,
  error: null
};

export const verifyEmailReducer = (state = emailInitialState, action) => {
  switch (action.type) {
    case USER_EMAIL_SUCCESS:
      return { 
        ...state, 
        regEmailInfo: action.payload,
        error: null 
      };

    case "EMAIL_VERIFICATION_SUCCESS":
      return {
        ...state,
        isVerified: true,
        error: null
      };

    case "EMAIL_VERIFICATION_ERROR":
      return {
        ...state,
        error: action.payload,
        isVerified: false
      };

    case "CLEAR_EMAIL_ERROR":
      return {
        ...state,
        error: null
      };

    default:
      return state;
  }
};

// ICP Score reducer
const icpInitialState = {
  icpScore: null,
  loading: false,
  error: null,
  lastUpdated: null
};

export const icpScore = (state = icpInitialState, action) => {
  switch (action.type) {
    case ICP_SCORE_SUCCESS:
      return { 
        ...state, 
        icpScore: action.payload,
        loading: false,
        error: null,
        lastUpdated: new Date().toISOString()
      };

    case "ICP_SCORE_REQUEST":
      return {
        ...state,
        loading: true,
        error: null
      };

    case "ICP_SCORE_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case "CLEAR_ICP_SCORE":
      return icpInitialState;

    default:
      return state;
  }
};

// Email OTP verification reducer
const otpInitialState = {
  emailOtp: null,
  isVerified: false,
  error: null,
  expiryTime: null
};

export const verifyEmailOtpReducer = (state = otpInitialState, action) => {
  switch (action.type) {
    case USER_EMAIL_OTP_SUCCESS:
      return { 
        ...state, 
        emailOtp: action.payload,
        error: null,
        expiryTime: new Date(Date.now() + 10 * 60 * 1000).toISOString() // 10 minutes
      };

    case "OTP_VERIFICATION_SUCCESS":
      return {
        ...state,
        isVerified: true,
        error: null
      };

    case "OTP_VERIFICATION_ERROR":
      return {
        ...state,
        error: action.payload,
        isVerified: false
      };

    case "OTP_EXPIRED":
      return {
        ...state,
        error: "OTP has expired",
        emailOtp: null
      };

    default:
      return state;
  }
};

// Token and UID storage reducer
const tokenInitialState = {
  token: null,
  uid: null,
  expiryTime: null
};

export const storeTokenAndUid = (state = tokenInitialState, action) => {
  switch (action.type) {
    case SET_TOKEN_UID:
      return { 
        ...state, 
        token: action.data.token, 
        uid: action.data.uid,
        expiryTime: action.data.expiryTime || null
      };

    case "CLEAR_TOKEN_UID":
      return tokenInitialState;

    default:
      return state;
  }
};

// New user signup details reducer
const signupInitialState = {
  newUserDetails: null,
  step: 1,
  isComplete: false
};

export const newUserSignUpDetailsReducer = (state = signupInitialState, action) => {
  switch (action.type) {
    case NEW_USER_SIGNUP_DETAIL:
      return { 
        ...state, 
        newUserDetails: action.payload,
        step: action.payload.step || 1
      };

    case "SIGNUP_STEP_UPDATE":
      return {
        ...state,
        step: action.payload
      };

    case "SIGNUP_COMPLETE":
      return {
        ...state,
        isComplete: true
      };

    case "CLEAR_SIGNUP_DETAILS":
      return signupInitialState;

    default:
      return state;
  }
};

// Prospect details reducer
const prospectInitialState = {
  prospectDetails: null,
  loading: false,
  error: null,
  filters: {},
  pagination: {
    currentPage: 1,
    totalPages: 0,
    totalRecords: 0
  }
};

export const prospectDetailsReducer = (state = prospectInitialState, action) => {
  switch (action.type) {
    case PROSPECT_DETAILS_SUCCESS:
      return { 
        ...state, 
        prospectDetails: action.payload,
        loading: false,
        error: null
      };

    case "PROSPECT_DETAILS_REQUEST":
      return {
        ...state,
        loading: true,
        error: null
      };

    case "PROSPECT_DETAILS_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case "SET_PROSPECT_FILTERS":
      return {
        ...state,
        filters: { ...state.filters, ...action.payload }
      };

    case "CLEAR_PROSPECT_FILTERS":
      return {
        ...state,
        filters: {}
      };

    case "SET_PROSPECT_PAGINATION":
      return {
        ...state,
        pagination: { ...state.pagination, ...action.payload }
      };

    default:
      return state;
  }
};

// User subscription data reducer
const subscriptionInitialState = {
  userSubscrptionData: null,
  loading: false,
  error: null,
  planDetails: null,
  billingHistory: []
};

export const userSubcriptionDataReducer = (state = subscriptionInitialState, action) => {
  switch (action.type) {
    case USER_SUBSCRIPTION_DATA_SUCCESS:
      return { 
        ...state, 
        userSubscrptionData: action.payload,
        loading: false,
        error: null
      };

    case "SUBSCRIPTION_REQUEST":
      return {
        ...state,
        loading: true,
        error: null
      };

    case "SUBSCRIPTION_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case "SET_PLAN_DETAILS":
      return {
        ...state,
        planDetails: action.payload
      };

    case "UPDATE_BILLING_HISTORY":
      return {
        ...state,
        billingHistory: action.payload
      };

    default:
      return state;
  }
};

// Geolocation reducer
const geoLocationInitialState = {
  geolocation: [],
  loading: false,
  error: null,
  selectedCountries: []
};

export const geoLocationReducer = (state = geoLocationInitialState, action) => {
  switch (action.type) {
    case GEOLOCATION_SUCCESS:
      return { 
        ...state, 
        geolocation: action.payload,
        loading: false,
        error: null
      };

    case "GEOLOCATION_REQUEST":
      return {
        ...state,
        loading: true,
        error: null
      };

    case "GEOLOCATION_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case "SET_SELECTED_COUNTRIES":
      return {
        ...state,
        selectedCountries: action.payload
      };

    case "ADD_SELECTED_COUNTRY":
      return {
        ...state,
        selectedCountries: [...state.selectedCountries, action.payload]
      };

    case "REMOVE_SELECTED_COUNTRY":
      return {
        ...state,
        selectedCountries: state.selectedCountries.filter(
          country => country.id !== action.payload
        )
      };

    default:
      return state;
  }
};

// Intent ranges reducer
const intentRangesInitialState = {
  intentRange: [],
  loading: false,
  error: null,
  selectedRanges: []
};

export const IntentRanges = (state = intentRangesInitialState, action) => {
  switch (action.type) {
    case INTENT_RANGE_SUCCESS:
      return { 
        ...state, 
        intentRange: action.payload,
        loading: false,
        error: null
      };

    case "INTENT_RANGE_REQUEST":
      return {
        ...state,
        loading: true,
        error: null
      };

    case "INTENT_RANGE_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case "SET_SELECTED_INTENT_RANGES":
      return {
        ...state,
        selectedRanges: action.payload
      };

    case "ADD_SELECTED_INTENT_RANGE":
      return {
        ...state,
        selectedRanges: [...state.selectedRanges, action.payload]
      };

    case "REMOVE_SELECTED_INTENT_RANGE":
      return {
        ...state,
        selectedRanges: state.selectedRanges.filter(
          range => range.id !== action.payload
        )
      };

    default:
      return state;
  }
};
