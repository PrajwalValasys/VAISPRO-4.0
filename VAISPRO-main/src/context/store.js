import { createStore, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./reducers";

// Redux persist configuration
const persistConfig = {
  key: "root",
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
  ]
};

// Apply persistence to root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure Redux DevTools Extension
const composeEnhancers = 
  (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// Create store with middleware
const configureStore = () => {
  const store = createStore(
    persistedReducer,
    composeEnhancers(
      applyMiddleware(thunk)
    )
  );

  const persistor = persistStore(store);

  // Enable hot module replacement for reducers in development
  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default;
      store.replaceReducer(persistReducer(persistConfig, nextRootReducer));
    });
  }

  return { store, persistor };
};

export default configureStore;
