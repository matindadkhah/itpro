import React, { useState } from "react";
import { usePropertySearch } from "../../Hooks/usePropertySearch";
import { TextInput } from "../../assets/Inputs/TextInput ";
import { SelectInput } from "../../assets/Inputs/SelectInput";
import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchFilterForm() {
  const { searchProperties } = usePropertySearch();

  const [filter, setFilter] = useState({
    name: "",
    owner: "",
    code: "",
    typeId: "",
    department: "",
    status: "",
  });

  const updateFilter = (field, value) => {
    setFilter((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await searchProperties(filter);
  };

  return (
    <div className="bg-white  p-4  h-screen rounded-l-2xl">
      <h2 class="flex items-center gap-2 font-bold text-gray-800 mb-5 text-xl">
        <FunnelIcon className="w-5 h-5 text-red-500" />
        جستجوی پیشرفته
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 py-7 "
      >
        <TextInput
          label="نام اموال"
          name="name"
          placeholder="نام..."
          onValueChange={updateFilter}
        />
        <TextInput
          label="نام مالک"
          name="owner"
          placeholder="نام مالک"
          onValueChange={updateFilter}
        />
        <TextInput
          label="کد اموال"
          name="code"
          placeholder="کد اموال"
          onValueChange={updateFilter}
        />
        <SelectInput
          label="نوع اموال"
          name="typeId"
          placeholder="نوع اموال"
          options={{
            0: "همه",
            1: "کامپیوتر",
            2: "پرینتر",
            3: "لپ تاپ",
            4: "مانیتور",
          }}
          onValueChange={updateFilter}
        />
        <SelectInput
          label="بخش"
          name="department"
          placeholder="بخش"
          options={{
            default: "همه",
            IT: "انفورماتیک",
            PREVENTION: "پیشگیری",
            STATION: "ایستگاها",
            FINANCIAL: "مالی",
            MANAGER: "مدیریت",
          }}
          onValueChange={updateFilter}
        />
        <SelectInput
          label="وضعیت"
          name="status"
          placeholder="وضعیت"
          options={{
            default: "همه",
            ACTIVE: "فعال",
            REPAIRING: "درحال تعمیر",
            DECOMMISSIONED: "از رده خارج",
          }}
          onValueChange={updateFilter}
        />

        <div>
          <button
            type="submit"
            className="bg-red-400 text-white px-6 py-2 rounded-xl hover:bg-red-500 flex items-center justify-center gap-2"
          >
            <p>جستجو</p>
            <MagnifyingGlassIcon className="w-4 h-4 text-white" />
          </button>
        </div>
      </form>
      <div class="py-3 flex items-center text-sm text-gray-800 before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-white dark:before:border-neutral-600 dark:after:border-neutral-600">
        لیست جستجو
      </div>
    </div>
  );
}
