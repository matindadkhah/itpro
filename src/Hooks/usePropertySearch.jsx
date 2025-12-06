import { useDispatch, useSelector } from "react-redux";
import SearchPropertyService from "../Services/SearchPropertyService";

export const usePropertySearch = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector(
    (state) => state.searchProperties
  );

  const service = new SearchPropertyService();

  const searchProperties = async (filters) => {
    dispatch({ type: "PROPERTY_SEARCH_REQUEST" });

    try {
      const data = await service.searchAssets(filters);

      dispatch({ type: "PROPERTY_SEARCH_SUCCESS", payload: data });
    } catch (err) {
      dispatch({
        type: "PROPERTY_SEARCH_FAILURE",
        payload: err,
      });
    }
  };

  return { list, loading, error, searchProperties };
};
