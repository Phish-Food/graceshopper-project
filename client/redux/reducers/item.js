import axios from "axios";

const GOT_ITEMS = "GOT_ITEMS";

const setItems = (items) => {
  return {
    type: GOT_ITEMS,
    items,
  };
};

export const fetchAllItemsThunk = () => {
  return async (dispatch) => {
    try {
      const { data: items } = await axios.get("/api/items");
      dispatch(setItems(items));
    } catch (error) {
      console.log(error);
    }
  };
};

export default function itemsReducer(state = [], action) {
  switch (action.type) {
    case GOT_ITEMS:
      return action.items;
    default:
      return state;
  }
}
