export const LOG_OUT = "LOG_OUT";
export const REQUEST_LOGIN_SUCCESS = "REQUEST_LOGIN_SUCCESS";
export const USER_EMAIL_SUCCESS = "USER_EMAIL_SUCCESS";
export const LOADER = "LOADER";
export const USER_EMAIL_OTP_SUCCESS = "USER_EMAIL_OTP_SUCCESS";
export const SET_TOKEN_UID = "SET_TOKEN_UID";
export const NEW_USER_SIGNUP_DETAIL = "NEW_USER_SIGNUP_DETAIL";
export const ICP_SCORE_SUCCESS = "ICP_SCORE_SUCCESS";
export const PROSPECT_DETAILS_SUCCESS = "PROSPECT_DETAILS_SUCCESS";
export const USER_SUBSCRIPTION_DATA_SUCCESS = "USER_SUBSCRIPTION_DATA_SUCCESS";
export const GEOLOCATION_SUCCESS ="GEOLOCATION_SUCCESS"
export const INTENT_RANGE_SUCCESS ="INTENT_RANGE_SUCCESS"
// //Local site key
// export const SITE_KEY = "6Lf5-i8pAAAAABIwcvLDzdcOseKBx5BHw9xkVQkE";
//Staging site key
// export const SITE_KEY = "6LcE6TQpAAAAAI9Y8xMFV6iH5GRgPIuQfvc880-Z";
//Production site key

export const SITE_KEY = '6Ld7dygpAAAAACiHzxJ9F5TTdAJl25uxmqHK0IjZ';

export const industryWeightage = [
  { value: "H", label: "High" },
  { value: "M", label: "Medium" },
  { value: "L", label: "Low" },
];

export const revenueWeightage = [
  { value: "H", label: "High" },
  { value: "M", label: "Medium" },
  { value: "L", label: "Low" },
];

export const companySizeWeightage = [
  { value: "H", label: "High" },
  { value: "M", label: "Medium" },
  { value: "L", label: "Low" },
];

export const ITEMS_PER_PAGE = 1000;
export const BASE_URL = "https://sdeiaiml.com:9005";

export const signalRank = (data, name) => {
  const found = data.find(item => item.name === name);
  return found ? Number(found.from_value) : 0;
};

export const FirstLetterCapital = (full_name) => {
  if (!full_name) return ""; // Return an empty string if input is empty

  return full_name
    .split(" ") // Split the full name into individual words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter of each word
    .join(" "); // Join the words back together
};

export const intentSignal = (ranges, topics, lentopic) => {
  const className = {
    Strong: "strong",
    "Very Strong": "very-strong",
    "Super Strong": "super-strong",
  };

  // Case for lentopic = 1
  if (lentopic == 1) {
    if (!topics || topics.length === 0) {
      return <span className="intent-signal custom-td">Domain shows no intent</span>;
    }

    const compositeScore = topics[0]?.score || 0;

    if (compositeScore >= 60 && compositeScore <= 70) {
      return <span className={`intent-signal ${className["Strong"]} custom-td`}>Strong</span>;
    } else if (compositeScore >= 71 && compositeScore <= 85) {
      return <span className={`intent-signal ${className["Very Strong"]} custom-td`}>Very Strong</span>;
    } else if (compositeScore >= 86) {
      return <span className={`intent-signal ${className["Super Strong"]} custom-td`}>Super Strong</span>;
    }
  } 
  
  // Case for lentopic = 2
  else if (lentopic == 2) {
    if (!topics || topics.length === 0) {
      return <span className="intent-signal custom-td">0/2 topics</span>;
    }

    const compositeScore = topics[0]?.score || 0;

    if (topics.length === 1 && compositeScore < 75) {
      return <span className={`intent-signal ${className["Strong"]} custom-td`}>Strong</span>;
    } else if (topics.length === 1 && compositeScore >= 75) {
      return <span className={`intent-signal ${className["Very Strong"]} custom-td`}>Very Strong</span>;
    } else if (topics.length === 2) {
      return <span className={`intent-signal ${className["Super Strong"]} custom-td`}>Super Strong</span>;
    }
  } 
  
  // Case for lentopic = 3
  else if (lentopic == 3) {
    const numMatched = Array.isArray(topics) ? topics.length : 0;

    if (numMatched === 0) {
      return <span className="intent-signal custom-td">0/3 topics</span>;
    } else if (numMatched === 1) {
      return <span className={`intent-signal ${className["Strong"]} custom-td`}>Strong</span>;
    } else if (numMatched === 2) {
      return <span className={`intent-signal ${className["Very Strong"]} custom-td`}>Very Strong</span>;
    } else if (numMatched === 3) {
      return <span className={`intent-signal ${className["Super Strong"]} custom-td`}>Super Strong</span>;
    }
  }

  // Case for lentopic >= 4
  else if (lentopic >= 4) {
    const numMatched = Array.isArray(topics) ? topics.length : 0;

    if (numMatched === 0) {
      return <span className="intent-signal custom-td"></span>;
    } else if (numMatched === 1) {
      return <span className={`intent-signal ${className["Strong"]} custom-td`}>Strong</span>;
    } else if (numMatched === 2 || numMatched === 3) {
      return <span className={`intent-signal ${className["Very Strong"]} custom-td`}>Very Strong</span>;
    } else if (numMatched >= 4) {
      return <span className={`intent-signal ${className["Super Strong"]} custom-td`}>Super Strong</span>;
    }
  }

  // Default case for unmatched conditions
  return <span className="intent-signal custom-td">-</span>;
};
