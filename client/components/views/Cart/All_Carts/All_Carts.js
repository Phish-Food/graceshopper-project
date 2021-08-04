/* eslint-disable no-unused-vars */
import React from "react";
import { connect } from "react-redux";
import { StyledAll_Carts } from "./All_Carts.styled";

const All_Carts = (props) => {
  return <StyledAll_Carts></StyledAll_Carts>;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(All_Carts);
