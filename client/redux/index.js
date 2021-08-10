import { combineReducers } from 'redux';

import auth from './reducers/auth';
import item from './reducers/item';
import cartItems from './reducers/singlecart';
import adminUser from "./reducers/user"
import shop from './reducers/shop';

const rootReducer = combineReducers({
	auth,
	item,
	cartItems,
  adminUser,
	shop,
});

export default rootReducer;
