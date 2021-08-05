/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { withRouter, Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { me } from '../redux/reducers/auth';

import Home from '../components/views/Home/Home';
import Portal from '../components/interface/Portal/Portal';
import { Login, Signup } from '../components/views/AuthForm';
import FourOhFour from '../components/views/FourOhFour/FourOhFour';

import All_Carts from '../components/views/Cart/All_Carts/All_Carts';
import Cart_Item from '../components/views/Cart/Cart_Item/Cart_Item';
import Single_Cart from '../components/views/Cart/Single_Cart/Single_Cart';

import All_Items from '../components/views/Item/All_Items/All_Items';
import Item_Item from '../components/views/Item/Item_Item/Item_Item';
import Single_Item from '../components/views/Item/Single_Item/Single_Item';

const Routes = ({ getMe, isLoggedIn, open, preCheck, auth }) => {
	useEffect(() => {
		getMe();
	}, [isLoggedIn]);

	const renderer = (Component, props) => (
		<Portal {...{ Component, props, open, preCheck, auth }} />
	);

	return (
		<div>
			{isLoggedIn ? (
				<Switch>
					<Route exact path="/" render={(props) => renderer(Home, props)} />
					<Route
						exact
						path="/carts"
						render={(props) => renderer(Single_Cart, props)}
					/>
					<Route
						exact
						path="/items"
						render={(props) => renderer(All_Items, props)}
					/>
					<Route
						exact
						path="/items/:itemId"
						render={(props) => renderer(Single_Item, props)}
					/>
					<Route
						exact
						path="/:any"
						render={(props) => renderer(FourOhFour, props)}
					/>
					
				</Switch>
			) : (
				<Switch>
					<Route exact path="/" render={(props) => renderer(Login, props)} />
					<Route
						exact
						path="/carts"
						render={(props) => renderer(Single_Cart, props)}
					/>
					<Route
						exact
						path="/login"
						render={(props) => renderer(Login, props)}
					/>
					<Route
						exact
						path="/signup"
						render={(props) => renderer(Signup, props)}
					/>
					<Route
						exact
						path="/items"
						render={(props) => renderer(All_Items, props)}
					/>
					<Route
						exact
						path="/items/:itemId"
						render={(props) => renderer(Single_Item, props)}
					/>
					


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
