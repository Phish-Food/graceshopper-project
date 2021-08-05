/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { connect } from "react-redux";
import { StyledItem_Item } from "./Item_Item.styled";
import { Link } from "react-router-dom";

const Item_Item = ({ item }) => {
  const getAverage = (reviews) => {
    if (!reviews.length) {
      return 0;
    }
    return (
      reviews.reduce((rating, review) => {
        return review.rating + rating;
      }, 0) / reviews.length
    );
  };
  return (
    <StyledItem_Item>
      <Link to={`/items/${item.id}`}>
        <header>
          <section id="item-section">
            <img src={item.imageUrl} />
          </section>
        </header>
        <div>
          <h3>{item.name}</h3>

          <p>Price: {item.dollars}</p>
          <p>Description: {item.description}</p>
          <p>Reviews: {getAverage(item.reviews)}</p>
        </div>
      </Link>
    </StyledItem_Item>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Item_Item);
