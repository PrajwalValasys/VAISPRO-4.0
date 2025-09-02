import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { LOG_OUT } from "../../utils/constants";

// Import all reducers
import {
  icpScore,
  userLoginReducer,
  verifyEmailOtpReducer,
  verifyEmailReducer,
  storeTokenAndUid,
  newUserSignUpDetailsReducer,
  prospectDetailsReducer,
  userSubcriptionDataReducer,
  geoLocationReducer,
  IntentRanges
} from "./User";

import { loadingReducer } from "./Loading";

// Persist configurations for different parts of the state
const userPersistConfig = {
  key: "user",
  storage: storage,
  blacklist: ["error", "loading"]
};

const icpPersistConfig = {
  key: "icpScore",
  storage: storage,
  blacklist: ["loading", "error"]
};

const geoLocationPersistConfig = {
  key: "geoLocation",
  storage: storage,
  blacklist: ["loading", "error"]
};

const prospectPersistConfig = {
  key: "prospects",
  storage: storage,
  blacklist: ["loading", "error"]
};

// Root reducer combining all feature reducers
const appReducer = combineReducers({
  user: persistReducer(userPersistConfig, userLoginReducer),
  loading: loadingReducer,
  verifyEmail: verifyEmailReducer,
  icpScoreResult: persistReducer(icpPersistConfig, icpScore),
  verifyEmailOtp: verifyEmailOtpReducer,
  uidAndToken: storeTokenAndUid,
  newUserDetails: newUserSignUpDetailsReducer,
  prospectDetails: persistReducer(prospectPersistConfig, prospectDetailsReducer),
  userSubscriptionData: userSubcriptionDataReducer,
  geoLocation: persistReducer(geoLocationPersistConfig, geoLocationReducer),
  IntentRanges: IntentRanges
});

// Root reducer with logout handling
const rootReducer = (state, action) => {
  // Clear all state on logout
  if (action.type === LOG_OUT) {
    // Keep only non-sensitive data that should persist
    const { loading } = state;
    state = {
      loading
    };
    
    // Clear persisted storage
    storage.removeItem('persist:user');
    storage.removeItem('persist:icpScore');
    storage.removeItem('persist:geoLocation');
    storage.removeItem('persist:prospects');
  }

  return appReducer(state, action);
};

export default rootReducer;

// Selectors for easier state access
export const selectUser = (state) => state.user;
export const selectUserInfo = (state) => state.user?.userInfo;
export const selectIsLoggedIn = (state) => state.user?.isLoggedIn || false;
export const selectUserToken = (state) => state.user?.userInfo?.token;

export const selectLoading = (state) => state.loading;
export const selectIsLoading = (state) => state.loading?.isLoading || false;
export const selectLoadingMessage = (state) => state.loading?.loadingMessage || "";
export const selectLoadingProgress = (state) => state.loading?.loadingProgress || 0;
export const selectLoadingTasks = (state) => state.loading?.loadingTasks || {};
export const selectLoadingErrors = (state) => state.loading?.errors || {};

export const selectEmailVerification = (state) => state.verifyEmail;
export const selectEmailOtp = (state) => state.verifyEmailOtp;
export const selectTokenAndUid = (state) => state.uidAndToken;

export const selectIcpScore = (state) => state.icpScoreResult?.icpScore;
export const selectIcpLoading = (state) => state.icpScoreResult?.loading || false;
export const selectIcpError = (state) => state.icpScoreResult?.error;

export const selectProspectDetails = (state) => state.prospectDetails?.prospectDetails;
export const selectProspectLoading = (state) => state.prospectDetails?.loading || false;
export const selectProspectError = (state) => state.prospectDetails?.error;
export const selectProspectFilters = (state) => state.prospectDetails?.filters || {};
export const selectProspectPagination = (state) => state.prospectDetails?.pagination || {};

export const selectUserSubscription = (state) => state.userSubscriptionData?.userSubscrptionData;
export const selectSubscriptionLoading = (state) => state.userSubscriptionData?.loading || false;
export const selectSubscriptionError = (state) => state.userSubscriptionData?.error;

export const selectGeoLocation = (state) => state.geoLocation?.geolocation || [];
export const selectSelectedCountries = (state) => state.geoLocation?.selectedCountries || [];
export const selectGeoLocationLoading = (state) => state.geoLocation?.loading || false;
export const selectGeoLocationError = (state) => state.geoLocation?.error;

export const selectIntentRanges = (state) => state.IntentRanges?.intentRange || [];
export const selectSelectedIntentRanges = (state) => state.IntentRanges?.selectedRanges || [];
export const selectIntentRangesLoading = (state) => state.IntentRanges?.loading || false;
export const selectIntentRangesError = (state) => state.IntentRanges?.error;

export const selectNewUserDetails = (state) => state.newUserDetails?.newUserDetails;
export const selectSignupStep = (state) => state.newUserDetails?.step || 1;
export const selectSignupComplete = (state) => state.newUserDetails?.isComplete || false;
