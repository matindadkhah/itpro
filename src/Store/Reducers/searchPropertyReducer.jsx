const initialState = {
  list: [],
  loading: false,
  error: null,
};

export default function searchPropertyReducer(state = initialState, action) {
  switch (action.type) {
    case "PROPERTY_SEARCH_REQUEST":
      return { ...state, loading: true, error: null };

    case "PROPERTY_SEARCH_SUCCESS":
      return { ...state, loading: false, list: action.payload };

    case "PROPERTY_SEARCH_FAILURE":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}
