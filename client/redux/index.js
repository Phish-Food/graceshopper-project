import { combineReducers } from "redux";

import auth from "./reducers/auth";
import item from "./reducers/item";
import cartItems from "./reducers/singlecart"
import adminUser from "./reducers/user"

const rootReducer = combineReducers({
  auth,
  item,
  cartItems,
  adminUser
});

export default rootReducer;
