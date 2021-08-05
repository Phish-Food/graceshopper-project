import { combineReducers } from "redux";

import auth from "./reducers/auth";
import item from "./reducers/item";
import cartItems from "./reducers/singlecart"

const rootReducer = combineReducers({
  auth,
  item,
  cartItems,
});

export default rootReducer;
