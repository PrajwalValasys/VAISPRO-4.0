import { thunk } from "redux-thunk";

// Custom middleware for API error handling
const apiErrorMiddleware = (store) => (next) => (action) => {
  // Handle API errors globally
  if (action.type && action.type.endsWith('_ERROR')) {
    console.error('API Error:', action.payload);
    
    // Dispatch global error action if needed
    if (action.payload && action.payload.status === 401) {
      // Handle unauthorized errors
      store.dispatch({ type: 'LOG_OUT' });
    }
  }
  
  return next(action);
};

// Custom middleware for logging in development
const loggerMiddleware = (store) => (next) => (action) => {
  if (process.env.NODE_ENV === 'development') {
    console.group(`Action: ${action.type}`);
    console.log('Previous State:', store.getState());
    console.log('Action:', action);
    
    const result = next(action);
    
    console.log('Next State:', store.getState());
    console.groupEnd();
    
    return result;
  }
  
  return next(action);
};

// Custom middleware for analytics tracking
const analyticsMiddleware = (store) => (next) => (action) => {
  // Track important user actions
  const trackableActions = [
    'REQUEST_LOGIN_SUCCESS',
    'LOG_OUT',
    'ICP_SCORE_SUCCESS',
    'PROSPECT_DETAILS_SUCCESS'
  ];
  
  if (trackableActions.includes(action.type)) {
    // Send analytics data (replace with your analytics service)
    if (window.gtag) {
      window.gtag('event', action.type, {
        event_category: 'user_action',
        event_label: action.type
      });
    }
  }
  
  return next(action);
};

// Custom middleware for local storage sync
const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  
  // Save specific state to local storage
  const state = store.getState();
  
  // Save user preferences
  if (action.type === 'SET_USER_PREFERENCES') {
    localStorage.setItem('userPreferences', JSON.stringify(action.payload));
  }
  
  // Save recent searches
  if (action.type === 'ADD_RECENT_SEARCH') {
    const recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    recentSearches.unshift(action.payload);
    // Keep only last 10 searches
    const limitedSearches = recentSearches.slice(0, 10);
    localStorage.setItem('recentSearches', JSON.stringify(limitedSearches));
  }
  
  return result;
};

// Custom middleware for network status handling
const networkMiddleware = (store) => (next) => (action) => {
  // Handle offline/online status
  if (!navigator.onLine && action.type && action.type.includes('_REQUEST')) {
    // Queue actions when offline
    const offlineQueue = JSON.parse(localStorage.getItem('offlineQueue') || '[]');
    offlineQueue.push(action);
    localStorage.setItem('offlineQueue', JSON.stringify(offlineQueue));
    
    // Dispatch offline notification
    store.dispatch({
      type: 'SET_NETWORK_STATUS',
      payload: { online: false, message: 'You are currently offline. Actions will be queued.' }
    });
    
    return;
  }
  
  return next(action);
};

// Custom middleware for performance monitoring
const performanceMiddleware = (store) => (next) => (action) => {
  const start = performance.now();
  const result = next(action);
  const end = performance.now();
  
  const duration = end - start;
  
  // Log slow actions in development
  if (process.env.NODE_ENV === 'development' && duration > 100) {
    console.warn(`Slow action detected: ${action.type} took ${duration.toFixed(2)}ms`);
  }
  
  // Track performance metrics
  if (window.performance && window.performance.mark) {
    window.performance.mark(`action-${action.type}-end`);
  }
  
  return result;
};

// Custom middleware for state validation
const validationMiddleware = (store) => (next) => (action) => {
  if (process.env.NODE_ENV === 'development') {
    // Validate action structure
    if (!action.type) {
      console.error('Action must have a type property:', action);
    }
    
    // Validate specific action payloads
    if (action.type === 'REQUEST_LOGIN_SUCCESS' && !action.payload.token) {
      console.warn('Login success action should include a token');
    }
  }
  
  return next(action);
};

// Configure middleware array based on environment
const configureMiddleware = () => {
  const middleware = [thunk];
  
  if (process.env.NODE_ENV === 'development') {
    middleware.push(
      validationMiddleware,
      loggerMiddleware,
      performanceMiddleware
    );
  }
  
  middleware.push(
    apiErrorMiddleware,
    analyticsMiddleware,
    localStorageMiddleware,
    networkMiddleware
  );
  
  return middleware;
};

export default configureMiddleware;

// Export individual middleware for testing
export {
  apiErrorMiddleware,
  loggerMiddleware,
  analyticsMiddleware,
  localStorageMiddleware,
  networkMiddleware,
  performanceMiddleware,
  validationMiddleware
};
