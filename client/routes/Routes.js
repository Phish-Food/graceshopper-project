/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { withRouter, Redirect, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { me } from "../redux/reducers/auth";

import Home from "../components/views/Home/Home";
import Portal from "../components/interface/Portal/Portal";
import { Login, Signup } from "../components/views/AuthForm";
import FourOhFour from "../components/views/FourOhFour/FourOhFour";

import All_Carts from "../components/views/Cart/All_Carts/All_Carts";
import Cart_Item from "../components/views/Cart/Cart_Item/Cart_Item";
import Single_Cart from "../components/views/Cart/Single_Cart/Single_Cart";

import All_Items from "../components/views/Item/All_Items/All_Items";
import Item_Item from "../components/views/Item/Item_Item/Item_Item";
import Single_Item from "../components/views/Item/Single_Item/Single_Item";

const Routes = ({ getMe, isLoggedIn, open, preCheck, auth }) => {
  useEffect(() => {
    getMe();
  }, [isLoggedIn]);

  const renderer = (Component, props) => (
    <Portal {...{ Component, open, props, preCheck, auth }} />
  );

  return (
    <div>
      {isLoggedIn ? (
        <Switch>
          <Route path="/" render={(props) => renderer(Home, props)} />
        </Switch>
      ) : (
        <Switch>
          <Route path="/" render={(props) => renderer(Login, props)} />
          <Route path="/login" render={(props) => renderer(Login, props)} />
          <Route path="/signup" render={(props) => renderer(Signup, props)} />
        </Switch>
      )}
    </div>
  );
};

const mapState = (state) => {
  const { auth, preCheck } = state.auth;
  const isLoggedIn = !!auth.id;
  return {
    isLoggedIn,
    auth,
    preCheck,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getMe() {
      dispatch(me());
    },
  };
};

export default connect(mapState, mapDispatch)(Routes);
