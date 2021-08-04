/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { authenticate } from "../../../redux/reducers/auth";
import Pixelize from "../../utils/Pixelize/Pixelize";
import { StyledHome } from "./Home.styled";

const Home = ({ auth }) => {
  return (
    <StyledHome>
      <header>
        <h1>
          {auth.firstName} {auth.lastName}
        </h1>
      </header>
      <section>
        <div>
          <h2>Cart:</h2>
          {auth.cart.items.map((item) => (
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
