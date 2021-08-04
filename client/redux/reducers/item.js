import axios from 'axios';

const GOT_ITEMS = 'GOT_ITEMS';
const GOT_SINGLE_ITEM = 'GOT_SINGLE_ITEM';

const setItems = (items) => {
	return {
		type: GOT_ITEMS,
		items,
	};
};

const setSingleItem = (item) => {
	return {
		type: GOT_SINGLE_ITEM,
		item,
	};
};

export const fetchAllItemsThunk = () => {
	return async (dispatch) => {
		try {
			const { data } = await axios.get('/api/items');
			dispatch(setItems(data));
		} catch (error) {
			console.log(error);
		}
	};
};

export const fetchSingleItemThunk = (id) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.get(`/api/items/${id}`);
			dispatch(setSingleItem(data));
		} catch (error) {
			console.log(error);
		}
	};
};

const initialState = {
	items: [],
	item: {},
};
export default function itemsReducer(state = initialState, action) {
	switch (action.type) {
		case GOT_ITEMS:
			return { ...state, items: action.items };
		case GOT_SINGLE_ITEM:
			return { ...state, item: action.item };
		default:
			return state;
	}
}
