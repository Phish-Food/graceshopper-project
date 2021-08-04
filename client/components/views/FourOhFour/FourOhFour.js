/* eslint-disable no-unused-vars */
import React from "react";
import { connect } from "react-redux";
import QueryString from "qs";

export const FourOhFour = ({ match, location }) => {
  const { any } = match.params;
  const query = QueryString.parse(location.search, { ignoreQueryPrefix: true });
  let message = any;
  if (query.id) {
    message += " with id: " + query.id;
  }
  return <StyledFourOhFour>{message} - Does not exist</StyledFourOhFour>;
};

export default connect(null, null)(FourOhFour);
