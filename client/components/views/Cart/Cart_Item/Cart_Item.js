/* eslint-disable no-unused-vars */
import React from "react";
import { connect } from "react-redux";
import { StyledCart_Item } from "./Cart_Item.styled";

const Cart_Item = (props) => {
  return <StyledCart_Item></StyledCart_Item>;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Cart_Item);
