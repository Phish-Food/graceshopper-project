/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { StyledSingle_GuestCart } from './Single_GuestCart.styled';
import { setGuestCheckoutStatus } from '../../../../redux/reducers/singlecart';
import { Link } from 'react-router-dom';
import Item_Item from '../../Item/Item_Item/Item_Item.js';
import Cart_Item from '../Cart_Item/Cart_Item';

const Single_GuestCart = ({ guestCartItems, setGuestCheckout }) => {
	const handleClick = () => {
		setGuestCheckout(guestCartItems);
	};
	return (
		<StyledSingle_GuestCart>
			<header>
				<h2>Guest Cart</h2>
			</header>
			<div>
				{guestCartItems.map((item) => {
					return (
						<p key={item.id}>
							{item.name} - {item.quantity}
						</p>
					);
				})}
				<button onClick={handleClick}>Checkout</button>
			</div>
		</StyledSingle_GuestCart>
	);
};

const mapStateToProps = (state) => {
	const { guestCartItems } = state.cartItems;
	return {
		guestCartItems,
	};
};

const mapDispatchToProps = (dispatch, { history }) => {
	return {
		setGuestCheckout: (guestCartItems) => {
			dispatch(setGuestCheckoutStatus(guestCartItems));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Single_GuestCart);
