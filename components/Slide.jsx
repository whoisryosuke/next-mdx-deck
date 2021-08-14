import React from "react";
import styled from "@emotion/styled";

const StyledSlide = styled.div`
  width: 100%;
`;

export default function Slide({ children, id, className }) {
  return (
    <StyledSlide id={id} className={className}>
      {children}
    </StyledSlide>
  );
}
