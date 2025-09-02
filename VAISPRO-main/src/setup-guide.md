# Valasys AI - Complete Initial Setup Guide

## 🚀 Initial Setup Completed

The comprehensive initial setup has been completed with the following enhancements:

### ✅ What's Been Implemented

#### 1. **Enhanced Redux Store Configuration**
- **Location**: `src/context/store.js`
- **Features**: 
  - Redux DevTools integration
  - Persistence configuration
  - Hot module replacement
  - Offline queue handling
  - Network status monitoring

#### 2. **Comprehensive User Actions**
- **Location**: `src/context/actions/User.js`
- **Features**:
  - Complete authentication flow
  - Error handling with toast notifications
  - Token management
  - User profile management
  - ICP score management

#### 3. **Enhanced Reducers**
- **Location**: `src/context/reducers/`
- **Features**:
  - Better state management
  - Error handling
  - Loading states
  - Pagination support
  - Selector functions

#### 4. **Organized API Configuration**
- **Location**: `src/api/api.js`
- **Features**:
  - Grouped endpoints by feature
  - Helper functions
  - Status codes constants
  - Backward compatibility

#### 5. **Comprehensive Routing**
- **Public Routes**: `src/routes/publicRoutes.js`
- **Private Routes**: `src/routes/privateRoutes.js`
- **Features**:
  - Lazy loading
  - Route guards
  - Permission checks
  - Meta information

#### 6. **Advanced Middleware**
- **Location**: `src/context/middleware/index.js`
- **Features**:
  - API error handling
  - Development logging
  - Analytics tracking
  - Local storage sync
  - Network monitoring
  - Performance tracking

#### 7. **Environment Configuration**
- **Location**: `src/config/env.example.js`
- **Features**:
  - Comprehensive configuration
  - Helper functions
  - Feature flags
  - Environment-specific settings

### 🔧 Setup Instructions

#### Step 1: Environment Configuration
```bash
# Copy the environment template
cp src/config/env.example.js src/config/env.js

# Edit the configuration file with your settings
# Update API URLs, keys, and feature flags
```

#### Step 2: Install Dependencies
```bash
# The project uses pnpm as the package manager
pnpm install

# If you don't have pnpm installed:
npm install -g pnpm
```

#### Step 3: Update Your Main App Component
```jsx
// src/App.js
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import configureStore from "./context/store";
import { selectIsLoggedIn } from "./context/reducers";
import privateRoutes from "./routes/privateRoutes";
import publicRoutes from "./routes/publicRoutes";
import LoadingSpinner from "./components/LoadingSpinner";

const { store, persistor } = configureStore();

const App = () => {
  const router = createBrowserRouter([
    // Use selector to determine routes
    store.getState().user?.isLoggedIn ? privateRoutes() : {},
    ...publicRoutes(),
  ]);

  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingSpinner />} persistor={persistor}>
        <RouterProvider router={router} />
        <ToastContainer 
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </PersistGate>
    </Provider>
  );
};

export default App;
```

#### Step 4: Update Your Main Index File
```jsx
// src/main.jsx or src/index.js
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./global.css";

// Additional imports for error boundaries, etc.
import ErrorBoundary from "./components/ErrorBoundary";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
```

### 📁 Directory Structure Created

```
src/
├── api/
│   └── api.js                 # Organized API endpoints
├── context/
│   ├── store.js              # Enhanced Redux store
│   ├── middleware/
│   │   └── index.js          # Custom middleware
│   ├── actions/
│   │   └── User.js           # User actions
│   └── reducers/
│       ├── index.js          # Root reducer with selectors
│       ├── User.js           # User reducers
│       └── Loading.js        # Loading reducer
├── config/
│   ├── index.js              # Store configuration selector
│   ├── http.js               # Enhanced HTTP configuration
│   ├── env.example.js        # Environment template
│   ├── ConfigureStore.dev.js # Development store config
│   └── ConfigureStore.prod.js# Production store config
├── routes/
│   ├── publicRoutes.js       # Public route configuration
│   └── privateRoutes.js      # Private route configuration
├── utils/
│   ├── constants.js          # Action constants
│   └── Validations/
│       ├── Validations.js    # Form validations
│       └── ComonFunctions.js # Common utilities
├── helpers/
│   └── commonHelper.js       # Helper functions
└── json/
    ├── loaderMessages.json   # Loading messages
    └── icp.json             # ICP configuration
```

