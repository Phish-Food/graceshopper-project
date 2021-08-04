/* eslint-disable no-unused-vars */
import React from "react";
import { connect } from "react-redux";
import { StyledAll_Items } from "./All_Items.styled";

const All_Items = (props) => {
  return <StyledAll_Items></StyledAll_Items>;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(All_Items);
