/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchSingleItemThunk } from "../../../../redux/reducers/item";
import { StyledSingle_Item } from "./Single_Item.styled";
import {
  fetchCart,
  setToCart,
  setUpdateToCart,
} from "../../../../redux/reducers/singlecart";
import Image from "../../../utils/ImageComponent/Image";

const Single_Item = ({
  match,
  getItem,
  item,
  addToCart,
  cartItems,
  updateCart,
}) => {
  const initQuantity = cartItems.find((cartItem) => cartItem.id === item.id);
  console.log(initQuantity);
  const [quantity, setQuantity] = useState(
    (initQuantity && initQuantity["cart-item"].quantity) || 1
  );
  useEffect(() => {
    const { itemId } = match.params;
    if (!item.name || item.id !== Number(itemId)) {
      getItem(itemId);
    } else {
      // setFormData({ name: item.name });
    }
  }, [item]);
  const handleClick = () => {
    addToCart(item.id, quantity);
  };
  const handleUpdate = () => {
    updateCart(item.id, quantity);
  };
  return (
    <StyledSingle_Item>
      <header>
        <h2>{item.name}</h2>
      </header>
      <section>
        <div>
          <Image
            url={item.imageUrl}
            size={{ width: "300px", height: "300px" }}
          />
          <p>Price: {item.dollars}</p>
          <p>Description: {item.description}</p>
          {/* <p>Reviews: {getAverage(item.reviews)}</p> */}
          {item.stock > 0 && (
            <input
              type="number"
              min="1"
              max={item.stock}
              value={quantity}
              onChange={({ target }) => setQuantity(target.value)}
            />
          )}
          {!item.stock ? (
            <p>Out of Stock</p>
          ) : cartItems.find((cartitem) => cartitem.id === item.id) ? (
            <button onClick={handleUpdate}>Update Cart</button>
          ) : (
            <button onClick={handleClick}>Add to Cart</button>
          )}
        </div>
      </section>
    </StyledSingle_Item>
  );
};

const mapStateToProps = (state) => {
  const { item } = state.item;
  const { cartItems } = state.cartItems;
  return {
    item,
    cartItems,
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    getItem: (id) => dispatch(fetchSingleItemThunk(id)),
    addToCart: (itemId, quantity) => {
      dispatch(setToCart(itemId, quantity));
    },
    updateCart: (itemId, quantity) => {
      dispatch(setUpdateToCart(itemId, quantity));
    },
    getCart: (id) => {
      dispatch(fetchCart(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Single_Item);
