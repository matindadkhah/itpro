import { legacy_createStore as createStore, combineReducers } from "redux";
import searchReducer from "../Reducers/searchReducer";
import authReducer from "../Reducers/authReducer/";

// اگر چند reducer داری، با combineReducers ادغامشون کن


const rootReducer = combineReducers({
  search: searchReducer,
  auth: authReducer
});

const mainstore = createStore(rootReducer);

export default mainstore;
