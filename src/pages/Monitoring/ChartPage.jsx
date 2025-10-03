// TimeMonitoringCharts.jsx
import React, { useState, useMemo, useRef } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { toPng } from "html-to-image";
import download from "downloadjs";

/**
 * توضیح کوتاه عملکرد:
 * - هر نمودار یک dropdown برای بازه زمانی دارد (Today / Week / Month)
 * - داده‌ها بصورت mock تولید می‌شوند (می‌توان بعداً از API جایگزین کرد)
 * - Download هر نمودار -> html-to-image -> downloadjs
 */

/* Helpers */

// بازه زمانی را به تعداد نقاط تبدیل می‌کنیم (برای نمایش روز به روز)
const rangeToPoints = {
  today: 24, // 24 نقطه (ساعت) — ولی ما محور روز خواسته بودی، برای today هم از ساعت استفاده می‌کنیم
  week: 7, // 7 روز
  month: 30, // 30 روز
};

// تولید داده نمونه برای میانگین درصد پایداری (0-100)
// برای realism، از مقدار پایه استفاده می‌کنیم و نوسان مختصر شبیه‌سازی می‌کنیم
function generateStabilityData(points, kind = "day") {
  const data = [];
  const base = 85 + Math.round(Math.random() * 10) - 5; // پایه میانگین ~80-95
  for (let i = 0; i < points; i++) {
    // مقدار درصد بین 40 تا 100 تنظیم میشه ولی حول base نوسان داره
    const variation = Math.round((Math.random() - 0.5) * 20);
    const value = Math.min(100, Math.max(10, base + variation));
    // label بر اساس kind
    const label =
      kind === "hour"
        ? `${i}:00`
        : kind === "day"
        ? `روز ${i + 1}`
        : `نقطه ${i + 1}`;
    data.push({ label, value });
  }
  return data;
}

// تولید داده برای Pie: count online vs offline (بر اساس میانگین)
function generatePieData(avgPercent) {
  const online = Math.round((avgPercent / 100) * 28); // از 28 ایستگاه
  const offline = 28 - online;
  return [
    { name: "پایدار", value: online },
    { name: "قطع", value: offline },
  ];
}

// داده Bar: بیشترین قطعی‌ها — mock نام و تعداد
function generateBarData(points) {
  // نمونه: انتخاب 6 ایستگاه با مقادیر تصادفی
  const stations = Array.from({ length: 6 }, (_, i) => ({
    name: `ایستگاه ${i + 1}`,
    downtimes: Math.max(0, Math.round(Math.random() * Math.min(10, points / 2))),
  }));
  // مرتب سازی نزولی
  stations.sort((a, b) => b.downtimes - a.downtimes);
  return stations;
}

/* Component */
export default function ChartPage() {
  // state برای هر نمودار (هرکدام dropdown جدا)
  const [lineRange, setLineRange] = useState("week"); // today / week / month
  const [pieRange, setPieRange] = useState("week");
  const [barRange, setBarRange] = useState("week");

  // refs برای دانلود هر نمودار
  const lineRef = useRef(null);
  const pieRef = useRef(null);
  const barRef = useRef(null);

  // compute data (memoized)
  const lineData = useMemo(() => {
    const pts = rangeToPoints[lineRange];
    // برای "today" از hour label استفاده و برای week/month از day label
    const kind = lineRange === "today" ? "hour" : "day";
    return generateStabilityData(pts, kind);
  }, [lineRange]);

  const pieData = useMemo(() => {
    // میانگین درصد از دادهٔ خطی یا مجزا — اینجا میانگین lineData محاسبه می‌شود برای همخوانی
    const avg =
      lineData.reduce((s, it) => s + it.value, 0) / Math.max(1, lineData.length);
    return generatePieData(Math.round(avg));
  }, [pieRange, lineData]); // استفاده از lineData برای همخوانی

  const barData = useMemo(() => {
    const pts = rangeToPoints[barRange];
    return generateBarData(pts);
  }, [barRange]);

  // دانلود تصویر از ref
  const handleDownload = async (ref, name = "chart.png") => {
    if (!ref.current) return;
    try {
      const dataUrl = await toPng(ref.current, { cacheBust: true });
      download(dataUrl, name);
    } catch (err) {
      console.error("download error:", err);
      alert("خطا در دانلود تصویر نمودار");
    }
  };

  // رنگ‌های Pie
  const PIE_COLORS = ["#22c55e", "#ef4444"]; // سبز / قرمز

  return (
    <div className="p-6 space-y-6">
      {/* Line Chart Card */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">نمودار پایداری میانگین (خطی)</h3>
          <div className="flex items-center gap-2">
            <select
              value={lineRange}
              onChange={(e) => setLineRange(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1"
            >
              <option value="today">امروز (ساعتی)</option>
              <option value="week">هفته</option>
              <option value="month">ماه</option>
            </select>
            <button
              onClick={() => handleDownload(lineRef, "stability-line.png")}
              className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              <ArrowDownTrayIcon className="w-4 h-4" />
              دانلود
            </button>
          </div>
        </div>

        <div ref={lineRef} style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData}>
              <XAxis dataKey="label" tick={{ fontSize: 12 }} />
              <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
              <Tooltip
                formatter={(value) => `${value}%`}
                labelFormatter={(label) => `${label}`}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#2563eb"
                strokeWidth={3}
                dot={{ r: 2 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie Chart Card */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">نسبت ایستگاه‌های پایدار / قطع (دونات)</h3>
          <div className="flex items-center gap-2">
            <select
              value={pieRange}
              onChange={(e) => setPieRange(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1"
            >
              <option value="today">امروز</option>
              <option value="week">هفته</option>
              <option value="month">ماه</option>
            </select>
            <button
              onClick={() => handleDownload(pieRef, "stability-pie.png")}
              className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              <ArrowDownTrayIcon className="w-4 h-4" />
              دانلود
            </button>
          </div>
        </div>

        <div ref={pieRef} style={{ width: "100%", height: 260 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={40}
                label={(entry) => `${entry.name} (${entry.value})`}
              >
                {pieData.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={PIE_COLORS[idx % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar Chart Card */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">بیشترین تعداد قطعی (مقایسه‌ای)</h3>
          <div className="flex items-center gap-2">
            <select
              value={barRange}
              onChange={(e) => setBarRange(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1"
            >
              <option value="today">امروز</option>
              <option value="week">هفته</option>
              <option value="month">ماه</option>
            </select>
            <button
              onClick={() => handleDownload(barRef, "stability-bar.png")}
              className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              <ArrowDownTrayIcon className="w-4 h-4" />
              دانلود
            </button>
          </div>
        </div>

        <div ref={barRef} style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="downtimes" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

