import { legacy_createStore as createStore , combineReducers } from "redux";
import PropertyReducer from "../Reducers/PropertyReducer";
import searchReducer from "../Reducers/searchReducer";

// اگر چند reducer داری، با combineReducers ادغامشون کن


const rootReducer = combineReducers({
  property: PropertyReducer ,
  search : searchReducer,
});

const mainstore = createStore(rootReducer);

export default mainstore;
