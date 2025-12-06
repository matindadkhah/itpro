import React, { useState } from "react";
import { usePropertySearch } from "../../Hooks/usePropertySearch";
import { TextInput } from "../../assets/Inputs/TextInput ";
import { SelectInput } from "../../assets/Inputs/SelectInput";
import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";

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
  function statusText(status) {
    switch (status) {
      case "ACTIVE":
        return "فعال";
      case "REPAIRING":
        return "در حال تعمیر";
      case "DECOMMISSIONED":
        return "از رده خارج";
      default:
        return "";
    }
  }
  function category(number) {
    switch (number) {
      case 1:
        return "کامپیوتر";
      case 2:
        return "پرینتر";
      case 3:
        return "لپ تاپ";
      case 4:
        return "مانیتور";
      default:
        return "";
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await searchProperties(filter);
  };
  const { list } = usePropertySearch();

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

      <div className="grid grid-cols-3  p-4 gap-6">
        <div className="grid gap-6">
          {list.map((item) => (
            <div
              key={item.id}
              className="relative bg-white rounded-2xl p-6 shadow-xl"
            >
              <div className="flex justify-start items-center gap-3 ">
                <span className="bg-red-50 text-red-700 p-2 rounded-full flex flex-shrink-0 text-sm">
                  MJ
                </span>
                <div className="flex flex-col gap-1">
                  <span className="text-gray-600">{item.owner}</span>
                  <span className="text-[12px] pr-1">
                    رئیس اداره انفورماتیک
                  </span>
                </div>
              </div>
              <hr class="border-red-200 my-2"></hr>
              <div className="flex gap-1.5 flex-wrap">
                <div className="text-[12px] font-semibold bg-gray-100 rounded-lg p-1 flex justify-between items-center gap-1">
                  <p>نام</p>
                  <span>{item.name}</span>
                </div>
                <div
                  className={`${
                    item.status === "ACTIVE"
                      ? "bg-green-100"
                      : item.status === "REPAIRING"
                      ? "bg-yellow-100"
                      : "bg-red-100"
                  } box text-[12px] font-semibold bg-gray-100 rounded-lg p-1 flex justify-between items-center gap-1`}
                >
                  <p>وضعیت</p>
                  {statusText(item.status)}
                </div>
                <div className="text-[12px] font-semibold gap-1 bg-gray-100 rounded-lg p-1 flex justify-between items-center">
                  <p>دسته</p>
                  {category(item.typeRef.id)}
                </div>
                <div className="text-[12px] bg-gray-100 font-semibold gap-1  rounded-lg p-1 flex justify-between items-center">
                  <p>دپارتمان</p>
                  {item.department}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
