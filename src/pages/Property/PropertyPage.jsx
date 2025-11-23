import { useState } from "react";
import PropertyListPage from "./PropertyListPage";
import PropertySearch from "./PropertySearch";

export default function PropertyPage() {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div>
      {/* Mobile Select */}
      <select
        className="sm:hidden py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
        value={activeTab}
        onChange={(e) => setActiveTab(Number(e.target.value))}
      >
        <option value={1}>Tab 1</option>
        <option value={2}>Tab 2</option>
      </select>

      {/* Desktop Tabs */}
      <div className="hidden sm:block ">
        <nav className="flex gap-x-2">
          {[1, 2].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`
               py-2 px-4  rounded-t-md  
                ${
                  activeTab === tab
                    ? "bg-white border-b-transparent text-red-400"
                    : "bg-gray-50 text-gray-500 hover:text-gray-700"
                }
              `}
            >
              {tab == 1 ? "لیست اموال" : "جستجو"}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Panels */}
      <div>
        {activeTab === 1 && (
          <div>
            <PropertyListPage />
          </div>
        )}

        {activeTab === 2 && (
          <div>
            <p className="text-gray-500">
              <PropertySearch />
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
