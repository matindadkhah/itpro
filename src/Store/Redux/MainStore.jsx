import { legacy_createStore as createStore, combineReducers } from "redux";
import searchReducer from "../Reducers/searchReducer";
import authReducer from "../Reducers/authReducer/";
import registerPropertyReducer from "../Reducers/registerPropertyReducer";

// اگر چند reducer داری، با combineReducers ادغامشون کن

const rootReducer = combineReducers({
  search: searchReducer,
  auth: authReducer,
  registerProperty: registerPropertyReducer,
});

const mainstore = createStore(rootReducer);

export default mainstore;