### 🎯 Key Features Implemented

#### Redux Store Features
- ✅ Persistent state management
- ✅ Redux DevTools integration
- ✅ Middleware for logging, analytics, and error handling
- ✅ Offline support with action queuing
- ✅ Network status monitoring
- ✅ Hot module replacement for development

#### Authentication & Security
- ✅ JWT token management
- ✅ Secure token storage
- ✅ Session timeout handling
- ✅ Automatic logout on token expiration
- ✅ Password security requirements

#### API Management
- ✅ Organized endpoint configuration
- ✅ Request/response interceptors
- ✅ Error handling with user feedback
- ✅ Retry logic for failed requests
- ✅ Loading state management

#### Routing & Navigation
- ✅ Route-based code splitting
- ✅ Permission-based route protection
- ✅ Role-based access control
- ✅ SEO-friendly meta information
- ✅ Breadcrumb support

### 🔧 Configuration Options

#### Feature Flags
Enable/disable features by updating `src/config/env.js`:
```javascript
FEATURES: {
  ENABLE_ANALYTICS: true,
  ENABLE_CHAT_SUPPORT: true,
  ENABLE_NOTIFICATIONS: true,
  ENABLE_DARK_MODE: false,
  ENABLE_BETA_FEATURES: false,
  // ... more options
}
```

#### API Configuration
```javascript
API: {
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
  RATE_LIMIT: 100
}
```

#### Debug Settings
```javascript
DEBUG: {
  DEBUG_MODE: false,
  LOG_LEVEL: 'info',
  ENABLE_REDUX_DEVTOOLS: true,
  ENABLE_PERFORMANCE_MONITORING: true
}
```

### 🚀 Next Steps

1. **Copy and configure environment**: `cp src/config/env.example.js src/config/env.js`
2. **Update API endpoints** in your environment configuration
3. **Configure external services** (Google Analytics, Stripe, etc.)
4. **Set up authentication** by updating the auth service URLs
5. **Test the setup** by running `pnpm dev`

### 🛠️ Development Tools

#### Redux DevTools
- Access Redux DevTools in browser developer tools
- View action history, state changes, and time travel debugging
- Sensitive data is automatically sanitized

#### Performance Monitoring
- Slow actions are logged in development
- Network status is monitored and displayed
- Offline actions are queued and replayed when online

#### Error Handling
- Global error boundary catches React errors
- API errors are handled with user-friendly messages
- Automatic retry for network failures

### 📚 Usage Examples

#### Dispatching Actions
```javascript
import { useDispatch } from 'react-redux';
import { user_signin } from '../context/actions/User';

const dispatch = useDispatch();

const handleLogin = (credentials) => {
  dispatch(user_signin(credentials, (response) => {
    if (response.success) {
      // Handle successful login
    } else {
      // Handle login error
    }
  }));
};
```

#### Using Selectors
```javascript
import { useSelector } from 'react-redux';
import { selectIsLoggedIn, selectUserInfo } from '../context/reducers';

const MyComponent = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userInfo = useSelector(selectUserInfo);
  
  return (
    <div>
      {isLoggedIn ? `Welcome ${userInfo.name}` : 'Please login'}
    </div>
  );
};
```

#### Feature Flag Usage
```javascript
import { isFeatureEnabled } from '../config/http';

const MyComponent = () => {
  return (
    <div>
      {isFeatureEnabled('enableChatSupport') && <ChatWidget />}
      {isFeatureEnabled('enableDarkMode') && <ThemeToggle />}
    </div>
  );
};
```

### 🔒 Security Considerations

- ✅ Tokens are stored securely
- ✅ Sensitive data is sanitized in DevTools
- ✅ CSP headers can be enabled
- ✅ HTTPS is enforced in production
- ✅ Session timeouts are configurable

### 📞 Support

If you encounter any issues with the setup:

1. Check the console for error messages
2. Verify your environment configuration
3. Ensure all dependencies are installed
4. Review the network tab for API issues

The setup is now complete and production-ready! 🎉
