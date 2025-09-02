import { toast } from "react-toastify";
import axios from "axios";

import {
  REGISTER_URL,
  LOGIN_URL,
  RESET_PASSWORD_URL,
  USER_DETAILS_URL,
  USER_DETAILS_UPDATE_URL,
  VERIFY_EMAIL,
  VERIFY_EMAIL_OTP,
  GET_PRODUCTS_CATEGORY,
  GET_PRODUCTS_SUB_CATEGORY,
  GET_FILTERED_DATA,
  GET_ICP_SCORE_RESULT,
  PASSWORD_RESET_OTP_SENDER,
  FORGOT_PASSWORD_VERIFY_OTP,
  GET_ICP_SPLIT,
  CHANGE_PASSWORD_URL,
  VERIFY_PHONE_OTP,
  RESEND_OTP_EMAIL,
  RESEND_OTP_PHONE,
  GET_ABM_SCORE_RESULT,
  MY_DOWNLOAD_LIST,
  GET_PROSPECT_DROPDOWN,
  FIND_PROSPECT_DETAILS,
  GET_MY_DOWNLOAD_LIST,
  GET_LAL_LIST_RESULT,
  GET_PROSPECT_DOWNLOAD_LIST,
  GET_SUBSCRIPTION_PLANS_DETAILS,
  SUBSCRIBE,
  UPDATE_PROFILE_PIC,
  SUBSCRIPTION_PLAN_DETAILS_OF_USER,
  DOWNLOAD_CREDIT_CHECK,
  BUNDLE_PLAN,
  DASHBOARD_DETAILS_FILTER_WISE,
  GET_DASHBORAD_DETAILS_WITH_NO_FILTER,
  GET_SPENDING_HISTORY_DETAILS,
  GET_TICKET_CATEGORY,
  GET_TICKET_SUB_CATEGORY,
  CREATE_TICKET,
  GET_SUPPORT_TICKET_LIST,
  ADD_COMMENTS,
  GET_TICKIT_COMMENTS,
  LINKDIN_LOGIN,
  GET_USER_STATUS,
  UPDATE_EMAIL_VALIDATE_OTP,
  UPDATE_USER_EMAIL,
  UPDATE_USER_PHONE_NUMBER,
  UPDATE_PHONE_NUMBER_VALIDATE_OTP,
  PROSPECT_DOWNLOAD_CREDIT_CHECK,
  REMOVE_PROFILE_PHOTO,
  DELETE_TICKETS,
  CHECK_DOMAIN_NAMES,
  GET_PROFILE_DOWNLOADS,
  GET_PIE_PROFILE_DOWNLOADS,
  GET_TICKET_GRAPH_DATA,
  ADD_STANDARD_USER_DATA,
  ALL_STANDARD_USERS,
  STANDARD_USER_DETAILS_UPDATE_URL,
  DELETE_STANDARD_USER,
  BLOCK_STANDARD_USER,
  STANDARD_USER_DETAILS_URL,
  GET_ALL_TOPICS,
  GET_TOPICS_WITH_URL,
  UPDATE_TICKET_IMAGE,
  GET_TICKET_BY_ID,
  GET_ALL_COUNTRY,
  GET_PROSPECT_JOB_TITLE,
  GETALLRECENTSEARCHES,
  GET_FILE_DOWNLOAD,
  GET_NOTICE_LIST,
  getNotifications,
  getCampaign,
  GET_CAMPAIGN_GRAPH_TABLE_DATA,
  Accept_campaign_URL,
  Delete_campaign_URL,
  GtwoURL,
  GET_FAQ,
  GET_IntentRange,
  GET_USER_CAMPAIGN_TRACK,
  SEND_CONTACT_US_EMAIL,
  SUBSCRIPTION_REQUEST
} from "../../api/api";

import {
  REQUEST_LOGIN_SUCCESS,
  USER_EMAIL_SUCCESS,
  LOADER,
  ICP_SCORE_SUCCESS,
  USER_EMAIL_OTP_SUCCESS,
  SET_TOKEN_UID,
  NEW_USER_SIGNUP_DETAIL,
  PROSPECT_DETAILS_SUCCESS,
  USER_SUBSCRIPTION_DATA_SUCCESS,
  GEOLOCATION_SUCCESS,
  INTENT_RANGE_SUCCESS,
  LOG_OUT
} from "../../utils/constants";

