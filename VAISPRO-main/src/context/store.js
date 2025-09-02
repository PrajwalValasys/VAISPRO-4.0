import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./reducers";
import configureMiddleware from "./middleware";

// Redux persist configuration
const persistConfig = {
  key: "valasys-ai-root",
  version: 1,
  storage: storage,
  blacklist: ["loading"], // Don't persist loading state
  whitelist: [
    "user", 
    "verifyEmail", 
    "icpScoreResult", 
    "verifyEmailOtp", 
    "uidAndToken", 
    "newUserDetails", 
    "prospectDetails", 
    "userSubscriptionData", 
    "geoLocation", 
    "IntentRanges"
  ],
  // Migrate state if needed
  migrate: (state) => {
    // Handle state migration between versions
    if (state && state._persist && state._persist.version < 1) {
      // Perform migration logic here
      return {
        ...state,
        _persist: { ...state._persist, version: 1 }
      };
    }
    return state;
  }
};

// Apply persistence to root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure Redux DevTools Extension with options
const devToolsOptions = {
  name: 'Valasys AI Store',
  trace: true,
  traceLimit: 25,
  maxAge: 50,
  actionCreators: {},
  stateSanitizer: (state) => {
    // Remove sensitive data from DevTools
    const sanitized = { ...state };
    if (sanitized.user && sanitized.user.userInfo) {
      sanitized.user = {
        ...sanitized.user,
        userInfo: {
          ...sanitized.user.userInfo,
          token: '[REDACTED]',
          password: '[REDACTED]'
        }
      };
    }
    return sanitized;
  },
  actionSanitizer: (action) => {
    // Remove sensitive data from actions
    if (action.type === 'REQUEST_LOGIN_SUCCESS' && action.payload) {
      return {
        ...action,
        payload: {
          ...action.payload,
          token: '[REDACTED]',
          password: '[REDACTED]'
        }
      };
    }
    return action;
  }
};

// Configure Redux DevTools Extension
const composeEnhancers = 
  (typeof window !== 'undefined' && 
   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
   process.env.NODE_ENV === 'development') 
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(devToolsOptions)
    : compose;

// Create store with enhanced configuration
const configureStore = () => {
  const middleware = configureMiddleware();
  
  const store = createStore(
    persistedReducer,
    composeEnhancers(
      applyMiddleware(...middleware)
    )
  );

  const persistor = persistStore(store, null, () => {
    // Callback after rehydration
    console.log('Store rehydrated');
    
    // Handle offline queue after rehydration
    const offlineQueue = JSON.parse(localStorage.getItem('offlineQueue') || '[]');
    if (offlineQueue.length > 0 && navigator.onLine) {
      console.log('Processing offline queue:', offlineQueue.length, 'actions');
      offlineQueue.forEach(action => store.dispatch(action));
      localStorage.removeItem('offlineQueue');
    }
  });

  // Enable hot module replacement for reducers in development
  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default;
      store.replaceReducer(persistReducer(persistConfig, nextRootReducer));
    });
  }

  // Add store utilities for debugging
  if (process.env.NODE_ENV === 'development') {
    window.store = store;
    window.persistor = persistor;
    
    // Add helper functions
    window.getState = () => store.getState();
    window.clearStore = () => {
      persistor.purge();
      localStorage.clear();
      window.location.reload();
    };
  }

  // Handle network status changes
  const handleOnline = () => {
    store.dispatch({
      type: 'SET_NETWORK_STATUS',
      payload: { online: true, message: 'You are back online' }
    });
    
    // Process offline queue
    const offlineQueue = JSON.parse(localStorage.getItem('offlineQueue') || '[]');
    if (offlineQueue.length > 0) {
      console.log('Processing offline queue:', offlineQueue.length, 'actions');
      offlineQueue.forEach(action => store.dispatch(action));
      localStorage.removeItem('offlineQueue');
    }
  };

  const handleOffline = () => {
    store.dispatch({
      type: 'SET_NETWORK_STATUS',
      payload: { online: false, message: 'You are currently offline' }
    });
  };

  // Listen for network changes
  if (typeof window !== 'undefined') {
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
  }

  return { store, persistor };
};

export default configureStore;

// Export store utilities
export const createStoreInstance = configureStore;
export { persistConfig };
