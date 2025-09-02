import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";

// Lazy load components for better performance
const Layout = React.lazy(() => import("../components/Layout/Layout"));
const Dashboard = React.lazy(() => import("../pages/Dashboard/Dashboard"));
const ABMLAL = React.lazy(() => import("../pages/ABMLAL/ABMLAL"));
const ChangePassword = React.lazy(() => import("../pages/Auth/ChangePassword"));
const BuildYourICP = React.lazy(() => import("../pages/BuildICP/BuildYourICP"));
const ICPResult = React.lazy(() => import("../pages/BuildICP/ICPResult/ICPResult"));
const ICPScore = React.lazy(() => import("../pages/BuildICP/ICPScore/ICPScore"));
const Faqs = React.lazy(() => import("../pages/Faqs/Faqs"));
const FindProspects = React.lazy(() => import("../pages/FindProspects/FindProspects"));
const MyDownloadList = React.lazy(() => import("../pages/MyDownloadList/MyDownloadList"));
const PageNotFound = React.lazy(() => import("../pages/PageNotFound"));
const MyProfile = React.lazy(() => import("../pages/Profile/MyProfile"));
const ProfileSettings = React.lazy(() => import("../pages/Profile/Settings/ProfileSettings"));
const SupportTicket = React.lazy(() => import("../pages/SupportTicket/SupportTicket"));
const NewSupportTicket = React.lazy(() => import("../pages/SupportTicket/NewSupportTicket/NewSupportTicket"));
const ABMResult = React.lazy(() => import("../pages/ABMLAL/ABMResult/ABMResult"));
const LALResults = React.lazy(() => import("../pages/ABMLAL/LALResults/LALResults"));
const FindProspectResult = React.lazy(() => import("../pages/FindProspects/FindProspectResult/FindProspectResult"));
const Subscription = React.lazy(() => import("../pages/Subscription/Subscription"));
const PaymentDetails = React.lazy(() => import("../pages/Payment/PaymentDetails"));
const CreditPaymentDetails = React.lazy(() => import("../pages/CreditPayment/CreditPaymentDetails"));
const Ticket = React.lazy(() => import("../pages/SupportTicket/Ticket/Ticket"));
const UpdateEmailVerification = React.lazy(() => import("../pages/Profile/Settings/UpdateEmailVerification"));
const UpdatePhoneVerification = React.lazy(() => import("../pages/Profile/Settings/UpdatePhoneNumberVerification"));
const UserList = React.lazy(() => import("../pages/ManageUsers/UserList"));
const AddUser = React.lazy(() => import("../pages/ManageUsers/AddUser"));
const SpendingHistory = React.lazy(() => import("../pages/SpendingHistory/SpendingHistory"));
const AddCampaign = React.lazy(() => import("../pages/Buildcampaign/AddCampaign"));
const Index = React.lazy(() => import("../pages/Buildcampaign/Index"));
const BuildMyCampaign = React.lazy(() => import("../pages/Buildcampaign/BuildMyCampaign"));
const ViewAllNotification = React.lazy(() => import("../pages/Notification/ViewAllNotification"));
const CampaignTracker = React.lazy(() => import("../pages/Buildcampaign/CampaignTracker"));
const ThankYou = React.lazy(() => import("../pages/ThankYou/ThankYou"));

// Loading component
const LoadingSpinner = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="200px"
  >
    <CircularProgress />
  </Box>
);

// Higher-order component for adding suspense
const withSuspense = (Component) => {
  return function SuspenseWrapper(props) {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <Component {...props} />
      </Suspense>
    );
  };
};

// Permission-based route wrapper
function RequireSubscribed({ children }) {
  const isSubscribed = useSelector(
    (state) => state?.userSubscriptionData?.userSubscrptionData
  );
  
  if (isSubscribed?.data?.is_free_trial) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
}

// Role-based route wrapper
function RequireRole({ children, roles = [] }) {
  const user = useSelector((state) => state?.user?.userInfo);
  const userRole = user?.role || 'user';
  
  if (roles.length > 0 && !roles.includes(userRole)) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
}

