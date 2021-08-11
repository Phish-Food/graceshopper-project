import axios from 'axios';

import history from "../../utils/history";

const GOT_ITEMS = 'GOT_ITEMS';
const GOT_SINGLE_ITEM = 'GOT_SINGLE_ITEM';
const ADD_ITEM = 'ADD_ITEM';


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
const addItem = (item) => {
	return {
		type: ADD_ITEM,
		item,
	};
};

export const editItemThunk = (state,id,history) => {

	return async (dispatch) => {
		try {
	
			await axios.put(`/api/items/${id}`,state);
			history.push("/")
		} catch (error) {
			console.log(error);
		}
	};
};

export const fetchAllItemsThunk = () => {
	return async (dispatch) => {
		console.log('this goes off')
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


export const addItemThunk = (form) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.post(`/api/items/`, form);
			dispatch(addItem(data));
			history.push('/');
    
   } catch (error) {
			console.log(error);
		}
	};
};

export const deleteItemThunk = (id) => {
	console.log(id)
	return async (dispatch) => {
		try {
			console.log('this id is passed', id)
			console.log('this thunk called')
			await axios.delete(`/api/items/${id}`);
			dispatch(fetchAllItemsThunk())

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
		case ADD_ITEM:
			return { ...state, items: [...state.items, action.item] };
		default:
			return state;
	}
}
