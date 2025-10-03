import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import { XCircleIcon } from "@heroicons/react/24/solid";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import 'preline/preline';

// مختصات تقریبی 28 ایستگاه اصفهان


export const stationData = [
  { id: 1, name: "ایستگاه 1", lat: 32.64458115348927, lng: 51.65760236383265, gatewayStatus: "online", serverStatus: "online", pingHistory: [99,40,60,90,80] },
  { id: 2, name: "ایستگاه 2", lat: 32.68481698071591, lng: 51.636820856268514, gatewayStatus: "offline", serverStatus: "online", pingHistory: [30,50,50,90,90] },
  { id: 3, name: "ایستگاه 3", lat: 32.62272809021165, lng: 51.65451680066016, gatewayStatus: "online", serverStatus: "online", pingHistory: [99,40,60,90,80] },
  { id: 4, name: "ایستگاه 4", lat: 32.66059567228223, lng: 51.71002490936445, gatewayStatus: "offline", serverStatus: "offline", pingHistory: [90,90,80,80,100] },
  { id: 5, name: "ایستگاه 5", lat: 32.64116592588876, lng: 51.695640899996135, gatewayStatus: "online", serverStatus: "online", pingHistory: [99,40,60,90,80] },
  { id: 6, name: "ایستگاه 6", lat: 32.709131592341905, lng: 51.67567346343682, gatewayStatus: "offline", serverStatus: "online", pingHistory: [100,100,90,92,80] },
  { id: 7, name: "ایستگاه 7", lat: 32.693149636963156, lng: 51.708909659444885, gatewayStatus: "online", serverStatus: "online", pingHistory: [99,40,60,90,80] },
  { id: 8, name: "ایستگاه 8", lat: 32.655436710338904, lng: 51.629856644881386, gatewayStatus: "online", serverStatus: "offline", pingHistory: [30,50,50,90,90] },
  { id: 9, name: "ایستگاه 9", lat: 32.665127774540835, lng: 51.68545318904091, gatewayStatus: "online", serverStatus: "online", pingHistory: [99,40,60,90,80] },
  { id: 10, name: "ایستگاه 10", lat: 32.716413500773214, lng: 51.59471125693997, gatewayStatus: "offline", serverStatus: "online", pingHistory: [100,100,90,92,80] },
  { id: 11, name: "ایستگاه 11", lat: 32.611674640270024, lng: 51.58794694575079, gatewayStatus: "online", serverStatus: "online", pingHistory: [99,40,60,90,80] },
  { id: 12, name: "ایستگاه 12", lat: 32.59257372817456, lng: 51.67023695188212, gatewayStatus: "online", serverStatus: "offline", pingHistory: [90,90,80,80,100] },
  { id: 13, name: "ایستگاه 13", lat: 32.55733634682642, lng: 51.66697116228346, gatewayStatus: "online", serverStatus: "online", pingHistory: [99,40,60,90,80] },
  { id: 14, name: "ایستگاه 14", lat: 32.65482994515911, lng: 51.65351625894354, gatewayStatus: "offline", serverStatus: "online", pingHistory: [100,100,90,92,80] },
  { id: 15, name: "ایستگاه 15", lat: 32.649210057989364, lng: 51.7743691326871, gatewayStatus: "online", serverStatus: "online", pingHistory: [99,40,60,90,80] },
  { id: 16, name: "ایستگاه 16", lat: 32.668819882512565, lng: 51.64371647454513, gatewayStatus: "offline", serverStatus: "offline", pingHistory: [80,80,92,93,100] },
  { id: 17, name: "ایستگاه 17", lat: 32.66325814530016, lng: 51.67894604000088, gatewayStatus: "online", serverStatus: "online", pingHistory: [99,40,60,90,80] },
  { id: 18, name: "ایستگاه 18", lat: 32.73054040802755, lng: 51.65483733007889, gatewayStatus: "offline", serverStatus: "online", pingHistory: [100,100,90,92,80] },
  { id: 19, name: "ایستگاه 19", lat: 32.71151690614417, lng: 51.72419167854372, gatewayStatus: "online", serverStatus: "offline", pingHistory: [90,90,82,82,90] },
  { id: 20, name: "ایستگاه 20", lat: 32.625563388340254, lng: 51.68609441990665, gatewayStatus: "online", serverStatus: "online", pingHistory: [99,40,60,90,80] },
  { id: 21, name: "ایستگاه 21", lat: 32.688943250351, lng: 51.600647224378974, gatewayStatus: "offline", serverStatus: "online", pingHistory: [100,100,90,92,80] },
  { id: 22, name: "ایستگاه 22", lat: 32.688943250351, lng: 51.600647224378974, gatewayStatus: "online", serverStatus: "online", pingHistory: [99,40,60,90,80] },
  { id: 23, name: "ایستگاه 23", lat: 32.60125451199514, lng: 51.7346600268408, gatewayStatus: "online", serverStatus: "offline", pingHistory: [90,90,80,80,100] },
  { id: 24, name: "ایستگاه 24", lat: 32.68816455427819, lng: 51.74258962307675, gatewayStatus: "offline", serverStatus: "online", pingHistory: [100,100,90,92,80] },
  { id: 25, name: "ایستگاه 25", lat: 32.671377825532744, lng: 51.739012613158025, gatewayStatus: "online", serverStatus: "online", pingHistory: [99,40,60,90,80] },
  { id: 26, name: "ایستگاه 26", lat: 32.71294187853938, lng: 51.626098692065796, gatewayStatus: "offline", serverStatus: "offline", pingHistory: [80,80,92,93,100] },
  { id: 27, name: "ایستگاه 27", lat: 32.66125115908844, lng: 51.66948573811294, gatewayStatus: "online", serverStatus: "online", pingHistory: [99,40,60,90,80] },
  { id: 28, name: "ایستگاه 28", lat: 32.720439498534574, lng: 51.68992931571688, gatewayStatus: "online", serverStatus: "online", pingHistory: [99,40,60,90,80] },
];


