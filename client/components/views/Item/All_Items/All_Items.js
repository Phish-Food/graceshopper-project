/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { StyledAll_Items } from "./All_Items.styled";
import { fetchAllItemsThunk } from "../../../../redux/reducers/item";
import Item_Item from "../Item_Item/Item_Item";

const All_Items = ({ getItems, items }) => {
  useEffect(() => {
    getItems();
  }, [items]);

  return (
    <StyledAll_Items>
      {items.map((item) => {
        return <Item_Item key={item.id} />;
      })}
    </StyledAll_Items>
  );
};

const mapStateToProps = (state) => {
  const { items } = state.items;
  return {
    items,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getItems: () => {
      dispatch(fetchAllItemsThunk());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(All_Items);
