/* eslint-disable no-unused-vars */
import React from "react";
import { connect } from "react-redux";
import { StyledLoading } from "./Loading.styled";
import Image from "../../utils/ImageComponent/Image";
export const Loading = () => {
  return (
    <StyledLoading>
      <Image
        url={"/dummy_logo.png"}
        size={{ height: "300px", width: "300px" }}
        logo={true}
      />
    </StyledLoading>
  );
};

export default connect(null, null)(Loading);
