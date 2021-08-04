/* eslint-disable no-unused-vars */
import React from "react";
import { connect } from "react-redux";
import { StyledSingle_Cart } from "./Single_Cart.styled";

const Single_Cart = (props) => {
  return <StyledSingle_Cart></StyledSingle_Cart>;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Single_Cart);
