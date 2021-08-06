/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import All_Items from "../Item/All_Items/All_Items";
import Item_Item from "../Item/Item_Item/Item_Item";
import { StyledHome } from "./Home.styled";

const Home = () => {
  return (
    <StyledHome>
      <header>
        <h1>Welcome to Phish Store!</h1>
      </header>
      <section>
        <All_Items />
      </section>
    </StyledHome>
  );
};
export default connect(null, null)(Home);
