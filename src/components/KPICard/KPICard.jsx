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

} from "@heroicons/react/24/outline";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

// تبدیل اعداد به فارسی
const toPersianNumber = (num) =>
    num.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);

// آیکون بر اساس نوع دارایی
const typeIcons = {
    "کامپیوتر": <ComputerDesktopIcon className="w-10 h-10 text-[#FF4B4B]" />,
    "پرینتر": <PrinterIcon className="w-10 h-10 text-[#FF4B4B]" />,
    "تجهیزات شبکه": <ServerStackIcon className="w-10 h-10 text-[#FF4B4B]" />,
};

export default function KPICard({ data }) {
    const grouped = useMemo(() => {
        const result = {};
        data.forEach((item) => {
            const year = item.purchaseDate.split("-")[0];
            if (!result[item.type]) {
                result[item.type] = { count: 0, yearly: {} };
            }
            result[item.type].count++;
            result[item.type].yearly[year] = (result[item.type].yearly[year] || 0) + 1;
        });
        return result;
    }, [data]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-5 rounded-xl shadow-md border border-gray-200">
            {Object.entries(grouped).map(([type, { count, yearly }]) => {
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
                                const gradient = ctx.createLinearGradient(0, 0, 0, 60);
                                gradient.addColorStop(0, "rgba(255,75,75,0.4)");
                                gradient.addColorStop(1, "rgba(255,75,75,0)");
                                return gradient;
                            },
                            tension: 0.4,
                            fill: true,
                            pointRadius: 0,       // ✅ نقاط حذف شدند
                            pointHoverRadius: 0,  // ✅ نقاط هنگام هاور حذف شدند
                        },
                    ],
                };


                return (
                    
                    <div
                        key={type}
                        className="flex flex-col bg-[#FF4B4B]/5 md:flex-row items-center justify-between py-5 px-4 bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-xl transition-all"
                    >
                        {/* بخش اطلاعات و آیکون */}
                       
                        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                            {typeIcons[type]}
                            <div>
                                <h2 className="text-lg font-semibold text-gray-600">{type}</h2>
                                <p className="text-gray-500 mt-1 text-sm">
                                    تعداد کل:{" "}
                                    <span className="font-extrabold text-lg text-[#FF4B4B]">
                                        {toPersianNumber(count)}
                                    </span>
                                </p>
                            </div>
                        </div>

                        {/* نمودار کوچک */}
                        <div className="w-full md:w-28 h-16 mt-3 md:mt-0">
                            <Line
                                data={chartData}
                                options={{
                                    plugins: { legend: { display: false }, tooltip: { enabled: false } },
                                    scales: {
                                        x: { display: false },
                                        y: { display: false },
                                    },
                                    elements: {
                                        line: { borderWidth: 2 },
                                    },
                                    responsive: true,
                                    maintainAspectRatio: false,
                                }}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