// Default axios configuration
const config = {
  headers: {
    "Content-type": "application/json",
  },
};

// User Authentication Actions
export const user_signin = (data, callback) => async (dispatch) => {
  try {
    dispatch({ type: LOADER, payload: true });

    const response = await axios.post(LOGIN_URL, data, config);

    if (response.data.status === 200) {
      if (response.data.data?.is_active) {
        dispatch({ type: REQUEST_LOGIN_SUCCESS, payload: response.data.data });
        dispatch({ type: LOADER, payload: false });
        callback(response.data);
        toast.success(response.data.message);
      } else {
        dispatch({ type: LOADER, payload: false });
        toast.error("Account is not active. Contact Admin or complete Email and Phone Verification");
      }
    } else if (response.data.status === 401) {
      dispatch({ type: LOADER, payload: false });
      toast.error(response.data.message || "Invalid credentials");
    } else if (response.data.status === 429) {
      dispatch({ type: LOADER, payload: false });
      toast.error("Too many failed login attempts. Try again after 10 minutes.");
    }
  } catch (error) {
    dispatch({ type: LOADER, payload: false });
    const errorMessage = error.response?.data?.message || "Something went wrong";
    toast.error(errorMessage);
    if (callback) callback({ error: errorMessage });
  }
};

export const user_signup = (data, callback) => async (dispatch) => {
  try {
    dispatch({ type: LOADER, payload: true });

    const response = await axios.post(REGISTER_URL, data, config);

    if (response.data.status === 200) {
      // Remove passwords from data before storing
      const sanitizedData = { ...data };
      delete sanitizedData.password;
      delete sanitizedData.re_password;
      
      dispatch({
        type: NEW_USER_SIGNUP_DETAIL,
        payload: { ...sanitizedData, user_id: response.data.data.user_id },
      });
      dispatch({ type: LOADER, payload: false });
      toast.success(response.data.message);
      callback(response.data.data);
    } else if (response.data.status === 409) {
      dispatch({ type: LOADER, payload: false });
      toast.error(response.data.message);
    }
  } catch (error) {
    dispatch({ type: LOADER, payload: false });
    const errorMessage = error.response?.data?.message || "Registration failed";
    toast.error(errorMessage);
    if (callback) callback({ error: errorMessage });
  }
};

export const set_business_email = (data, callback) => async (dispatch) => {
  try {
    dispatch({ type: LOADER, payload: true });

    const response = await axios.post(VERIFY_EMAIL, data, config);

    if (response.data.status === 200) {
      dispatch({ type: USER_EMAIL_SUCCESS, payload: data });
      dispatch({ type: LOADER, payload: false });
      callback(response.data);
    } else if (response.data.status === 409) {
      dispatch({ type: LOADER, payload: false });
      callback(response.data);
    }
  } catch (error) {
    dispatch({ type: LOADER, payload: false });
    const errorMessage = error.response?.data?.message || "Email verification failed";
    toast.error(errorMessage);
    callback({ error: errorMessage });
  }
};

// OTP Verification Actions
export const email_otp_verification = (data, callback) => async (dispatch) => {
  try {
    dispatch({ type: LOADER, payload: true });

    const response = await axios.post(VERIFY_EMAIL_OTP, data, config);

    if (response.data.status === 200) {
      dispatch({ type: LOADER, payload: false });
      callback(response.data);
    } else if (response.data.status === 400) {
      dispatch({ type: LOADER, payload: false });
      callback(response.data);
    }
  } catch (error) {
    dispatch({ type: LOADER, payload: false });
    const errorMessage = error.response?.data?.message || "OTP verification failed";
    toast.error(errorMessage);
    callback({ error: errorMessage });
  }
};

export const phone_otp_verification = (data, callback) => async (dispatch) => {
  try {
    dispatch({ type: LOADER, payload: true });

    const response = await axios.post(VERIFY_PHONE_OTP, data, config);

    if (response.data.status === 200) {
      dispatch({ type: LOADER, payload: false });
      callback(response.data);
    } else if (response.data.status === 400) {
      dispatch({ type: LOADER, payload: false });
      callback(response.data);
    }
  } catch (error) {
    dispatch({ type: LOADER, payload: false });
    const errorMessage = error.response?.data?.message || "Phone verification failed";
    toast.error(errorMessage);
    callback({ error: errorMessage });
  }
};

