/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { connect } from "react-redux";
import { StyledCart_Item } from "./Cart_Item.styled";

const Cart_Item = ({ item, updateCartItem }) => {
  const [quantity, setQuantity] = useState(item["cart-item"].quantity);
  const handleClick = () => {
    updateCartItem();
  };
  return (
    <StyledCart_Item>
      <section>
        <h3>{item.name}</h3>

        <p>Price: {item.dollars}</p>
        <p>Description: {item.description}</p>
        {/* <p>Reviews: {getAverage(item.reviews)}</p> */}
        <input
          type="number"
          min="1"
          max={item.stock}
          value={quantity}
          onChange={({ target }) => {
            console.log(target.value);
            setQuantity(target.value);
          }}
        />
        <button onClick={handleClick}>Remove From Cart</button>
      </section>
    </StyledCart_Item>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    updateCartItem: () => {
      dispatch();
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart_Item);