// Premium feature wrapper
function RequirePremium({ children, fallbackPath = "/subscription-plans" }) {
  const subscription = useSelector(
    (state) => state?.userSubscriptionData?.userSubscrptionData
  );
  
  const isPremium = subscription?.data?.plan_type === 'premium' || 
                   subscription?.data?.plan_type === 'enterprise';
  
  if (!isPremium) {
    return <Navigate to={fallbackPath} replace />;
  }
  
  return children;
}

// Route configuration
const routeConfig = [
  // Dashboard and main routes
  {
    path: "/dashboard",
    element: withSuspense(Dashboard),
    meta: { title: "Dashboard", description: "Main dashboard overview", protected: true }
  },
  
  // Profile and settings routes
  {
    path: "/settings",
    element: withSuspense(ProfileSettings),
    meta: { title: "Settings", description: "Account settings", protected: true }
  },
  {
    path: "/my-profile",
    element: withSuspense(MyProfile),
    meta: { title: "My Profile", description: "User profile information", protected: true }
  },
  {
    path: "/change-password",
    element: withSuspense(ChangePassword),
    meta: { title: "Change Password", description: "Update account password", protected: true }
  },
  {
    path: "/settings-email-verification",
    element: withSuspense(UpdateEmailVerification),
    meta: { title: "Email Verification", description: "Verify email update", protected: true }
  },
  {
    path: "/settings-phone-verification",
    element: withSuspense(UpdatePhoneVerification),
    meta: { title: "Phone Verification", description: "Verify phone update", protected: true }
  },

  // ICP and VAIS routes
  {
    path: "/build-your-vais",
    element: withSuspense(BuildYourICP),
    meta: { title: "Build Your VAIS", description: "Create ideal customer profile", protected: true }
  },
  {
    path: "/build-your-vais/vais-score",
    element: withSuspense(ICPScore),
    meta: { title: "VAIS Score", description: "View VAIS score results", protected: true }
  },
  {
    path: "/build-your-vais/vais-result",
    element: withSuspense(ICPResult),
    meta: { title: "VAIS Results", description: "Detailed VAIS analysis results", protected: true }
  },

  // ABM and LAL routes
  {
    path: "/abm-lal",
    element: withSuspense(ABMLAL),
    meta: { title: "ABM & LAL", description: "Account-based marketing and lookalike audiences", protected: true }
  },
  {
    path: "/abm-lal/abm-results",
    element: withSuspense(ABMResult),
    meta: { title: "ABM Results", description: "Account-based marketing results", protected: true }
  },
  {
    path: "/abm-lal/lal-results",
    element: withSuspense(LALResults),
    meta: { title: "LAL Results", description: "Lookalike audience results", protected: true }
  },

  // Prospect management routes
  {
    path: "/find-prospects",
    element: withSuspense(FindProspects),
    meta: { title: "Find Prospects", description: "Search and discover prospects", protected: true }
  },
  {
    path: "/find-prospects/prospect-details-result",
    element: withSuspense(FindProspectResult),
    meta: { title: "Prospect Results", description: "Detailed prospect search results", protected: true }
  },

  // Downloads and lists
  {
    path: "/my-download-list",
    element: withSuspense(MyDownloadList),
    meta: { title: "My Downloads", description: "Downloaded prospect lists", protected: true }
  },

  // Campaign management routes
  {
    path: "/campaign-list",
    element: withSuspense(Index),
    meta: { title: "Campaigns", description: "Campaign management", protected: true }
  },
  {
    path: "/build-campaign",
    element: withSuspense(AddCampaign),
    meta: { title: "Build Campaign", description: "Create new campaign", protected: true }
  },
  {
    path: "/build-my-campaign/:id",
    element: withSuspense(BuildMyCampaign),
    meta: { title: "Build My Campaign", description: "Edit campaign details", protected: true }
  },
  {
    path: "/track-campaigns",
    element: withSuspense(CampaignTracker),
    meta: { title: "Campaign Tracker", description: "Track campaign performance", protected: true }
  },

  // Support routes
  {
    path: "/frequently-asked-questions",
    element: withSuspense(Faqs),
    meta: { title: "FAQs", description: "Frequently asked questions", protected: true }
  },
  {
    path: "/support-tickets",
    element: withSuspense(SupportTicket),
    meta: { title: "Support Tickets", description: "Manage support tickets", protected: true }
  },
  {
    path: "/raise-new-ticket",
    element: withSuspense(NewSupportTicket),
    meta: { title: "New Ticket", description: "Create support ticket", protected: true }
  },
  {
    path: "/ticket",
    element: withSuspense(Ticket),
    meta: { title: "Ticket Details", description: "View ticket details", protected: true }
  },

  // Subscription and billing routes
  {
    path: "/subscription-plans",
    element: (
      <RequireSubscribed>
        {withSuspense(Subscription)}
      </RequireSubscribed>
    ),
    meta: { title: "Subscription Plans", description: "Choose subscription plan", protected: true }
  },
  {
    path: "/payments",
    element: withSuspense(PaymentDetails),
    meta: { title: "Payments", description: "Payment history and details", protected: true }
  },
  {
    path: "/credit-payments",
    element: (
      <RequireSubscribed>
        {withSuspense(CreditPaymentDetails)}
      </RequireSubscribed>
    ),
    meta: { title: "Credit Payments", description: "Credit purchase history", protected: true }
  },
  {
    path: "/spending-history",
    element: withSuspense(SpendingHistory),
    meta: { title: "Spending History", description: "Account spending history", protected: true }
  },

  // User management routes (Admin/Manager only)
  {
    path: "/manage-users",
    element: (
      <RequireSubscribed>
        <RequireRole roles={['admin', 'manager']}>
          {withSuspense(UserList)}
        </RequireRole>
      </RequireSubscribed>
    ),
    meta: { title: "Manage Users", description: "User management", protected: true, roles: ['admin', 'manager'] }
  },
  {
    path: "/manage-users/add-user",
    element: (
      <RequireSubscribed>
        <RequireRole roles={['admin', 'manager']}>
          {withSuspense(AddUser)}
        </RequireRole>
      </RequireSubscribed>
    ),
    meta: { title: "Add User", description: "Add new user", protected: true, roles: ['admin', 'manager'] }
  },
  {
    path: "/manage-users/edit-user/:id",
    element: (
      <RequireSubscribed>
        <RequireRole roles={['admin', 'manager']}>
          {withSuspense(AddUser)}
        </RequireRole>
      </RequireSubscribed>
    ),
    meta: { title: "Edit User", description: "Edit user details", protected: true, roles: ['admin', 'manager'] }
  },

  // Notifications
  {
    path: "/view-all-notifications",
    element: withSuspense(ViewAllNotification),
    meta: { title: "Notifications", description: "All notifications", protected: true }
  },

  // Success and thank you pages
  {
    path: "/thanks",
    element: withSuspense(ThankYou),
    meta: { title: "Thank You", description: "Thank you page", protected: true }
  },

  // Error and fallback routes
  {
    path: "/not-found",
    element: withSuspense(PageNotFound),
    meta: { title: "Page Not Found", description: "The requested page was not found", protected: true }
  },
  {
    path: "*",
    element: <Navigate to="/not-found" replace />,
    meta: { title: "Redirect", description: "Redirecting to not found page", protected: true }
  }
];

