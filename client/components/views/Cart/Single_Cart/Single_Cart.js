/* eslint-disable no-unused-vars */
import React, {useEffect} from "react";
import { connect } from "react-redux";
import { StyledSingle_Cart } from "./Single_Cart.styled";
import { fetchCart } from '../../../../redux/reducers/singlecart';
import { Link } from 'react-router-dom';
import Item_Item from '../../Item/Item_Item/Item_Item.js';

const Single_Cart = ({cartItems, getCartView, userId}) => {

  useEffect(() => {
		getCartView(userId);
	}, [cartItems.length]);

  console.log('cart',cartItems.cartItems)


  return <StyledSingle_Cart>
  	<header>
			<h2>Cart</h2>
		</header>
    {cartItems.cartItems.map((item)=>{
      return <Item_Item key={item.id} item={item} />;
    })}
    <button>Checkout</button>
  </StyledSingle_Cart>;
};
  

const mapStateToProps = (state) => {
  const userId= state.auth.auth.id
  const {cartItems} = state
  return {
    cartItems,
    userId
  }

};

const mapDispatchToProps = (dispatch) => {
  return {
    getCartView: (userId) => {
      dispatch(fetchCart(userId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Single_Cart);
