// Report.jsx
import React, { useState } from "react";
import CustomTable from "../../components/CustomTable/CustomTable";
import { showToast } from "../../components/Toastify/ShowToast";
import CustomSearch from "../../components/CustomSearch/CustomSearch";
import CustomChart from "../../components/CustomChart/CustomChart";
import { TimelineLogger } from "../../components/TimelineLogger/TimelineLogger";

// داده نمونه
const mockAssets = [
  { id: "A001", name: "کامپیوتر اداری", type: "کامپیوتر", status: "فعال", department: "اداره انفورماتیک", purchaseDate: "2024-10-05", owner: "علی رضایی" },
  { id: "A002", name: "پرینتر لیزری", type: "پرینتر", status: "درحال تعمیر", department: "اداره انفورماتیک", purchaseDate: "2024-10-05", owner: "مریم احمدی" },
  { id: "A003", name: "میز اداری عملیات", type: "مبلمان", status: "فعال", department: "اداره انفورماتیک", purchaseDate: "2023-07-20", owner: "حمید رضایی" },
    { id: "A004", name: "میز اداری عملیات", type: "مبلمان", status: "فعال", department: "اداره انفورماتیک", purchaseDate: "2023-07-20", owner: "حمید رضایی" },
        { id: "A004", name: "میز اداری عملیات", type: "مبلمان", status: "فعال", department: "اداره انفورماتیک", purchaseDate: "2023-07-20", owner: "حمید رضایی" },


    

    





















];



const columns = [
  { key: "id", label: "شماره اموال" },
  { key: "name", label: "نام" },
  { key: "type", label: "نوع" },
  { key: "status", label: "وضعیت" },
  { key: "department", label: "بخش" },
  { key: "purchaseDate", label: "تاریخ خرید" },
  { key: "owner", label: "کاربر مسئول" },
];
// رنگ‌ها برای نمودار
const COLORS = ["#22c55e", "#facc15", "#ef4444"]; // سبز، زرد، قرمز

export default function PropertyReportPage() {

  const [assets, setAssets] = useState(mockAssets)

  // تابع حذف
  const handleDelete = (row) => {
    if (window.confirm(`آیا از حذف "${row.name}" اطمینان دارید؟`)) {
      setAssets((prev) => prev.filter((a) => a.id !== row.id));
      showToast.success(`"${row.name}" با موفقیت حذف شد`);
    }
  };
  const colors = ["#22c55e", "#facc15", "#ef4444"]; // سبز، زرد، قرمز






  return (
    <div className="p-6 bg-gray-50 min-h-screen grid gap-5">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">گزارش‌گیری اموال</h1>

      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6">
        {/* ستون سمت چپ: تایم لاین */}
        <div className="lg:col-span-1 overflow-y-auto max-h-screen">
          <TimelineLogger data={mockAssets} />
        </div>

        {/* ستون سمت راست: سرچ + جدول + چارت */}
        <div className="lg:col-span-3 space-y-6">
          <CustomSearch
            data={assets}
            onSearch={(filtered) => setAssets(filtered)}
            searchFields={[
              { key: "name", label: "نام", type: "text" },
              { key: "type", label: "نوع", type: "text" },
              { key: "status", label: "وضعیت", type: "select", options: ["فعال", "درحال تعمیر", "از رده خارج"] },
              { key: "purchaseDate", label: "تاریخ خرید", type: "date" },
            ]}
          />
          <CustomTable
            columns={columns}
            data={assets}
            onDelete={handleDelete}
            itemsPerPage={4}
            showPagination={true}
          >
          </CustomTable>
          <CustomChart data={mockAssets} />
        </div>
      </div>

    </div>
  );
}





