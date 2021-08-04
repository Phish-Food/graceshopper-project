/* eslint-disable no-unused-vars */
import React from "react";
import { connect } from "react-redux";
import { StyledNav } from "./Nav.styled";
import Image from "../../utils/ImageComponent/Image";
import { resetAuth } from "../../../redux/reducers/auth";

const Nav = ({ logout, isLoggedIn }) => {
  return (
    <StyledNav>
      <Image
        url={"/dummy_logo.png"}
        size={{ height: "80px", width: "120px" }}
        logo={true}
      />
      {isLoggedIn && (
        <a href="#" onClick={logout}>
          Logout
        </a>
      )}
    </StyledNav>
  );
};

const mapState = (state) => {
  const { auth } = state.auth;
  const isLoggedIn = !!auth.id;
  return {
    isLoggedIn,
  };
};
const mapDispatch = (dispatch) => {
  return {
    logout() {
      dispatch(resetAuth());
    },
  };
};

export default connect(mapState, mapDispatch)(Nav);
