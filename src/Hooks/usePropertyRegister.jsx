// src/hooks/useRegister.js
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import RegisterPropertyService from "../Services/RegisterPropertyService";
import { showToast } from "../components/Toastify/ShowToast";

// Redux actions (درون همین فایل)
// const registerRequest = () => ({ type: "REGISTER_REQUEST" });
// const registerSuccess = (payload) => ({ type: "REGISTER_SUCCESS", payload });
// const registerFail = (error) => ({ type: "REGISTER_FAIL", error });

export const usePropertyRegister = () => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(
    (state) => state.registerProperty
  );

  const createAsset = useCallback(
    async (assetData) => {
      dispatch({ type: "REGISTER_REQUEST" });
      try {
        const result = await RegisterPropertyService.createAsset(assetData);
        dispatch({ type: "REGISTER_SUCCESS", peyload: result });
        showToast.success("اموال با موفقیت ثبت شد");
        return result;
      } catch (err) {
        dispatch({ type: "REGISTER_FAIL", payload: err });
        showToast.error("عدم ثبت اموال");
      }
    },
    [dispatch]
  );

  return { createAsset, loading, error, success };
};
