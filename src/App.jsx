
import './App.css'
import ItProPage from './pages/ItProPage/ItProPage'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PropertyListPage from './pages/Property/PropertyListPage';
import PropertyReportPage from './pages/Property/PropertyReportPage';
import NewWarningPage from './pages/Emails and Warnings/NewWarningPage';
import WarningListpage from './pages/Emails and Warnings/WarningListpage';
import DailyMonitoringPage from './pages/Monitoring/DailyMonitoringPage';
import ChartPage from './pages/Monitoring/ChartPage';
import OverviewPage from './pages/Monitoring/OverviewPage';
import DeliveredPage from './pages/Repairs/DeliveredPage';
import RepairingPage from './pages/Repairs/RepairingPage';
import RepairsListPage from './pages/Repairs/RepairsListPage';
import TrainingListPage from './pages/Training/TrainingListPage';
import TrainingUploadPage from './pages/Training/TrainingUploadPage';
import ServersPage from './pages/NetworkStatus/ServersPage';
import GatewaysPage from './pages/NetworkStatus/GatewaysPage';
import NetworkStatusSetting from './pages/NetworkStatus/NetworkStatusSetting';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {



  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<ItProPage />}>

            <Route path='/property/list' element={<PropertyListPage />} />
            <Route path='/property/report' element={<PropertyReportPage />} />
            <Route path='/alerts/new' element={<NewWarningPage />} />
            <Route path='/alerts/list' element={<WarningListpage />} />
            <Route path='/monitoring/daily' element={<DailyMonitoringPage />} />
            <Route path='/monitoring/chart' element={<ChartPage />} />
            <Route path='/monitoring/overview' element={<OverviewPage />} />
            <Route path='/repairs/delivered' element={<DeliveredPage />} />
            <Route path='/repairs/repairing' element={<RepairingPage />} />
            <Route path='/repairs/repairinglist' element={<RepairsListPage />} />
            <Route path='/training/list' element={<TrainingListPage />} />
            <Route path='/training/upload' element={<TrainingUploadPage />} />
            <Route path='/network-status/servers' element={<ServersPage />} />
            <Route path='/network-status/gateways' element={<GatewaysPage />} />
            <Route path='/network-status/settings' element={<NetworkStatusSetting />} />



          </Route>
        </Routes>
      </Router>

    </>
  )
}

export default App