// Password Reset Actions
export const password_reset_otp_sender = (data, callback) => async (dispatch) => {
  try {
    dispatch({ type: LOADER, payload: true });

    const response = await axios.post(PASSWORD_RESET_OTP_SENDER, data, config);

    if (response.data.status === 200) {
      toast.success(response.data.message);
      dispatch({ type: USER_EMAIL_OTP_SUCCESS, payload: data });
      dispatch({ type: LOADER, payload: false });
      callback(response.data);
    } else if (response.data.status === 400) {
      toast.error(response.data.message);
      dispatch({ type: LOADER, payload: false });
      callback(response.data);
    }
  } catch (error) {
    dispatch({ type: LOADER, payload: false });
    const errorMessage = error.response?.data?.message || "Password reset failed";
    toast.error(errorMessage);
    callback({ error: errorMessage });
  }
};

export const forgot_password_otp_verify = (data, callback) => async (dispatch) => {
  try {
    dispatch({ type: LOADER, payload: true });

    const response = await axios.post(FORGOT_PASSWORD_VERIFY_OTP, data, config);

    if (response.data.status === 200) {
      dispatch({ type: LOADER, payload: false });
      callback(response.data);
    } else if (response.data.status === 400) {
      dispatch({ type: LOADER, payload: false });
      callback(response.data);
    }
  } catch (error) {
    dispatch({ type: LOADER, payload: false });
    const errorMessage = error.response?.data?.message || "OTP verification failed";
    toast.error(errorMessage);
    callback({ error: errorMessage });
  }
};

export const reset_password = (data, callback) => async (dispatch) => {
  const payload = { password: data.password };
  
  try {
    dispatch({ type: LOADER, payload: true });

    const response = await axios.patch(
      `${RESET_PASSWORD_URL}/${data.uid}/${data.token}/`,
      payload,
      config
    );
    
    if (response.data.status === 200) {
      dispatch({ type: LOADER, payload: false });
      toast.success("Password reset successfully");
      callback(response.data);
    } else if (response.data.status === 400) {
      dispatch({ type: LOADER, payload: false });
      callback(response.data);
    }
  } catch (error) {
    dispatch({ type: LOADER, payload: false });
    const errorMessage = error.response?.data?.message || "Password reset failed";
    toast.error(errorMessage);
    callback({ error: errorMessage });
  }
};

// User Profile Actions
export const getUserDetails = (payload, token, callback) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADER, payload: true });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(`${USER_DETAILS_URL}/${payload.userId}`, config);

      if (response.data.status === 200) {
        dispatch({ type: LOADER, payload: false });
        callback(response.data.data);
      } else if (response.data.status === 404) {
        dispatch({ type: LOADER, payload: false });
        toast.error(response?.data?.message || "User not found");
      }
    } catch (error) {
      dispatch({ type: LOADER, payload: false });
      if (error.response && error.response.status === 401) {
        dispatch(handleLogout());
        toast.error("Session expired. Please login again.");
      } else {
        toast.error("Failed to fetch user details");
      }
    }
  };
};

export const updateUserDetails = (updatedData, token, callback) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADER, payload: true });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(
        USER_DETAILS_UPDATE_URL,
        updatedData.getUserData,
        config
      );
      
      if (response.data.status === 200) {
        dispatch({ type: LOADER, payload: false });
        toast.success(response?.data?.message || "Profile updated successfully");
        callback(response.data.data);
      } else if (response.data.status === 404) {
        dispatch({ type: LOADER, payload: false });
        toast.error(response?.data?.message || "Update failed");
      }
    } catch (error) {
      dispatch({ type: LOADER, payload: false });
      if (error.response && error.response.status === 401) {
        dispatch(handleLogout());
        toast.error("Session expired. Please login again.");
      } else {
        toast.error("Failed to update profile");
      }
    }
  };
};

// ICP Score Actions
export const getIcpScore = (icpscoredata, token, callback) => async (dispatch) => {
  try {
    dispatch({ type: LOADER, payload: true });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.post(GET_ICP_SCORE_RESULT, icpscoredata, config);

    if (response.data.status === 200) {
      if (icpscoredata.page === 1 && icpscoredata.search_query === undefined) {
        dispatch({ type: ICP_SCORE_SUCCESS, payload: response.data });
      }
      dispatch({ type: LOADER, payload: false });
    } else if (response.data.status === 404) {
      dispatch({ type: LOADER, payload: false });
      toast.error(response.data.message);
    } else if (response.data.status === 400) {
      dispatch({ type: LOADER, payload: false });
    }
    callback(response.data);
  } catch (error) {
    callback(error);
    dispatch({ type: LOADER, payload: false });
    if (error.response && error.response.status === 401) {
      dispatch(handleLogout());
    } else {
      toast.error("Failed to get ICP score");
    }
  }
};

