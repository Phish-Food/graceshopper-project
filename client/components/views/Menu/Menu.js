/* eslint-disable no-unused-vars */
// Menu.js
import React from "react";
import { StyledMenu } from "./Menu.styled";
import { Link } from "react-router-dom";

const Menu = ({ open }) => {
  return (
    <StyledMenu open={open}>
      <div>
        <header>
          <Link to="/carts">
            <h3>My Cart</h3>
          </Link>
        </header>
      </div>
      <div>
        <header>
          <Link to="/">
            <h3>All Items</h3>
          </Link>
        </header>
      </div>
      <div>
        <header>
          <h3>Dummy</h3>
        </header>
      </div>
    </StyledMenu>
  );
};
export default Menu;
