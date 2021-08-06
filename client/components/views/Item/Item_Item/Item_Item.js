/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { connect } from "react-redux";
import { StyledItem_Item } from "./Item_Item.styled";
import { Link } from "react-router-dom";
import { setToCart } from "../../../../redux/reducers/singlecart";

const Item_Item = ({ item, addToCart }) => {
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
  const [quantity, setQuantity] = useState(1);
  const handleClick = () => {
    addToCart(item.id, quantity);
  };
  return (
    <StyledItem_Item>
      <header>
        <section id="item-section">
          <Link to={`/items/${item.id}`}>
            <img src={item.imageUrl} />
          </Link>
        </section>
      </header>
      <div>
        <h3>{item.name}</h3>

        <p>Price: {item.dollars}</p>
        <p>Description: {item.description}</p>
        {/* <p>Reviews: {getAverage(item.reviews)}</p> */}
        <input
          type="number"
          min="1"
          max={item.stock}
          value={quantity}
          onChange={({ target }) => {
            console.log(target.value);
            setQuantity(target.value);
          }}
        />
        <button onClick={handleClick}>Add to Cart</button>
      </div>
    </StyledItem_Item>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (itemId, quantity) => {
      dispatch(setToCart(itemId, quantity));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Item_Item);
