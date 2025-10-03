import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import 'preline/preline';
import { XCircleIcon } from "@heroicons/react/24/solid";

const generateGateways = () =>
  Array.from({ length: 28 }, (_, i) => ({
    id: i + 1,
    station: i + 1,
    ip: `100.83.${i + 1}.2`,
    status: Math.random() > 0.1 ? "online" : "offline",
    uptimeData: {
      daily: Array.from({ length: 7 }, (_, d) => ({ day: `Day ${d + 1}`, uptime: Math.floor(Math.random() * 20) + 80 })),
      weekly: Array.from({ length: 4 }, (_, w) => ({ week: `Week ${w + 1}`, uptime: Math.floor(Math.random() * 20) + 80 })),
      monthly: Array.from({ length: 12 }, (_, m) => ({ month: `Month ${m + 1}`, uptime: Math.floor(Math.random() * 20) + 80 })),
    },
  }));

const GatewaysPage = () => {
  const [gateways, setGateways] = useState(generateGateways());
  const [toastMessage, setToastMessage] = useState("");
  const [selectedGateway, setSelectedGateway] = useState(null);
  const [timeRange, setTimeRange] = useState("daily");
  const [alertLog, setAlertLog] = useState([]);

  const addAlert = (message, gateway, type) => {
    const timestamp = new Date().toLocaleString();
    setAlertLog(prev => [{ id: Date.now(), station: gateway.station, ip: gateway.ip, status: gateway.status, type, timestamp, message }, ...prev]);
    setToastMessage(message);
  };

  const checkUptimeThreshold = (gateway) => {
    const data = gateway.uptimeData[timeRange];
    const avgUptime = data.reduce((acc, d) => acc + d.uptime, 0) / data.length;
    if (avgUptime < 90) {
      addAlert(`هشدار: ایستگاه ${gateway.station} پایداری کمتر از 90% (${avgUptime.toFixed(1)}%)`, gateway, "پایداری");
    }
  };

  const pingGateway = (id) => {
    setGateways(prev =>
      prev.map(g => {
        if (g.id === id) {
          const newStatus = Math.random() > 0.2 ? "online" : "offline";
          if (newStatus !== g.status) {
            addAlert(`ایستگاه ${g.station} ${newStatus === "offline" ? "قطع" : "وصل"} شد`, g, "Ping");
          }
          const updatedGateway = { ...g, status: newStatus };
          checkUptimeThreshold(updatedGateway);
          return updatedGateway;
        }
        return g;
      })
    );
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const clearAlerts = () => setAlertLog([]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">پایش Gateway ایستگاه‌ها</h2>

      {toastMessage && (
        <div className="fixed top-5 right-5 bg-red-500 text-white px-4 py-2 rounded shadow-lg animate-slide-in z-50">
          {toastMessage}
        </div>
      )}

      {/* Grid ایستگاه‌ها */}
      <div className="grid grid-cols-4 md:grid-cols-6 gap-4 mb-6">
        {gateways.map(g => (
          <div key={g.id} className="flex flex-col items-center">
            <button
              onClick={() => setSelectedGateway(g)}
              className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg transition-transform transform hover:scale-110 ${g.status === "online" ? "bg-green-500" : "bg-red-500"}`}
            >
              {g.station}
            </button>
            <p className="text-sm mt-2">IP: {g.ip}</p>
            <button
              className="mt-1 px-2 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300 transition"
              onClick={() => pingGateway(g.id)}
            >
              Ping
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedGateway && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center pt-20 px-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative transition-transform transform animate-slide-in">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setSelectedGateway(null)}
            >
              <XCircleIcon className="w-6 h-6" />
            </button>
            <h3 className="text-lg font-bold mb-4">ایستگاه {selectedGateway.station}</h3>
            <p>IP: {selectedGateway.ip}</p>
            <p>وضعیت: <span className={selectedGateway.status === "online" ? "text-green-600" : "text-red-600"}>{selectedGateway.status}</span></p>

            {/* Dropdown زمان */}
            <div className="mt-4">
              <label className="block mb-2 font-semibold">بازه زمانی:</label>
              <select
                className="border rounded px-2 py-1"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <option value="daily">روزانه</option>
                <option value="weekly">هفتگی</option>
                <option value="monthly">ماهانه</option>
              </select>
            </div>

            {/* نمودار */}
            <div className="mt-4">
              <h4 className="font-semibold mb-2">درصد پایداری {timeRange === "daily" ? "روزانه" : timeRange === "weekly" ? "هفتگی" : "ماهانه"}</h4>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart
                  data={
                    timeRange === "daily"
                      ? selectedGateway.uptimeData.daily
                      : timeRange === "weekly"
                      ? selectedGateway.uptimeData.weekly
                      : selectedGateway.uptimeData.monthly
                  }
                >
                  <XAxis dataKey={timeRange === "daily" ? "day" : timeRange === "weekly" ? "week" : "month"} />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="uptime" stroke="#4ade80" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Alert Log */}
      <div className="mt-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-semibold">تاریخچه هشدارها</h3>
          <button
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
            onClick={clearAlerts}
          >
            پاک کردن
          </button>
        </div>
        <div className="max-h-64 overflow-y-auto border rounded p-2 space-y-2 bg-gray-50">
          {alertLog.length === 0 ? (
            <p className="text-gray-500 text-sm text-center">هیچ هشداری ثبت نشده است</p>
          ) : (
            alertLog.map(alert => (
              <div key={alert.id} className="p-2 border rounded bg-white shadow-sm flex flex-col">
                <span className="text-sm font-semibold">ایستگاه {alert.station} ({alert.ip})</span>
                <span className="text-sm text-gray-600">وضعیت: {alert.status}</span>
                <span className="text-sm text-gray-600">نوع: {alert.type}</span>
                <span className="text-sm text-gray-500">زمان: {alert.timestamp}</span>
                <span className="text-sm text-gray-700 mt-1">{alert.message}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default GatewaysPage;
