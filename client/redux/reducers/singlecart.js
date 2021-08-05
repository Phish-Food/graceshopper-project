import axios from 'axios';


const GET_CART_ITEMS = "GET_CART_ITEMS"

const getCart = (cartItems) => {
	return {
		type: GET_CART_ITEMS,
		cartItems,
	};
};

export const fetchCart = (id) => {
	return async (dispatch) => {
		try {
            console.log('id',id)
			const { data } = await axios.get(`/api/usercart/${id}`);
            console.log('data',data)
			dispatch(getCart(data));
		} catch (error) {
			console.log(error);
		}
	};
};


const initialState = {
	cartItems: [],
};

export default function userCartReducer(state = initialState, action) {
	switch (action.type) {
		case GET_CART_ITEMS:
			return { ...state, cartItems:action.cartItems }
		default:
			return state;
	}
}