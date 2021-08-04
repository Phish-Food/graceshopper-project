/* eslint-disable no-unused-vars */
import React from "react";
import { connect } from "react-redux";
import { StyledSingle_Item } from "./Single_Item.styled";

const Single_Item = (props) => {
  return <StyledSingle_Item></StyledSingle_Item>;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Single_Item);
