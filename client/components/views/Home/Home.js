/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { StyledHome } from "./Home.styled";
import Item_Item from "../Item/Item_Item/Item_Item";

const Home = ({ user }) => {
  return (
    <StyledHome>
      <header>
        <h1>
          {user.firstName} {user.lastName}
        </h1>
      </header>
      <section>
        <div>
          <h2>Cart:</h2>
          {user.cart.items.map((item) => (
            <p>
              ${item.price} - {item.name}
            </p>
          ))}
        </div>
      </section>
    </StyledHome>
  );
};
export default connect(null, null)(Home);
