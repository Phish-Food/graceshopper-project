/* eslint-disable no-unused-vars */
import React, {useEffect} from "react";
import { connect } from "react-redux";
import { StyledSingle_Cart } from "./Single_Cart.styled";
import { fetchCart, setCheckoutStatus } from '../../../../redux/reducers/singlecart';
import { Link } from 'react-router-dom';
import Item_Item from '../../Item/Item_Item/Item_Item.js';


const Single_Cart = ({cartItems, getCartView, userId,setCheckout}) => {

  useEffect(() => {
		getCartView(userId);
	}, [cartItems.length]);

  console.log('cart',cartItems.cartItems)


  return <StyledSingle_Cart>
  	<header>
			<h2>Cart</h2>
		</header>
    {cartItems.cartItems.length<1?(<h2>No Items Here :(! Start Adding <Link to='/items'> Items </Link>!</h2> ): cartItems.cartItems.map((item)=>{
      return <Item_Item key={item.id} item={item} />;
    })}
    <button onClick={() => setCheckout({status:'Purchased'},userId)}>Checkout</button>
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

const mapDispatchToProps = (dispatch,{history}) => {
  return {
    getCartView: (userId) => {
      dispatch(fetchCart(userId))
    },
    setCheckout: (status,id) => {
      dispatch(setCheckoutStatus(status,id,history))
    }
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Single_Cart);
