import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ItProPage from "./pages/ItProPage/ItProPage";
import PropertyListPage from "./pages/Property/PropertyListPage";
import PropertyReportPage from "./pages/Property/PropertyReportPage";
import NewWarningPage from "./pages/Emails and Warnings/NewWarningPage"
import WarningListpage from "./pages/Emails and Warnings/WarningListpage"
import DailyMonitoringPage from "./pages/Monitoring/DailyMonitoringPage"
import ChartPage from "./pages/Monitoring/ChartPage"
import OverviewPage from "./pages/Monitoring/OverviewPage"
import DeliveredPage from "./pages/Repairs/DeliveredPage"
import RepairingPage from "./pages/Repairs/RepairingPage"
import RepairsListPage from "./pages/Repairs/RepairsListPage"
import TrainingListPage from "./pages/Training/TrainingListPage"
import TrainingUploadPage from "./pages/Training/TrainingUploadPage"
import ServersPage from "./pages/NetworkStatus/ServersPage"
import GatewaysPage from "./pages/NetworkStatus/GatewaysPage"
import NetworkStatusSetting from "./pages/NetworkStatus/NetworkStatusSetting"




const router = createBrowserRouter([
  {
    path: "/",
    element:<ItProPage></ItProPage>,
    children: [
      { path: "property/list", element: <PropertyListPage />, handle: { crumb: "لیست اموال" } },
      { path: "property/report", element:<PropertyReportPage/>, handle: { crumb: "گزارش گیری لیست اموال" } },
      { path: "alerts/new", element: <NewWarningPage/>, handle: { crumb: "هشدار جدید" } },
      { path: "alerts/list", element: <WarningListpage />, handle: { crumb: "لیست هشدارها" } },
      { path: "monitoring/daily", element: <DailyMonitoringPage />, handle: { crumb: "مانیتورینگ روزانه" } },
      { path: "monitoring/chart", element: <ChartPage />, handle: { crumb: "چارت" } },
      { path: "monitoring/overview", element: <OverviewPage />, handle: { crumb: "مانیتورینگ کلی" } },
      { path: "repairs/delivered", element: <DeliveredPage />, handle: { crumb: "دریافت‌شده‌ها" } },
      { path: "repairs/repairing", element: <RepairingPage />, handle: { crumb: "در حال تعمیرها" } },
      { path: "repairs/repairinglist", element: <RepairsListPage />, handle: { crumb: "تعمیر شده‌ها" } },
      { path: "training/list", element: <TrainingListPage />, handle: { crumb: "لیست آموزش‌ها" } },
      { path: "training/upload", element: <TrainingUploadPage />, handle: { crumb: "بارگذاری فایل" } },
      { path: "network-status/servers", element: <ServersPage />, handle: { crumb: "سرویس‌ها" } },
      { path: "network-status/gateways", element: <GatewaysPage />, handle: { crumb: "گیت‌وی‌ها" } },
      { path: "network-status/settings", element: <NetworkStatusSetting />, handle: { crumb: "وضعیت شبکه" } },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
