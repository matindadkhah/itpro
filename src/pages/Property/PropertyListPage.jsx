import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { usePropertyRegister } from "../../Hooks/usePropertyRegister";
import {
  UserIcon,
  IdentificationIcon,
  MapPinIcon,
  DocumentTextIcon,
  CpuChipIcon,
  BuildingOfficeIcon,
  WrenchScrewdriverIcon,
  TagIcon,
  ChevronDownIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

const PropertyListPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { createAsset, loading } = usePropertyRegister();

  const [dropdownOpen, setDropdownOpen] = useState({
    status: false,
    department: false,
    typeId: false,
  });

  const [selected, setSelected] = useState({
    status: "",
    department: "",
    typeId: "",
  });

  const toggleDropdown = (key) => {
    setDropdownOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSelect = (key, value) => {
    setSelected((prev) => ({ ...prev, [key]: value }));
    setDropdownOpen((prev) => ({ ...prev, [key]: false }));
  };

  const onSubmit = async (data) => {
    const formattedData = {
      ...data,
      code: Number(data.code),
      typeId:
        selected.typeId === "PC"
          ? 1
          : selected.typeId === "PRINTER"
          ? 2
          : selected.typeId === "LAPTOP"
          ? 3
          : selected.typeId === "MONITOR"
          ? 4
          : 0,
      status: selected.status,
      department: selected.department,
    };

    await createAsset(formattedData);
    reset();
    setSelected({ status: "", department: "", typeId: "" });
  };

  const dropdowns = {
    status: ["ACTIVE", "REPAIRING", "DECOMMISSIONED"],
    department: ["IT", "PREVENTION", "STATION", "FINANCIAL", "MANAGER"],
    typeId: ["PC", "PRINTER", "LAPTOP", "MONITOR"],
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex justify-center">
      <div className="bg-white w-full max-w-7xl shadow-md rounded-xl p-8 ">
        <h2 className="flex items-center gap-2 font-bold text-gray-800 mb-5 text-xl">
          <PlusIcon class="w-5 h-5 text-red-500" />
          ثبت اموال سازمان
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* نام */}
            <div>
              <label class="block text-sm font-medium text-gray-600 mb-2">
                نام
              </label>
              <div className="relative mt-1">
                <UserIcon className="absolute left-2 top-2 h-5 w-5 text-gray-400" />
                <input
                  {...register("name", {
                    required: { value: true, message: "نام الزامی است" },
                  })}
                  className="w-full flex justify-between items-center rounded-lg border border-gray-300 
                    bg-white py-2 px-3 text-sm text-gray-700  
                    hover:border-gray-400 focus:border-red-400 focus:ring-2 
                    focus:ring-red-300 transition-all pl-8 focus:outline-none"
                  placeholder="مثلاً چاپگر"
                />
                {errors.name && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
            </div>

            {/* کد */}
            <div>
              <label class="block text-sm font-medium text-gray-600 mb-2">
                کد
              </label>
              <div className="relative mt-1">
                <IdentificationIcon className="absolute left-2 top-2 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  {...register("code", {
                    required: { value: true, message: "کد الزامی است" },
                    valueAsNumber: {
                      value: true,
                      message: "کد باید عددی باشد",
                    },
                  })}
                  className="w-full flex justify-between items-center rounded-lg border border-gray-300 
                    bg-white py-2 px-3 text-sm text-gray-700  
                    hover:border-gray-400 focus:border-red-400 focus:ring-2 
                    focus:ring-red-300 transition-all pl-8 focus:outline-none"
                  placeholder="کد اموال"
                />
                {errors.code && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.code.message}
                  </p>
                )}
              </div>
            </div>

            {/* مالک */}
            <div>
              <label class="block text-sm font-medium text-gray-600 mb-2">
                مالک
              </label>
              <div className="relative mt-1">
                <BuildingOfficeIcon className="absolute left-2 top-2 h-5 w-5 text-gray-400" />
                <input
                  {...register("owner", {
                    required: { value: true, message: "مالک الزامی است" },
                  })}
                  className="w-full flex justify-between items-center rounded-lg border border-gray-300 
                    bg-white py-2 px-3 text-sm text-gray-700  
                    hover:border-gray-400 focus:border-red-400 focus:ring-2 
                    focus:ring-red-300 transition-all pl-8 focus:outline-none"
                  placeholder="نام مالک"
                />
                {errors.owner && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.owner.message}
                  </p>
                )}
              </div>
            </div>

            {/* status */}
            <div>
              <label class="block text-sm font-medium text-gray-600 mb-2">
                وضعیت
              </label>
              <div className="relative">
                <WrenchScrewdriverIcon className="absolute left-2 top-2 h-5 w-5 text-gray-400" />
                <button
                  type="button"
                  onClick={() => toggleDropdown("status")}
                  className="w-full flex justify-between items-center rounded-lg border border-gray-300 
                    bg-white py-2 px-3 text-sm text-gray-700  
                    hover:border-gray-400 focus:border-red-400 focus:ring-2 
                    focus:ring-red-300 transition-all pl-8 focus:outline-none"
                >
                  {selected.status || "انتخاب وضعیت"}
                  <ChevronDownIcon
                    className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                      dropdownOpen.status ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {dropdownOpen.status && (
                  <div className="absolute mt-2 w-full rounded-lg bg-white border border-gray-200 shadow-lg z-10 overflow-hidden">
                    {dropdowns.status.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSelect("status", opt)}
                        className="w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-500"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {!selected.status && (
                <p className="text-red-600 text-sm mt-1">وضعیت الزامی است</p>
              )}
            </div>

            {/* typeId */}
            <div>
              <label class="block text-sm font-medium text-gray-600 mb-2">
                نوع کالا
              </label>
              <div className="relative">
                <CpuChipIcon className="absolute left-2 top-2 h-5 w-5 text-gray-400" />
                <button
                  type="button"
                  onClick={() => toggleDropdown("typeId")}
                  className="w-full flex justify-between items-center rounded-lg border border-gray-300 
                    bg-white py-2 px-3 text-sm text-gray-700  
                    hover:border-gray-400 focus:border-red-400 focus:ring-2 
                    focus:ring-red-300 transition-all pl-8 focus:outline-none"
                >
                  {selected.typeId || "انتخاب نوع کالا"}
                  <ChevronDownIcon
                    className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                      dropdownOpen.typeId ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {dropdownOpen.typeId && (
                  <div className="absolute mt-2 w-full rounded-lg bg-white border border-gray-200 shadow-lg z-10 overflow-hidden">
                    {dropdowns.typeId.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSelect("typeId", opt)}
                        className="w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-500"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {!selected.typeId && (
                <p className="text-red-600 text-sm mt-1">نوع کالا الزامی است</p>
              )}
            </div>

            {/* department */}
            <div>
              <label class="block text-sm font-medium text-gray-600 mb-2">
                دپارتمان
              </label>
              <div className="relative">
                <TagIcon className="absolute left-2 top-2 h-5 w-5 text-gray-400" />
                <button
                  type="button"
                  onClick={() => toggleDropdown("department")}
                  className="w-full flex justify-between items-center rounded-lg border border-gray-300 
                    bg-white py-2 px-3 text-sm text-gray-700  
                    hover:border-gray-400 focus:border-red-400 focus:ring-2 
                    focus:ring-red-300 transition-all pl-8 focus:outline-none"
                >
                  {selected.department || "انتخاب دپارتمان"}
                  <ChevronDownIcon
                    className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                      dropdownOpen.department ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {dropdownOpen.department && (
                  <div className="absolute mt-2 w-full rounded-lg bg-white border border-gray-200 shadow-lg z-10 overflow-hidden">
                    {dropdowns.department.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSelect("department", opt)}
                        className="w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-500"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {!selected.department && (
                <p className="text-red-600 text-sm mt-1">دپارتمان الزامی است</p>
              )}
            </div>

            {/* آدرس */}
            <div className="md:col-span-2">
              <label class="block text-sm font-medium text-gray-600 mb-2">
                محل نگهداری
              </label>
              <div className="relative mt-1">
                <MapPinIcon className="absolute left-2 top-2 h-5 w-5 text-gray-400" />
                <input
                  {...register("address")}
                  className="w-full flex justify-between items-center rounded-lg border border-gray-300 
                    bg-white py-2 px-3 text-sm text-gray-700  
                    hover:border-gray-400 focus:border-red-400 focus:ring-2 
                    focus:ring-red-300 transition-all pl-8 focus:outline-none"
                  placeholder="مثلاً انفورماتیک"
                />
              </div>
            </div>

            {/* توضیحات */}
            <div className="md:col-span-3">
              <label class="block text-sm font-medium text-gray-600 mb-2">
                توضیحات
              </label>
              <div className="relative mt-1">
                <DocumentTextIcon className="absolute left-2 top-2 h-5 w-5 text-gray-400" />
                <textarea
                  {...register("description")}
                  className="w-full flex justify-between items-center rounded-lg border border-gray-300 
                    bg-white py-2 px-3 text-sm text-gray-700  
                    hover:border-gray-400 focus:border-red-400 focus:ring-2 
                    focus:ring-red-300 transition-all pl-8 focus:outline-none"
                  rows="3"
                  placeholder="توضیحات اختیاری..."
                ></textarea>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-red-400 text-white px-6 py-2 rounded-xl hover:bg-red-500 transition font-semibold"
            >
              {loading ? "در حال ثبت..." : "ثبت اموال"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertyListPage;