// آیکون اختصاصی
const getIcon = (status) => new L.Icon({
  iconUrl: status === "online" 
    ? "https://cdn-icons-png.flaticon.com/512/190/190411.png" 
    : "https://cdn-icons-png.flaticon.com/512/753/753345.png",
  iconSize: [25, 25],
  iconAnchor: [12, 25],
});

const NetworkStatusSetting = () => {
  const [selectedStation, setSelectedStation] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [filter, setFilter] = useState("all"); // all / online / offline

  const filteredStations = stationData.filter(st => 
    filter === "all" ? true : st.gatewayStatus === filter
  );

  useEffect(() => {
    // Toast هشدار
    stationData.forEach(st => {
      if(st.gatewayStatus === "offline" || st.serverStatus === "offline") {
        setToastMessage(`هشدار: ${st.name} وضعیت غیر پایدار دارد!`);
      }
    });
  }, []);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const calculateStats = (history) => {
    const validPings = history.filter(p => p > 0);
    const avg = validPings.reduce((a,b) => a+b,0)/validPings.length || 0;
    const uptimePercent = (validPings.length / history.length) * 100;
    return { avg, uptimePercent };
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 p-2">
      {toastMessage && (
        <div className="fixed top-5 right-5 bg-red-500 text-white px-4 py-2 rounded shadow-lg animate-slide-in">
          {toastMessage}
        </div>
      )}

      {/* نقشه کوچک */}
      <div className="md:w-1/2 h-[500px] rounded-lg overflow-hidden shadow">
        <MapContainer
          center={[32.652, 51.671]}
          zoom={12}
          style={{ height: "100%", width: "100%" }}
          maxBounds={[[32.55, 51.55], [32.75, 51.75]]}
          scrollWheelZoom={true}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {filteredStations.map(st => (
            <Marker
              key={st.id}
              position={[st.lat, st.lng]}
              icon={getIcon(st.gatewayStatus)}
              eventHandlers={{ click: () => setSelectedStation(st) }}
            >
              <Popup>{st.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* پنل اطلاعات */}
      <div className="md:w-1/2 bg-white rounded-lg shadow p-4 overflow-auto max-h-[500px]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">اطلاعات ایستگاه‌ها</h3>
          <select
            className="border rounded px-2 py-1"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">همه</option>
            <option value="online">آنلاین</option>
            <option value="offline">آفلاین</option>
          </select>
        </div>

        {selectedStation && (
          <div className="border p-3 rounded-lg mb-4 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-semibold">{selectedStation.name}</h4>
              <button onClick={() => setSelectedStation(null)}>
                <XCircleIcon className="w-5 h-5 text-gray-600 hover:text-gray-800" />
              </button>
            </div>
            <p>وضعیت گیت‌وی: {selectedStation.gatewayStatus}</p>
            <p>وضعیت سرور: {selectedStation.serverStatus}</p>
            {(() => {
              const { avg, uptimePercent } = calculateStats(selectedStation.pingHistory);
              return (
                <>
                  <p>میانگین پینگ: {avg.toFixed(2)}</p>
                  <p>درصد پایداری: {uptimePercent.toFixed(1)}%</p>
                </>
              )
            })()}
            <h5 className="mt-2 font-semibold">نمودار پینگ</h5>
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={selectedStation.pingHistory.map((val,i)=>({ name: i+1, value: val }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {!selectedStation && <p>روی هر Marker کلیک کنید تا جزئیات ایستگاه نمایش داده شود.</p>}
      </div>
    </div>
  );
};

export default NetworkStatusSetting;
