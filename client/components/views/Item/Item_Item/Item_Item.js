/* eslint-disable no-unused-vars */
import React from "react";
import { connect } from "react-redux";
import { StyledItem_Item } from "./Item_Item.styled";

const Item_Item = (props) => {
  return <StyledItem_Item></StyledItem_Item>;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Item_Item);
