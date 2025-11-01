import { useDispatch } from "react-redux";
import mainstore from "../Store/Redux/MainStore";

export default function useSearchFilters() {
  const dispatch = useDispatch();

  // تغییر مقدار فیلتر
  const handleChange = (key, value) => {
    dispatch({ type: "SET_FILTER", payload: { key, value } });
  };

  // باز و بسته کردن منوی انتخاب
  const toggleDropdown = (key) => {
    const current = mainstore.getState().search.dropdownOpen[key];
    dispatch({ type: "SET_DROPDOWN_OPEN", payload: { key, value: !current } });
  };

  // اعمال فیلتر
  const handleSearch = (data, onSearch) => {
    const { filters } = mainstore.getState().search;

    const noFilters = Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      if (key.toLowerCase().includes("date")) return !value?.gregorian;
      return false;
    });

    if (noFilters) {
      onSearch(data);
      return;
    }

    const filteredData = data.filter((item) =>
      Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        if (key.toLowerCase().includes("date")) {
          return item[key]?.includes(value.gregorian);
        }
        const itemValue = item[key]?.toString().toLowerCase();
        const filterValue = value.toString().toLowerCase();
        return itemValue?.includes(filterValue);
      })
    );

    onSearch(filteredData);
  };

  // ریست فیلترها
  const handleReset = (data, onSearch) => {
    dispatch({ type: "RESET_FILTERS" });
    onSearch(data);
  };

  return {
    handleChange,
    handleSearch,
    handleReset,
    toggleDropdown,
  };
}
