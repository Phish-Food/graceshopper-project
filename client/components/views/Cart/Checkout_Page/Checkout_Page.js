/* eslint-disable no-unused-vars */
import React,{useEffect} from "react";
import { connect } from "react-redux";
import { StyledCart_Checkout } from "./Checkout_Page.styled";
import Checkout_Item from "../Checkout_Item/Checkout_Item";
import { setCheckoutStatus } from "../../../../redux/reducers/singlecart";


const Checkout_Page = ({location,setCheckout,auth}) => {
  // const cartLength = auth.carts.length-2
  const totalprice=location.state.totalprice
  const userId = auth.id
  const cartItems=location.state.cartItems
  const totalDollars = Number(totalprice)/100
  useEffect(()=>{
    setCheckout({ status: "Purchased", totalprice }, userId)
  }),[]
  console.log('user',userId)
  console.log('price',totalprice)
  console.log(totalDollars)
  console.log('cart',cartItems)

  return <StyledCart_Checkout>
  
      <h2>Thank You For Shopping!</h2>
      <h3>Total: ${(totalDollars).toFixed(2)}</h3>
      <h3>Items Ordered:</h3>
      <h3>{cartItems.map((item)=>{
  
        return <Checkout_Item key={item.id} item={item} />
      })}</h3>
  </StyledCart_Checkout>;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return {

    setCheckout: (status,  id) => {
      dispatch(setCheckoutStatus(status, id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout_Page);
