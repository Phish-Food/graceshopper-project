import axios from "axios";

const GET_CART_ITEMS = "GET_CART_ITEMS";
const SET_CART_ITEM = "SET_CART_ITEM";
const SET_CHECKOUT = "SET_CHECKOUT";

const getCart = (cartItems) => {
  return {
    type: GET_CART_ITEMS,
    cartItems,
  };
};

const setCartItem = (cartItem) => {
  return {
    type: SET_CART_ITEM,
    cartItem,
  };
};

const setCheckout = () => {
  return {
    type: SET_CHECKOUT,
  };
};

export const fetchCart = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/usercart/${id}`);
      dispatch(getCart(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const setToCart = (itemId, quantity) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        `/api/usercart/${itemId}?quantity=${quantity}`
      );
      console.log(data, "SetCart");
      dispatch(setCartItem(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const setCheckoutStatus = (status, id, history) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/usercart/checkout`, status);
      await axios.post(`/api/usercart/${id}`);
      dispatch(setCheckout());
      history.push("/");
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
      return { ...state, cartItems: action.cartItems };
    case SET_CHECKOUT:
      return { cartItems: [] };
    case SET_CART_ITEM:
      return { cartItems: [...state.cartItems, action.cartItem] };
    default:
      return state;
  }
}
