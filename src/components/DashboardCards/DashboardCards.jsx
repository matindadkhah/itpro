import React, { useMemo } from "react";
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
  CheckCircle as ActiveIcon,
  Build as RepairIcon,
  Cancel as RetiredIcon,
  Category as TypeIcon,
} from "@mui/icons-material";

// تابع کمکی برای ساخت id های یکتا برای gradient
const sanitizeId = (s) => String(s).replace(/[^a-z0-9-_]/gi, "_");

const DashboardCards = ({ data = [] }) => {

  // محاسبه تعداد هر وضعیت و بیشترین نوع
  const counts = useMemo(() => {
    const active = data.filter((a) => a.status === "فعال").length;
    const repairing = data.filter((a) => a.status === "درحال تعمیر").length;
    const retired = data.filter((a) => a.status === "از رده خارج").length;

    const typeCount = {};
    data.forEach((a) => (typeCount[a.type] = (typeCount[a.type] || 0) + 1));
    const topType = Object.entries(typeCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "نامشخص";

    return { active, repairing, retired, topType };
  }, [data]);

  // تابع کمکی برای آماده کردن داده Chart بر اساس purchaseDate
  const makeChartData = (filteredData) => {
    const grouped = {};
    filteredData.forEach((item) => {
      const key = item.purchaseDate;
      grouped[key] = (grouped[key] || 0) + 1;
    });

    return Object.entries(grouped)
      .sort((a, b) => new Date(a[0]) - new Date(b[0]))
      .map(([x, value]) => ({ x, value }));
  };

  // برای کارت بیشترین نوع دارایی، هر نوع را جدا رسم می‌کنیم
  const makeTopTypeChart = () => {
    const grouped = {};
    data.forEach((item) => {
      const key = item.purchaseDate;
      if (!grouped[key]) grouped[key] = {};
      grouped[key][item.type] = (grouped[key][item.type] || 0) + 1;
    });

    return Object.keys(grouped)
      .sort((a, b) => new Date(a) - new Date(b))
      .map((x) => ({ x, ...grouped[x] }));
  };

  // کارت ساز
  const Card = ({ title, value, icon, gradient, chartValues, gradientId, multiSeries = false }) => (
    <div
      className="p-4 rounded-xl shadow-md text-white flex flex-col justify-between"
      style={{ background: gradient }}
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-sm opacity-80">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div className="text-4xl opacity-90">{icon}</div>
      </div>

      <div style={{ width: "100%", height: 120 }}>
        <ResponsiveContainer>
          <AreaChart data={chartValues} margin={{ top: 0, left: 0, right: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" stopOpacity={0.28} />
                <stop offset="60%" stopColor="#ffffff" stopOpacity={0.12} />
                <stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
              </linearGradient>
            </defs>

            {/* محورها مخفی */}
            <XAxis dataKey="x" hide />
            <YAxis hide />

            {multiSeries
              ? Object.keys(chartValues[0] || {})
                  .filter((key) => key !== "x")
                  .map((key) => (
                    <Area
                      key={key}
                      type="monotone"
                      dataKey={key}
                      stroke="#fff"
                      strokeWidth={2}
                      fill={`url(#${gradientId})`}
                      dot={false}
                    />
                  ))
              : (
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#ffffff"
                  strokeWidth={2}
                  fill={`url(#${gradientId})`}
                  dot={false}
                />
              )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card
        title="اموال فعال"
        value={counts.active}
        icon={<ActiveIcon />}
        gradient="linear-gradient(135deg, #00c6ff, #0072ff)"
        chartValues={makeChartData(data.filter(a => a.status === "فعال"))}
        gradientId={sanitizeId("active_grad")}
      />
      <Card
        title="در حال تعمیر"
        value={counts.repairing}
        icon={<RepairIcon />}
        gradient="linear-gradient(135deg, #ff6a00, #ee0979)"
        chartValues={makeChartData(data.filter(a => a.status === "درحال تعمیر"))}
        gradientId={sanitizeId("repair_grad")}
      />
      <Card
        title="از رده خارج"
        value={counts.retired}
        icon={<RetiredIcon />}
        gradient="linear-gradient(135deg, #8e2de2, #4a00e0)"
        chartValues={makeChartData(data.filter(a => a.status === "از رده خارج"))}
        gradientId={sanitizeId("retired_grad")}
      />
      <Card
        title="بیشترین نوع دارایی"
        value={counts.topType}
        icon={<TypeIcon />}
        gradient="linear-gradient(135deg, #11998e, #38ef7d)"
        chartValues={makeTopTypeChart()}
        gradientId={sanitizeId("type_grad")}
        multiSeries
      />
    </div>
  );
};

export default DashboardCards;