// Generate routes for React Router
const privateRoutes = () => {
  return {
    element: withSuspense(Layout),
    children: routeConfig.map(({ meta, ...route }) => route)
  };
};

export default privateRoutes;

// Export route configuration and utilities
export { routeConfig };

// Route utilities
export const getPrivateRouteByPath = (path) => {
  return routeConfig.find(route => route.path === path);
};

export const getPrivateRouteMeta = (path) => {
  const route = getPrivateRouteByPath(path);
  return route?.meta || {
    title: "Valasys AI",
    description: "AI-powered prospect intelligence platform",
    protected: true
  };
};

// Private route paths constants
export const PRIVATE_ROUTES = {
  DASHBOARD: "/dashboard",
  SETTINGS: "/settings",
  MY_PROFILE: "/my-profile",
  CHANGE_PASSWORD: "/change-password",
  BUILD_VAIS: "/build-your-vais",
  VAIS_SCORE: "/build-your-vais/vais-score",
  VAIS_RESULT: "/build-your-vais/vais-result",
  ABM_LAL: "/abm-lal",
  ABM_RESULTS: "/abm-lal/abm-results",
  LAL_RESULTS: "/abm-lal/lal-results",
  FIND_PROSPECTS: "/find-prospects",
  PROSPECT_RESULTS: "/find-prospects/prospect-details-result",
  MY_DOWNLOADS: "/my-download-list",
  CAMPAIGN_LIST: "/campaign-list",
  BUILD_CAMPAIGN: "/build-campaign",
  BUILD_MY_CAMPAIGN: "/build-my-campaign",
  TRACK_CAMPAIGNS: "/track-campaigns",
  FAQS: "/frequently-asked-questions",
  SUPPORT_TICKETS: "/support-tickets",
  NEW_TICKET: "/raise-new-ticket",
  TICKET_DETAILS: "/ticket",
  SUBSCRIPTION_PLANS: "/subscription-plans",
  PAYMENTS: "/payments",
  CREDIT_PAYMENTS: "/credit-payments",
  SPENDING_HISTORY: "/spending-history",
  MANAGE_USERS: "/manage-users",
  ADD_USER: "/manage-users/add-user",
  EDIT_USER: "/manage-users/edit-user",
  NOTIFICATIONS: "/view-all-notifications",
  THANKS: "/thanks",
  NOT_FOUND: "/not-found"
};

