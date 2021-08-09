/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { StyledAll_Items } from "./All_Items.styled";
import { fetchAllItemsThunk } from "../../../../redux/reducers/item";
import Item_Item from "../Item_Item/Item_Item";
import { fetchCart } from "../../../../redux/reducers/singlecart";

const All_Items = ({ auth, items, getAllItems, getCart }) => {
  useEffect(() => {
    getCart(auth.id);
    getAllItems();
  }, [items.length]);

  return (
    <StyledAll_Items>
      {items.map((item) => {
        return <Item_Item key={item.id} item={item} />;
      })}
    </StyledAll_Items>
  );
};
const mapStateToProps = (state) => {
  const { items } = state.item;
  const { auth } = state.auth;
  return {
    items,
    auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllItems: () => dispatch(fetchAllItemsThunk()),
    getCart: (id) => {
      dispatch(fetchCart(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(All_Items);
