import { Navigate } from "react-router-dom";
import ForgotPassword from "../pages/Auth/ForgotPassword/ForgotPassword";
import ForgotPasswordEmailVerification from "../pages/Auth/ForgotPassword/ForgotPasswordEmailVerification";
import Login from "../pages/Auth/Login/Login";
import Registration from "../pages/Auth/Registration/Registration";
import RegistrationEmail from "../pages/Auth/RegistrationEmail/RegistrationEmail";
import ResetPassword from "../pages/Auth/ResetPassword/ResetPassword";
import EmailVerification from "../pages/Auth/Verification/EmailVerification/EmailVerification";
import PhoneVerification from "../pages/Auth/Verification/PhoneVerification/PhoneVerification";
import Faqs from "../pages/Faqs/Faqs";
import Modals from "../pages/Profile/Modals/Modals";
import Ticket from "../pages/SupportTicket/Ticket/Ticket";

export default function publicRoutes() {
  return [
    { path: "/", element: <Navigate to="/login" replace /> },
    { path: "/login", element: <Login /> },
    { path: "/sign-up", element: <Registration /> },
    { path: "/sign-up-email", element: <RegistrationEmail /> },
    { path: "/forgot-password", element: <ForgotPassword /> },
    { path: "/reset-password", element: <ResetPassword /> },
    { path: "/email-verfication", element: <EmailVerification /> },
    {
      path: "/forgot-password-email-verfication",
      element: <ForgotPasswordEmailVerification />,
    },
    { path: "/phone-verification", element: <PhoneVerification /> },
    { path: "/modals", element: <Modals /> },
    { path: "/ticket", element: <Ticket /> },
    { path: "/faqs", element: <Faqs /> },
    { path: "*", element: <Navigate to="/" replace /> },
  ];
}