// Route groups for easier management
export const PRIVATE_ROUTE_GROUPS = {
  PROFILE: [
    PRIVATE_ROUTES.SETTINGS,
    PRIVATE_ROUTES.MY_PROFILE,
    PRIVATE_ROUTES.CHANGE_PASSWORD
  ],
  ICP: [
    PRIVATE_ROUTES.BUILD_VAIS,
    PRIVATE_ROUTES.VAIS_SCORE,
    PRIVATE_ROUTES.VAIS_RESULT
  ],
  ABM: [
    PRIVATE_ROUTES.ABM_LAL,
    PRIVATE_ROUTES.ABM_RESULTS,
    PRIVATE_ROUTES.LAL_RESULTS
  ],
  PROSPECTS: [
    PRIVATE_ROUTES.FIND_PROSPECTS,
    PRIVATE_ROUTES.PROSPECT_RESULTS,
    PRIVATE_ROUTES.MY_DOWNLOADS
  ],
  CAMPAIGNS: [
    PRIVATE_ROUTES.CAMPAIGN_LIST,
    PRIVATE_ROUTES.BUILD_CAMPAIGN,
    PRIVATE_ROUTES.BUILD_MY_CAMPAIGN,
    PRIVATE_ROUTES.TRACK_CAMPAIGNS
  ],
  SUPPORT: [
    PRIVATE_ROUTES.FAQS,
    PRIVATE_ROUTES.SUPPORT_TICKETS,
    PRIVATE_ROUTES.NEW_TICKET,
    PRIVATE_ROUTES.TICKET_DETAILS
  ],
  BILLING: [
    PRIVATE_ROUTES.SUBSCRIPTION_PLANS,
    PRIVATE_ROUTES.PAYMENTS,
    PRIVATE_ROUTES.CREDIT_PAYMENTS,
    PRIVATE_ROUTES.SPENDING_HISTORY
  ],
  ADMIN: [
    PRIVATE_ROUTES.MANAGE_USERS,
    PRIVATE_ROUTES.ADD_USER,
    PRIVATE_ROUTES.EDIT_USER
  ]
};

// Permission checks
export const hasRouteAccess = (path, userRole = 'user', subscription = null) => {
  const route = getPrivateRouteByPath(path);
  if (!route) return false;

  // Check role requirements
  if (route.meta?.roles && !route.meta.roles.includes(userRole)) {
    return false;
  }

  // Check subscription requirements for certain routes
  const subscriptionRequiredRoutes = [
    PRIVATE_ROUTES.SUBSCRIPTION_PLANS,
    PRIVATE_ROUTES.CREDIT_PAYMENTS,
    ...PRIVATE_ROUTE_GROUPS.ADMIN
  ];

  if (subscriptionRequiredRoutes.includes(path)) {
    return subscription && !subscription.data?.is_free_trial;
  }

  return true;
};
