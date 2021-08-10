/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { connect } from "react-redux";
import { StyledCheckout_Item } from "./Checkout_Item.styled";

const Checkout_Item = ({ item }) => {
    console.log('newitem',item["cart-item"].quantity)
    
  return (
    <StyledCheckout_Item>

        <h3>{item.name}</h3>
        <p>QTY: {item["cart-item"].quantity}</p>
        <p>Price: {item.dollars}</p>

    </StyledCheckout_Item>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = () => {
  return {};

};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout_Item);
