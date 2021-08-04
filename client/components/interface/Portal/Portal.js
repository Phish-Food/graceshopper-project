/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { me } from "../../../redux/reducers/auth";
import { StyledPortal } from "./Portal.styled";
import { Login } from "../../views/AuthForm";
import Loading from "../../views/Loading/Loading";

export const Portal = ({ Component, props, auth, preCheck }) => {
  return (
    <StyledPortal>
      <main id="main-portal">
        {!preCheck ? (
          <Loading />
        ) : !auth.id ? (
          <Login />
        ) : (
          <Component auth={auth} {...props} />
        )}
      </main>
    </StyledPortal>
  );
};
const mapState = (state) => {
  const { auth, preCheck } = state.auth;
  return {
    auth,
    preCheck,
  };
};
export default connect(mapState, null)(Portal);
