import { legacy_createStore as createStore, combineReducers } from "redux";
import authReducer from "../Reducers/authReducer/";
import registerPropertyReducer from "../Reducers/registerPropertyReducer";
import searchPropertyReducer from "../Reducers/searchPropertyReducer";

// اگر چند reducer داری، با combineReducers ادغامشون کن

const rootReducer = combineReducers({
  auth: authReducer,
  registerProperty: registerPropertyReducer,
  searchProperties: searchPropertyReducer,
});

const mainstore = createStore(rootReducer);

export default mainstore;
