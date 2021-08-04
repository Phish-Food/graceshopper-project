/* eslint-disable no-unused-vars */
import React from "react";
import { StyledFooter } from "./Footer.styled";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <StyledFooter>
      <div>
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
        </ul>
      </div>
      <div>Phish Store</div>
    </StyledFooter>
  );
};

export default Footer;
