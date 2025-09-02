import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import ABMLAL from "../pages/ABMLAL/ABMLAL";
import ChangePassword from "../pages/Auth/ChangePassword";
import BuildYourICP from "../pages/BuildICP/BuildYourICP";
import ICPResult from "../pages/BuildICP/ICPResult/ICPResult";
import ICPScore from "../pages/BuildICP/ICPScore/ICPScore";
import Dashboard from "../pages/Dashboard/Dashboard";
import Faqs from "../pages/Faqs/Faqs";
import FindProspects from "../pages/FindProspects/FindProspects";
import MyDownloadList from "../pages/MyDownloadList/MyDownloadList";
import PageNotFound from "../pages/PageNotFound";
import MyProfile from "../pages/Profile/MyProfile";
import ProfileSettings from "../pages/Profile/Settings/ProfileSettings";
import SupportTicket from "../pages/SupportTicket/SupportTicket";
import NewSupportTicket from "../pages/SupportTicket/NewSupportTicket/NewSupportTicket";
import ABMResult from "../pages/ABMLAL/ABMResult/ABMResult";
import LALResults from "../pages/ABMLAL/LALResults/LALResults";
import FindProspectResult from "../pages/FindProspects/FindProspectResult/FindProspectResult";
import Subscription from "../pages/Subscription/Subscription";
import PaymentDetails from "../pages/Payment/PaymentDetails";
import CreditPaymentDetails from "../pages/CreditPayment/CreditPaymentDetails";
import Ticket from "../pages/SupportTicket/Ticket/Ticket";
import UpdateEmailVerification from "../pages/Profile/Settings/UpdateEmailVerification";
import UpdatePhoneVerification from "../pages/Profile/Settings/UpdatePhoneNumberVerification";
import UserList from "../pages/ManageUsers/UserList";
import AddUser from "../pages/ManageUsers/AddUser";
import SpendingHistory from "../pages/SpendingHistory/SpendingHistory";
import AddCampaign from "../pages/Buildcampaign/AddCampaign";
import Index from "../pages/Buildcampaign/Index"
import BuildMyCampaign from "../pages/Buildcampaign/BuildMyCampaign"
import ViewAllNotification from "../pages/Notification/ViewAllNotification";
import CampaignTracker from "../pages/Buildcampaign/CampaignTracker";
import ThankYou from "../pages/ThankYou/ThankYou";

function RequireSubscribed({ children }) {
  const isSubscribed = useSelector(
    (state) => state?.userSubscriptionData?.userSubscrptionData
  );
  if (isSubscribed?.data?.is_free_trial) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}

export default function privateRoutes() {
  return {
    element: <Layout />,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/settings", element: <ProfileSettings /> },
      { path: "/my-profile", element: <MyProfile /> },
      { path: "/build-your-vais", element: <BuildYourICP /> },
      { path: "/build-your-vais/vais-score", element: <ICPScore /> },
      { path: "/build-your-vais/vais-result", element: <ICPResult /> },
      { path: "/change-password", element: <ChangePassword /> },
      { path: "/abm-lal", element: <ABMLAL /> },
      { path: "/abm-lal/abm-results", element: <ABMResult /> },
      { path: "/abm-lal/lal-results", element: <LALResults /> },
      { path: "/thanks", element: <ThankYou /> },

      { path: "/find-prospects", element: <FindProspects /> },
      { path: "/find-prospects/prospect-details-result", element: <FindProspectResult /> },

      { path: "/my-download-list", element: <MyDownloadList /> },

      { path: "/frequently-asked-questions", element: <Faqs /> },
      { path: "/support-tickets", element: <SupportTicket /> },
      { path: "/not-found", element: <PageNotFound /> },
      { path: "*", element: <Navigate to="/not-found" replace /> },
      { path: "/raise-new-ticket", element: <NewSupportTicket /> },
      { path: "/subscription-plans", element: <RequireSubscribed><Subscription /></RequireSubscribed> },
      { path: "/payments", element: <PaymentDetails /> },
      { path: "/credit-payments", element: <RequireSubscribed><CreditPaymentDetails /></RequireSubscribed> },
      { path: "/ticket", element: <Ticket /> },
      {
        path: "/settings-email-verification",
        element: <UpdateEmailVerification />,
      },
      { path: "/spending-history", element: <SpendingHistory /> },

      {
        path: "/settings-phone-verification",
        element: <UpdatePhoneVerification />,
      },
      { path: "/manage-users", element: <RequireSubscribed><UserList /></RequireSubscribed> },
      { path: "/manage-users/add-user", element: <RequireSubscribed><AddUser /></RequireSubscribed> },
      { path: "/manage-users/edit-user/:id", element: <RequireSubscribed><AddUser /></RequireSubscribed> },
      { path: "/campaign-list", element: <Index /> },
      { path: "/build-campaign", element: <AddCampaign /> },
      { path: "/build-my-campaign/:id", element: <BuildMyCampaign /> },
      { path: "/view-all-notifications", element: <ViewAllNotification /> },
      { path: "/track-campaigns", element: <CampaignTracker/> }
    ],
  };
}
