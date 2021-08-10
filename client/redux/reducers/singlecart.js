import axios from "axios";
import history from "../../utils/history";

const GET_CART_ITEMS = "GET_CART_ITEMS";
const SET_CART_ITEM = "SET_CART_ITEM";
const SET_CHECKOUT = "SET_CHECKOUT";
const SET_GUESTCART_ITEMS = "SET_GUESTCART_ITEMS";
const SET_GUEST_CHECKOUT = "SET_GUEST_CHECKOUT";

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

const setGuestCheckout = () => {
  return {
    type: SET_GUEST_CHECKOUT,
  };
};
const getGuestCart = (cartItems) => {
  return {
    type: SET_GUESTCART_ITEMS,
    cartItems,
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
      dispatch(getCart(data.items));
    } catch (error) {
      console.log(error);
    }
  };
};

export const setToGuestCart = (itemId, quantity) => {
  return async (dispatch) => {
    try {
      const storage = window.localStorage;

      let guestcart = JSON.parse(storage.getItem("guestcart"));

      if (!guestcart) {
        const data = JSON.stringify({ [itemId]: quantity });
        storage.setItem("guestcart", data);
      } else {
        const prevData = JSON.parse(storage.getItem("guestcart"));
        const data = JSON.stringify({ ...prevData, [itemId]: quantity });

        storage.setItem("guestcart", data);
      }

      const { data } = await axios.post(
        `/api/guestcart/`,
        JSON.parse(storage.getItem("guestcart"))
      );
      dispatch(getGuestCart(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const setUpdateToCart = (itemId, quantity) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(
        `/api/usercart/update/${itemId}?quantity=${quantity}`
      );
      dispatch(getCart(data.items));
    } catch (error) {
      console.log(error);
    }
  };
};
export const setUpdateToGuestCart = (itemId, quantity) => {
  return async (dispatch) => {
    try {
      const storage = window.localStorage;
      const prevData = JSON.parse(storage.getItem("guestcart"));
      const guestCartItems = JSON.stringify({
        ...prevData,
        [itemId]: quantity,
      });

      storage.setItem("guestcart", guestCartItems);

      const { data } = await axios.post(
        `/api/guestcart/`,
        JSON.parse(storage.getItem("guestcart"))
      );
      dispatch(getGuestCart(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const setCheckoutStatus = (status, id, history) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/usercart/checkout`, status);
      dispatch(setCheckout());
      window.localStorage.clear();
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
};

export const setGuestCheckoutStatus = (guestCartItems) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(
        `/api/guestcart/checkout`,
        guestCartItems
      );
      window.localStorage.clear();
      dispatch(setGuestCheckout());
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
};

export const removeCartItem = (cartItem) => {
  return async (dispatch) => {
    try {
      console.log("FDSAFDSAFDSAFDSA", cartItem);
      const { data } = await axios.delete(`/api/usercart/${cartItem.id}`);
      //await axios.post(`/api/usercart/${id}`);
      dispatch(getCart(data.items));
      //history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
};

const initialState = {
  cartItems: [],
  guestCartItems: [],
};

export default function userCartReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CART_ITEMS:
      return { ...state, cartItems: action.cartItems };
    case SET_CHECKOUT:
      return { cartItems: [] };
    case SET_GUEST_CHECKOUT:
      return { guestCartItems: [] };
    case SET_CART_ITEM:
      return { cartItems: [...state.cartItems, action.cartItem] };
    case SET_GUESTCART_ITEMS:
      return { ...state, guestCartItems: action.cartItems };
    default:
      return state;
  }
}
