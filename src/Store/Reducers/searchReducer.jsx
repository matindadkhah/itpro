const initialState = {
  filters: {},
  dropdownOpen: {},
  data: [],
};

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_FILTER":
      return {
        ...state,
        filters: { ...state.filters, [action.payload.key]: action.payload.value },
      };

    case "RESET_FILTERS":
      return { ...state, filters: {} };

    case "SET_DROPDOWN_OPEN":
      return {
        ...state,
        dropdownOpen: {
          ...state.dropdownOpen,
          [action.payload.key]: action.payload.value,
        },
      };

    case "SET_DATA":
      return { ...state, data: action.payload };

    default:
      return state;
  }
}
