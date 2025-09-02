export const URL =  {
    "development": {
      "http": process.env.REACT_APP_LOCAL_BACKEND_URL
    },
    "staging": {
      "http": process.env.REACT_APP_STAGING_BACKEND_URL
    },
    "prod": {
      "http": process.env.REACT_APP_PROD_BACKEND_URL
    }
}

export const HOSTURL =  {
  "development": {
    "http": process.env.REACT_APP_LOCAL_URL
  },
  "staging": {
    "http": process.env.REACT_APP_STAGING_URL
  },
  "prod": {
    "http": process.env.REACT_APP_PROD_URL
  }
}

export const BUILD_ENV = parseInt(process.env.REACT_APP_BUILD_ENV);

const baseUrls = {
  0: HOSTURL.development.http,
  1: HOSTURL.staging.http,
  2: HOSTURL.prod.http,
};

export const hostURl = baseUrls[BUILD_ENV];

const baseBackendUrls = {
  0: URL.development.http,
  1: URL.staging.http,
  2: URL.prod.http,
};

export const hostBackURl = baseBackendUrls[BUILD_ENV];
