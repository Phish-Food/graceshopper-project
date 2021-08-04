import { combineReducers } from "redux";

import auth from "./reducers/auth";
import item from "./reducers/item";

const rootReducer = combineReducers({
  auth,
  item,
});

export default rootReducer;
