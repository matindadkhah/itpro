import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
} from "chart.js";

import {
  ComputerDesktopIcon,
  PrinterIcon,
  ServerStackIcon,
  ArrowTrendingUpIcon,
  CheckCircleIcon,
  WrenchIcon,
  XCircleIcon
} from "@heroicons/react/24/outline";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

// 🔹 تبدیل اعداد به فارسی
const toPersianNumber = (num) =>
  num.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);

// 🔹 آیکون بر اساس نوع دارایی
const typeIcons = {
  "کامپیوتر": (
    <ComputerDesktopIcon className="w-10 h-10 text-[#FF4B4B] bg-[#FF4B4B]/10 rounded-2xl p-2 flex flex-shrink-0" />
  ),
  "پرینتر": (
    <PrinterIcon className="w-10 h-10 text-[#FF4B4B] bg-[#FF4B4B]/10 rounded-2xl p-2 flex flex-shrink-0" />
  ),
  "تجهیزات شبکه": (
    <ServerStackIcon className="w-10 h-10 text-[#FF4B4B] bg-[#FF4B4B]/10 rounded-2xl p-2 flex flex-shrink-0" />
  ),
};

export default function KPICard({ data }) {
  const grouped = useMemo(() => {
    const result = {};
    data.forEach((item) => {
      const year = item.purchaseDate.split("-")[0];
      if (!result[item.type]) {
        result[item.type] = {
          count: 0,
          yearly: {},
          active: 0,
          inactive: 0,
          repairing: 0,
        };
      }
      result[item.type].count++;
      result[item.type].yearly[year] = (result[item.type].yearly[year] || 0) + 1;

      if (item.status === "فعال") result[item.type].active++;
      else if (item.status === "درحال تعمیر") result[item.type].repairing++;
      else result[item.type].inactive++;
    });
    return result;
  }, [data]);

  return (
    <div className="font-[Shabnam]">
      <h2 className="flex items-center gap-2 font-bold text-gray-800 mb-6 text-xl">
        <ArrowTrendingUpIcon className="w-6 h-6 text-[#FF4B4B]" />
        گزارش کلی دارایی‌ها
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(grouped).map(([type, { count, yearly, active, inactive, repairing }]) => {
          const years = Object.keys(yearly).sort();
          const chartData = {
            labels: years,
            datasets: [
              {
                label: "تعداد",
                data: years.map((y) => yearly[y]),
                borderColor: "#FF4B4B",
                backgroundColor: (context) => {
                  const ctx = context.chart.ctx;
                  const gradient = ctx.createLinearGradient(0, 0, 0, 80);
                  gradient.addColorStop(0, "rgba(255,75,75,0.35)");
                  gradient.addColorStop(1, "rgba(255,75,75,0)");
                  return gradient;
                },
                tension: 0.4,
                fill: true,
                pointRadius: 0,
                pointHoverRadius: 0,
              },
            ],
          };

          return (
            <div
              key={type}
              className="flex flex-col md:flex-row justify-between items-center bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all p-5"
            >
              {/* ✅ بخش اطلاعات اصلی */}
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                {typeIcons[type]}
                <div className="text-center sm:text-right">
                  <h2 className="text-lg font-semibold text-gray-700">{type}</h2>
                  <p className="text-gray-500 text-sm mt-1">
                    تعداد کل : {" "}
                    <span className="font-bold text-[#FF4B4B] text-base">
                      {toPersianNumber(count)}
                    </span>
                  </p>

                  {/* ✅ وضعیت‌ها */}
                  <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-2">
                    <div className="flex items-center gap-1 text-green-600 text-sm font-medium bg-green-50 p-1 rounded-xl">
                      <CheckCircleIcon className="w-5 h-5" />
                      فعال: {toPersianNumber(active)}
                    </div>
                    <div className="flex items-center gap-1 text-amber-500 text-sm font-medium bg-amber-50 p-1 rounded-xl">
                      <WrenchIcon className="w-5 h-5" />
                    تعمیری: {toPersianNumber(repairing)}
                    </div>
                    <div className="flex items-center gap-1 text-red-500 text-sm font-medium bg-red-50 p-1 rounded-xl">
                      <XCircleIcon className="w-5 h-5" />
                      غیرفعال: {toPersianNumber(inactive)}
                    </div>
                  </div>
                </div>
              </div>

              {/* ✅ نمودار کوچک */}
              <div className="w-full md:w-28 h-20 mt-4 md:mt-0">
                <Line
                  data={chartData}
                  options={{
                    plugins: { legend: { display: false }, tooltip: { enabled: false } },
                    scales: { x: { display: false }, y: { display: false } },
                    elements: { line: { borderWidth: 2 } },
                    responsive: true,
                    maintainAspectRatio: false,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
