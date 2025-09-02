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
  bundleplan,
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
  BUNDLE_PLAN,
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
} from "../../utils/constants";

const config = {
  headers: {
    "Content-type": "application/json",
  },
};

//User Login Action
export const user_signin = (data1, callback) => async (dispatch) => {
  try {
    dispatch({ type: LOADER, payload: true });

    const response = await axios.post(LOGIN_URL, data1, config);

    if (response.data.status === 200) {
      if (response.data.data?.is_active) {
        dispatch({ type: REQUEST_LOGIN_SUCCESS, payload: response.data.data });
        dispatch({ type: LOADER, payload: false });

        callback(response.data);
        toast(response.data.message, { autoClose: 3000 });
      } else {
        dispatch({ type: LOADER, payload: false });
        toast(
          "Account is not active contact Admin or Incomplete Email and Phone Verification ",
          { autoClose: 4000 }
        );
      }
    } else if (response.data.status === 401) {
      dispatch({ type: LOADER, payload: false });
      toast.info(<div dangerouslySetInnerHTML={{ __html: response.data.message }} />, { autoClose: 4000 });

      // toast(response.data.message, { autoClose: 4000 });
    } else if (response.data.status === 429) {
      dispatch({ type: LOADER, payload: false });
      toast("Too many failed login attempts. Try again after 10 minutes.")
    }
  } catch (error) {
    dispatch({ type: LOADER, payload: false });
    if (error) {
      toast("Something Went Wrong", { autoClose: 4000 });
    }
  }
};

//set Business Email Action
export const set_business_email = (data3, callback) => async (dispatch) => {
  try {
    dispatch({ type: LOADER, payload: true });

    const response = await axios.post(VERIFY_EMAIL, data3, config);

    if (response.data.status === 200) {
      dispatch({ type: USER_EMAIL_SUCCESS, payload: data3 });
      dispatch({ type: LOADER, payload: false });
      callback(response.data);
    } else if (response.data.status === 409) {
      dispatch({ type: LOADER, payload: false });
      callback(response.data);
    }
  } catch (error) {
    dispatch({ type: LOADER, payload: false });

    if (error?.response?.data?.status === 400) {
      toast(error.response.data.message || "Invalid email format", { autoClose: 4000 });
      callback(error.response.data); // optionally pass it back
    } else {
      toast("Something Went Wrong", { autoClose: 4000 });
    }
  }
};

// User Registration Action
export const user_signup = (data2, callback) => async (dispatch) => {
  try {
    dispatch({ type: LOADER, payload: true });

    const response = await axios.post(REGISTER_URL, data2, config);

    if (response.data.status === 200) {
      data2.password = undefined;
      data2.re_password = undefined;
      dispatch({
        type: NEW_USER_SIGNUP_DETAIL,
        payload: { ...data2, user_id: response.data.data.user_id },
      });
      dispatch({ type: LOADER, payload: false });

      toast(response.data.message, { autoClose: 4000 });
      callback(response.data.data);
    } else if (response.data.status === 409) {
      dispatch({ type: LOADER, payload: false });

      toast(response.data.message, { autoClose: 4000 });
    }
  } catch (error) {
    dispatch({ type: LOADER, payload: false });
    if (error) {
      toast("Something Went Wrong", { autoClose: 4000 });
    }
  }
};

//Logout Action
export const handleLogout = () => async (dispatch) => {
  dispatch({ type: "LOG_OUT", data: false });
};

// Additional actions can be added here following the same pattern...