// Geolocation Actions
export const getGeoLocation = (token, callback) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADER, payload: true });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(GET_ALL_COUNTRY, config);
      
      if (response.data.status === 200) {
        dispatch({ type: LOADER, payload: false });
        dispatch({ type: GEOLOCATION_SUCCESS, payload: response.data.result });
        callback(response.data.result);
      } else if (response.data.status === 404) {
        dispatch({ type: LOADER, payload: false });
        toast.error(response?.data?.message || "Failed to fetch countries");
      }
    } catch (error) {
      dispatch({ type: LOADER, payload: false });
      if (error.response && error.response.status === 401) {
        dispatch(handleLogout());
      } else {
        toast.error("Failed to fetch geolocation data");
      }
    }
  };
};

// Intent Range Actions
export const getBomboraIntentRange = (token, callback) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADER, payload: true });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(GET_IntentRange, config);
      
      if (response.status === 200) {
        callback(response.data);
        dispatch({ type: INTENT_RANGE_SUCCESS, payload: response?.data?.data });
        dispatch({ type: LOADER, payload: false });
      } else if (response.data.status === 404) {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch({ type: LOADER, payload: false });
      if (error.response && error.response.status === 401) {
        dispatch(handleLogout());
      } else {
        toast.error("Failed to fetch intent ranges");
      }
    }
  };
};

// Utility Actions
export const tokenAndUid = (data) => {
  return {
    type: SET_TOKEN_UID,
    data: data,
  };
};

export const handleLogout = () => async (dispatch) => {
  try {
    // Clear any stored tokens or user data
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    
    dispatch({ type: LOG_OUT, data: false });
    toast.info("You have been logged out");
  } catch (error) {
    console.error("Logout error:", error);
    dispatch({ type: LOG_OUT, data: false });
  }
};

// Change Password Action
export const change_password = (data, token, callback) => async (dispatch) => {
  try {
    dispatch({ type: LOADER, payload: true });
    
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.post(`${CHANGE_PASSWORD_URL}/`, data, config);
    
    if (response.data.status === 200) {
      dispatch({ type: LOADER, payload: false });
      toast.success("Password changed successfully");
      callback(response.data);
    } else if (response.data.status === 400) {
      dispatch({ type: LOADER, payload: false });
      callback(response.data);
    }
  } catch (error) {
    dispatch({ type: LOADER, payload: false });
    const errorMessage = error.response?.data?.message || "Password change failed";
    toast.error(errorMessage);
    callback({ error: errorMessage });
  }
};

// Resend OTP Actions
export const resendOTPEmail = (payload, callback) => async (dispatch) => {
  try {
    dispatch({ type: LOADER, payload: true });
    
    const response = await axios.post(RESEND_OTP_EMAIL, payload, config);
    
    if (response.data.status === 200) {
      dispatch({ type: LOADER, payload: false });
      toast.success(response.data.message);
      callback(response.data.data);
    } else if (response.data.status === 400) {
      dispatch({ type: LOADER, payload: false });
      toast.error(response.data.message);
    }
  } catch (error) {
    dispatch({ type: LOADER, payload: false });
    const errorMessage = error.response?.data?.message || "Failed to resend OTP";
    toast.error(errorMessage);
    callback({ error: errorMessage });
  }
};

export const resendOTPPhone = (payload, callback) => async (dispatch) => {
  try {
    dispatch({ type: LOADER, payload: true });
    
    const response = await axios.post(RESEND_OTP_PHONE, payload, config);
    
    if (response.data.status === 200) {
      dispatch({ type: LOADER, payload: false });
      toast.success(response.data.message);
      callback(response.data.data);
    } else if (response.data.status === 400) {
      dispatch({ type: LOADER, payload: false });
      toast.error(response.data.message);
    }
  } catch (error) {
    dispatch({ type: LOADER, payload: false });
    const errorMessage = error.response?.data?.message || "Failed to resend OTP";
    toast.error(errorMessage);
    callback({ error: errorMessage });
  }
};
