/* eslint-disable no-unused-vars */
// Menu.js
import React from 'react';
import { StyledMenu } from './Menu.styled';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Menu = ({ open, isLoggedin }) => {
	return (
		<StyledMenu open={open}>
			<div>
				<header>
					{isLoggedin ? (
						<Link to="/carts">
							<h3>My Cart</h3>
						</Link>
					) : (
						<Link to="/guestcart">
							<h3>Cart</h3>
						</Link>
					)}
				</header>
			</div>
			<div>
				<header>
					<Link to="/items">
						<h3>All Items</h3>
					</Link>
				</header>
			</div>
			<div>
				<header>
					<h3>Dummy</h3>
				</header>
			</div>
		</StyledMenu>
	);
};

const mapStateToProps = (state) => {
	const { auth } = state.auth;
	const  isLoggedin  = !!auth.id;
	return {
		isLoggedin,
	};
};

export default connect(mapStateToProps, null)(Menu);
