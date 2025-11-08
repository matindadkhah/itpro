// src/redux/reducers/registerReducer.js
const initialState = {
  loading: false,
  success: false,
  error: null,
};

export default function registerPropertyReducer(state = initialState, action) {
  switch (action.type) {
    case "REGISTER_REQUEST":
      return { ...state, loading: true, error: null, success: false };
    case "REGISTER_SUCCESS":
      return { ...state, loading: false, success: true };
    case "REGISTER_FAIL":
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
}
