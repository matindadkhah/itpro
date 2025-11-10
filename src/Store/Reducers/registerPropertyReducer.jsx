// src/redux/reducers/registerReducer.js
const initialState = {
  loading: false,
  success: false,
  error: null,
  data: [],
  assetList: [],
};

export default function registerPropertyReducer(state = initialState, action) {
  switch (action.type) {
    case "REGISTER_REQUEST":
      return { ...state, loading: true, error: null, success: false };
    case "REGISTER_SUCCESS":
      return {
        ...state,
        loading: false,
        success: true,
        data: action.payload,
        assetList: [...state.assetList, action.payload], // ← اضافه کردن آیتم جدید
      };

    case "REGISTER_FAIL":
      return { ...state, loading: false, error: action.error };
    case "GETASSETLIST":
      return {
        ...state,
        loading: false,
        error: null,
        assetList: action.payload, // ← کل لیست از backend
      };

    case "DELETE_ASSET_REQUEST":
      return { ...state, loading: true, error: null };
    case "DELETE_ASSET_SUCCESS":
      return {
        ...state,
        loading: false,
        assetList: state.assetList.filter(
          (item) => item.id !== action.payload.id
        ),
      };
    case "DELETE_ASSET_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "UPDATE_ASSET_REQUEST":
      return { ...state, loading: true, error: null };

    case "UPDATE_ASSET_SUCCESS":
      return {
        ...state,
        loading: false,
        assetList: state.assetList.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };

    case "UPDATE_ASSET_FAIL":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}
