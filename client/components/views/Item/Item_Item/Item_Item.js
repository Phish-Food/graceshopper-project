/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { StyledItem_Item } from "./Item_Item.styled";
import { Link } from "react-router-dom";
import {
  fetchCart,
  setToCart,
  setUpdateToCart,
  setToGuestCart,
  setUpdateToGuestCart,
} from "../../../../redux/reducers/singlecart";
import Image from "../../../utils/ImageComponent/Image";

const Item_Item = ({
  auth,
  item,
  addToCart,
  cartItems,
  updateCart,
  getCart,
  addToGuestCart,
  updateGuestCart,
  guestCartItems,
  isLoggedin,
}) => {
  // const getAverage = (reviews) => {
  //   if (!reviews.length) {
  //     return 0;
  //   }
  //   return (
  //     reviews.reduce((rating, review) => {
  //       return review.rating + rating;
  //     }, 0) / reviews.length
  //   );
  // };
  useEffect(() => {
    // getCart(auth.id);
  }, []);
  let initState;
  let initQuantity;
  if (isLoggedin) {
    initQuantity =
      cartItems && cartItems.find((cartItem) => cartItem.id === item.id);
    initState = (initQuantity && initQuantity["cart-item"].quantity) || 1;
  } else {
    const guestCartItems =
      JSON.parse(window.localStorage.getItem("guestcart")) || {};

    initQuantity = guestCartItems[item.id];
    initState = initQuantity || 1;
  }

  const [quantity, setQuantity] = useState(initState);

  const handleClick = () => {
    console.log(isLoggedin, "This should be true when logged in");
    if (isLoggedin) {
      addToCart(item.id, quantity);
    } else {
      addToGuestCart(item.id, quantity);
    }
  };
  const handleUpdate = () => {
    if (isLoggedin) {
      updateCart(item.id, quantity);
    } else {
      updateGuestCart(item.id, quantity);
    }
  };
  const tester = () => {
    if (isLoggedin) {
      return cartItems && cartItems.find((cartitem) => cartitem.id === item.id);
    } else {
      const guestCartItems =
        JSON.parse(window.localStorage.getItem("guestcart")) || {};
      return guestCartItems[item.id] !== undefined;
    }
  };
  return (
    <StyledItem_Item>
      <header>
        <section id="item-section">
          <Link to={`/items/${item.id}`}>
            {/* <img src={item.imageUrl} /> */}
            <Image
              url={item.imageUrl}
              size={{ height: "300px", width: "150px" }}
            />
          </Link>
        </section>
      </header>
      <div>
        <h3>{item.name}</h3>
        <p>Price: {item.dollars}</p>
        <p>Description: {item.description}</p>
        {/* <p>Reviews: {getAverage(item.reviews)}</p> */}
        {item.stock > 0 && (
          <input
            type="number"
            min="1"
            max={item.stock}
            value={quantity}
            onChange={({ target }) => setQuantity(target.value)}
          />
        )}
        {!item.stock ? (
          <p>Out of Stock</p>
        ) : tester() ? (
          <button onClick={handleUpdate}>Update Cart</button>
        ) : (
          <button onClick={handleClick}>Add to Cart</button>
        )}
      </div>
    </StyledItem_Item>
  );
};

const mapStateToProps = (state) => {
  const { auth } = state.auth;
  const isLoggedin = !!auth.id;
  return {
    cartItems: state.cartItems.cartItems,
    guestCartItems: state.cartItems.guestCartItems,
    isLoggedin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (itemId, quantity) => {
      dispatch(setToCart(itemId, quantity));
    },
    updateCart: (itemId, quantity) => {
      dispatch(setUpdateToCart(itemId, quantity));
    },
    updateGuestCart: (itemId, quantity) => {
      dispatch(setUpdateToGuestCart(itemId, quantity));
    },
    getCart: (id) => {
      dispatch(fetchCart(id));
    },
    addToGuestCart: (itemId, quantity) => {
      dispatch(setToGuestCart(itemId, quantity));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Item_Item);
