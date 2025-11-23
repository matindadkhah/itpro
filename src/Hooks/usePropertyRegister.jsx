// src/hooks/usePropertyRegister.js
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import RegisterPropertyService from "../Services/RegisterPropertyService";
import { showToast } from "../components/Toastify/ShowToast";

export const usePropertyRegister = () => {
  const dispatch = useDispatch();
  const { loading, error, success, data, assetList } = useSelector(
    (state) => state.registerProperty
  );

  // ثبت اموال

  const createAsset = useCallback(
    async (assetData) => {
      dispatch({ type: "REGISTER_REQUEST" });

      try {
        const result = await RegisterPropertyService.createAsset(assetData);

        // 🔹 بررسی تکراری بودن بر اساس id
        const isDuplicate = Array.isArray(assetList)
          ? assetList.some((asset) => asset.id === result.id)
          : false;

        if (isDuplicate) {
          dispatch({ type: "REGISTER_FAIL" });
          showToast.warning("⚠️ رکوردی با این شناسه قبلاً ثبت شده است!");
          return null;
        }

        // اگر تکراری نبود، در state ذخیره شود
        dispatch({ type: "REGISTER_SUCCESS", payload: result });
        showToast.success("✅ اموال با موفقیت ثبت شد");
        return result;
      } catch (err) {
        dispatch({ type: "REGISTER_FAIL", payload: err });
        showToast.error("❌ خطا در ثبت اموال");
      }
    },
    [dispatch, assetList] // 🔹 وابستگی جدید اضافه شد
  );

  // دریافت لیست اموال با skip و take
  const getAssets = useCallback(async (params = { skip: 0, take: 10000 }) => {
    try {
      const response = await RegisterPropertyService.getAssets(params);
      console.log(response);
      dispatch({ type: "GETASSETLIST", payload: response });
      return response;
      // خروجی مستقیم به component
    } catch (err) {
      console.error("Error fetching assets:", err);
      return [];
    }
  }, []);
  const deleteAsset = useCallback(
    async (id) => {
      dispatch({ type: "DELETE_ASSET_REQUEST" });
      try {
        const result = await RegisterPropertyService.deleteAsset(id);
        dispatch({ type: "DELETE_ASSET_SUCCESS", payload: { id } });
        showToast.success("آیتم با موفقیت حذف شد");
      } catch (err) {
        dispatch({ type: "DELETE_ASSET_FAIL", payload: err });
        showToast.error("حذف ناموفق بود");
      }
    },
    [dispatch]
  );
  const updateAsset = useCallback(
    async (id, data) => {
      dispatch({ type: "UPDATE_ASSET_REQUEST" });
      try {
        const result = await RegisterPropertyService.updateAsset(id, data);
        dispatch({ type: "UPDATE_ASSET_SUCCESS", payload: result });
        showToast.success("ویرایش با موفقیت انجام شد");
        return result;
      } catch (err) {
        dispatch({ type: "UPDATE_ASSET_FAIL", payload: err });
        showToast.error("خطا در ویرایش آیتم");
        throw err;
      }
    },
    [dispatch]
  );

  return {
    createAsset,
    getAssets,
    deleteAsset,
    updateAsset,
    loading,
    error,
    success,
    data,
    assetList,
  };
};
