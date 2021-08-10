import axios from 'axios';

// ACTION TYPES
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const ADJUST_QTY = 'ADJUST_QTY';

//ACTION CREATORS
export const addToCart = (itemId) => {
	return {
		type: ADD_TO_CART,
		itemId,
	};
};

export const removeFromCart = (itemId) => {
	return {
		type: REMOVE_FROM_CART,
		itemId,
	};
};

export const adjustQty = (itemId, quantity) => {
	return {
		type: ADJUST_QTY,
		itemId,
		quantity,
	};
};

//THUNKS

export const addToCartThunk = (id) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.post(
				`/api/guestcart/${itemId}?quantity=${quantity}`
			);
			dispatch(addToCart(data));
		} catch (error) {
			console.log(error);
		}
	};
};

export const removeFromCartThunk = (id) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.delete(`/api/items/${id}`);
			dispatch(removeFromCart(data));
		} catch (error) {
			console.log(error);
		}
	};
};

//REDUCER
const initialState = {
	items: [], // id, name, price, stock, imageUrl
	cart: [], //id, name, price, stock, imageUrl
};

export default function shopReducer(state = initialState, action) {
	switch (action.type) {
		case ADD_TO_CART:
			const item = state.items.find((item) => item.id === action.itemId);

			const inCart = state.cart.find((item) =>
				item.id === action.id ? true : false
			);
			return {
				...state,
				cart: inCart
					? state.cart.map((item) =>
							item.id === aciton.itemId
								? { ...item, quantity: item.quantity + 1 }
								: item
					  )
					: [...state.cart, { ...item, quantity: 1 }],
			};
		case REMOVE_FROM_CART:
			return {
				...state,
				cart: state.cart.filter((item) => item.id !== action.itemId),
			};
		case ADJUST_QTY:
			return {
				...state,
				cart: state.cart.map((item) =>
					item.id === action.itemId
						? { ...item, quantity: action.quantity }
						: item
				),
			};

		default:
			return state;
	}
}
