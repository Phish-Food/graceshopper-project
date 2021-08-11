import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { StyledGuestCheckout } from "./GuestCheckout.styled";

const GuestCheckout = (totalprice, guestCartItems) => {
  return (
    <StyledGuestCheckout>
      <p>Thank you for Shopping</p>

      {/* {guestCartItems.map((item) => {
        <div>
          <p>Name: {item.name}</p>
          <p>Price: {item.price}</p>
        </div>;
      })} */}
    </StyledGuestCheckout>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

// export default connect(mapStateToProps, mapDispatchToProps)(GuestCheckout);

export default GuestCheckout;
