/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { StyledSingle_Cart } from './Single_Cart.styled';
import {
	fetchCart,
	setCheckoutStatus,
} from '../../../../redux/reducers/singlecart';
import { Link } from 'react-router-dom';
import Item_Item from '../../Item/Item_Item/Item_Item.js';
import Cart_Item from '../Cart_Item/Cart_Item';

const Single_Cart = ({ auth, cartItems, getCartView, userId, setCheckout }) => {
	useEffect(() => {
		getCartView(userId);
	}, [cartItems.length]);

  console.log("cart", cartItems.cartItems);
  const totalprice = cartItems.cartItems.reduce(
    (total, item) => total + item["cart-item"].quantity * item.price,
    0
  );

  const totalDollar = (totalprice/100).toFixed(2)
  console.log("cart", cartItems.cartItems);
  return (
    <StyledSingle_Cart>
      <header>
        <h2>Cart</h2>
      </header>
      {cartItems.cartItems.length < 1 ? (
        <h2>
          No Items Here :(! Start Adding <Link to="/items"> Items </Link>!
        </h2>
      ) : (
        cartItems.cartItems.map((item) => {
          return <Cart_Item key={item.id} item={item} />;
        })
      )}
      <h2>Total Price: ${totalDollar}</h2>
      <Link to={{pathname:"/checkout", state:{ cartItems:cartItems.cartItems, totalprice:totalprice}}}
        // onClick={() => setCheckout({ status: "Purchased", totalprice }, userId)}
      >
        Checkout
      </Link>
    </StyledSingle_Cart>
  );
};

const mapStateToProps = (state) => {
	const userId = state.auth.auth.id;
	const { cartItems } = state;

	return {
		cartItems,
		userId,
	};
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCartView: (userId) => {
      dispatch(fetchCart(userId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Single_Cart);
