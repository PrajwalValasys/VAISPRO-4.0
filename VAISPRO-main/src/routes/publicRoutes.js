import React, { Suspense } from "react";
import { Navigate } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";

// Lazy load components for better performance
const Login = React.lazy(() => import("../pages/Auth/Login/Login"));
const Registration = React.lazy(() => import("../pages/Auth/Registration/Registration"));
const RegistrationEmail = React.lazy(() => import("../pages/Auth/RegistrationEmail/RegistrationEmail"));
const ForgotPassword = React.lazy(() => import("../pages/Auth/ForgotPassword/ForgotPassword"));
const ForgotPasswordEmailVerification = React.lazy(() => import("../pages/Auth/ForgotPassword/ForgotPasswordEmailVerification"));
const ResetPassword = React.lazy(() => import("../pages/Auth/ResetPassword/ResetPassword"));
const EmailVerification = React.lazy(() => import("../pages/Auth/Verification/EmailVerification/EmailVerification"));
const PhoneVerification = React.lazy(() => import("../pages/Auth/Verification/PhoneVerification/PhoneVerification"));
const Faqs = React.lazy(() => import("../pages/Faqs/Faqs"));
const Modals = React.lazy(() => import("../pages/Profile/Modals/Modals"));
const Ticket = React.lazy(() => import("../pages/SupportTicket/Ticket/Ticket"));
const LandingPage = React.lazy(() => import("../pages/Landing/LandingPage"));
const PrivacyPolicy = React.lazy(() => import("../pages/Legal/PrivacyPolicy"));
const TermsOfService = React.lazy(() => import("../pages/Legal/TermsOfService"));
const ContactUs = React.lazy(() => import("../pages/Contact/ContactUs"));

// Loading component
const LoadingSpinner = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="100vh"
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

// Route configuration object
const routeConfig = [
  {
    path: "/",
    element: <Navigate to="/login" replace />,
    meta: {
      title: "Valasys AI - Redirect",
      description: "Redirecting to login page"
    }
  },
  {
    path: "/home",
    element: withSuspense(LandingPage),
    meta: {
      title: "Valasys AI - Home",
      description: "Welcome to Valasys AI platform"
    }
  },
  {
    path: "/login",
    element: withSuspense(Login),
    meta: {
      title: "Valasys AI - Login",
      description: "Sign in to your Valasys AI account"
    }
  },
  {
    path: "/sign-up",
    element: withSuspense(Registration),
    meta: {
      title: "Valasys AI - Sign Up",
      description: "Create your Valasys AI account"
    }
  },
  {
    path: "/sign-up-email",
    element: withSuspense(RegistrationEmail),
    meta: {
      title: "Valasys AI - Email Registration",
      description: "Complete your email registration"
    }
  },
  {
    path: "/forgot-password",
    element: withSuspense(ForgotPassword),
    meta: {
      title: "Valasys AI - Forgot Password",
      description: "Reset your password"
    }
  },
  {
    path: "/reset-password",
    element: withSuspense(ResetPassword),
    meta: {
      title: "Valasys AI - Reset Password",
      description: "Set your new password"
    }
  },
  {
    path: "/email-verification",
    element: withSuspense(EmailVerification),
    meta: {
      title: "Valasys AI - Email Verification",
      description: "Verify your email address"
    }
  },
  {
    path: "/forgot-password-email-verification",
    element: withSuspense(ForgotPasswordEmailVerification),
    meta: {
      title: "Valasys AI - Password Reset Verification",
      description: "Verify your email for password reset"
    }
  },
  {
    path: "/phone-verification",
    element: withSuspense(PhoneVerification),
    meta: {
      title: "Valasys AI - Phone Verification",
      description: "Verify your phone number"
    }
  },
  {
    path: "/modals",
    element: withSuspense(Modals),
    meta: {
      title: "Valasys AI - Modal Components",
      description: "Modal components showcase"
    }
  },
  {
    path: "/ticket",
    element: withSuspense(Ticket),
    meta: {
      title: "Valasys AI - Support Ticket",
      description: "View support ticket details"
    }
  },
  {
    path: "/faqs",
    element: withSuspense(Faqs),
    meta: {
      title: "Valasys AI - FAQs",
      description: "Frequently asked questions"
    }
  },
  {
    path: "/privacy-policy",
    element: withSuspense(PrivacyPolicy),
    meta: {
      title: "Valasys AI - Privacy Policy",
      description: "Our privacy policy and data handling practices"
    }
  },
  {
    path: "/terms-of-service",
    element: withSuspense(TermsOfService),
    meta: {
      title: "Valasys AI - Terms of Service",
      description: "Terms and conditions for using Valasys AI"
    }
  },
  {
    path: "/contact",
    element: withSuspense(ContactUs),
    meta: {
      title: "Valasys AI - Contact Us",
      description: "Get in touch with our team"
    }
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
    meta: {
      title: "Valasys AI - Page Not Found",
      description: "The requested page was not found"
    }
  }
];

// Extract routes for React Router
const publicRoutes = () => {
  return routeConfig.map(({ meta, ...route }) => route);
};

export default publicRoutes;

// Export route configuration for other uses (like sitemap generation)
export { routeConfig };

// Route utilities
export const getRouteByPath = (path) => {
  return routeConfig.find(route => route.path === path);
};

export const getRouteMeta = (path) => {
  const route = getRouteByPath(path);
  return route?.meta || {
    title: "Valasys AI",
    description: "AI-powered prospect intelligence platform"
  };
};

// Public route paths constants
export const PUBLIC_ROUTES = {
  HOME: "/home",
  LOGIN: "/login",
  SIGN_UP: "/sign-up",
  SIGN_UP_EMAIL: "/sign-up-email",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  EMAIL_VERIFICATION: "/email-verification",
  FORGOT_PASSWORD_EMAIL_VERIFICATION: "/forgot-password-email-verification",
  PHONE_VERIFICATION: "/phone-verification",
  MODALS: "/modals",
  TICKET: "/ticket",
  FAQS: "/faqs",
  PRIVACY_POLICY: "/privacy-policy",
  TERMS_OF_SERVICE: "/terms-of-service",
  CONTACT: "/contact"
};

// Route groups for easier management
export const ROUTE_GROUPS = {
  AUTH: [
    PUBLIC_ROUTES.LOGIN,
    PUBLIC_ROUTES.SIGN_UP,
    PUBLIC_ROUTES.SIGN_UP_EMAIL,
    PUBLIC_ROUTES.FORGOT_PASSWORD,
    PUBLIC_ROUTES.RESET_PASSWORD
  ],
  VERIFICATION: [
    PUBLIC_ROUTES.EMAIL_VERIFICATION,
    PUBLIC_ROUTES.FORGOT_PASSWORD_EMAIL_VERIFICATION,
    PUBLIC_ROUTES.PHONE_VERIFICATION
  ],
  INFORMATION: [
    PUBLIC_ROUTES.FAQS,
    PUBLIC_ROUTES.PRIVACY_POLICY,
    PUBLIC_ROUTES.TERMS_OF_SERVICE,
    PUBLIC_ROUTES.CONTACT
  ],
  SUPPORT: [
    PUBLIC_ROUTES.TICKET
  ]
};
