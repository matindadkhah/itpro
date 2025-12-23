import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/ItProPage/Layout";
import NewWarningPage from "./pages/Emails and Warnings/NewWarningPage";
import WarningListpage from "./pages/Emails and Warnings/WarningListpage";
import DailyMonitoringPage from "./pages/Monitoring/DailyMonitoringPage";
import ChartPage from "./pages/Monitoring/ChartPage";
import OverviewPage from "./pages/Monitoring/OverviewPage";
import TrainingListPage from "./pages/Training/TrainingListPage";
import TrainingUploadPage from "./pages/Training/TrainingUploadPage";
import ServersPage from "./pages/NetworkStatus/ServersPage";
import GatewaysPage from "./pages/NetworkStatus/GatewaysPage";
import NetworkStatusSetting from "./pages/NetworkStatus/NetworkStatusSetting";
import LoginPage from "./pages/LoginPage/LoginPage";
import PropertyPage from "./pages/Property/PropertyPage";
import RepairDeviceListPage from "./pages/Repairs/RepairDeviceListPage";
import RepairDeviceRegistrationPage from "./pages/Repairs/RepairDeviceRegistrationPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      { path: "login", element: <LoginPage />, handle: { crumb: "صفحه ورود" } },
      {
        path: "property/list",
        element: <PropertyPage />,
        handle: { crumb: "لیست اموال" },
      },
      {
        path: "alerts/new",
        element: <NewWarningPage />,
        handle: { crumb: "هشدار جدید" },
      },
      {
        path: "alerts/list",
        element: <WarningListpage />,
        handle: { crumb: "لیست هشدارها" },
      },
      {
        path: "monitoring/daily",
        element: <DailyMonitoringPage />,
        handle: { crumb: "مانیتورینگ روزانه" },
      },
      {
        path: "monitoring/chart",
        element: <ChartPage />,
        handle: { crumb: "چارت" },
      },
      {
        path: "monitoring/overview",
        element: <OverviewPage />,
        handle: { crumb: "مانیتورینگ کلی" },
      },
      {
        path: "repairs/register",
        element: <RepairDeviceRegistrationPage/>,
        handle: { crumb: "ثبت دستگاه جدید تعمیری" },
      },
      {
        path: "repairs/list",
        element: <RepairDeviceListPage/>,
        handle: { crumb: "لیست دستگاه ها" },
      },
      {
        path: "training/list",
        element: <TrainingListPage />,
        handle: { crumb: "لیست آموزش‌ها" },
      },
      {
        path: "training/upload",
        element: <TrainingUploadPage />,
        handle: { crumb: "بارگذاری فایل" },
      },
      {
        path: "network-status/servers",
        element: <ServersPage />,
        handle: { crumb: "سرویس‌ها" },
      },
      {
        path: "network-status/gateways",
        element: <GatewaysPage />,
        handle: { crumb: "گیت‌وی‌ها" },
      },
      {
        path: "network-status/settings",
        element: <NetworkStatusSetting />,
        handle: { crumb: "وضعیت شبکه" },
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
