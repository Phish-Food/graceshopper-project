/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { authenticate } from "../../../redux/reducers/auth";
import { StyledHome } from "./Home.styled";

const Home = ({ auth }) => {
  return <StyledHome>{auth.firstName}</StyledHome>;
};
export default connect(null, null)(Home);
