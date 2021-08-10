import { combineReducers } from 'redux';

import auth from './reducers/auth';
import item from './reducers/item';
import cartItems from './reducers/singlecart';
import shop from './reducers/shop';

const rootReducer = combineReducers({
	auth,
	item,
	cartItems,
	shop,
});

export default rootReducer;
