import React from "react";
import { MarginProps } from "./margin.type";
import { StyledMargin } from "./margin.styles";

export const Margin = ({
  children,
  size = "none",
  x,
  y,
  top,
  bottom,
  left,
  right,
  as = "div",
  className,
}: MarginProps) => {
  return (
    <StyledMargin
      as={as}
      size={size}
      x={x ?? "none"}
      y={y ?? "none"}
      top={top ?? "none"}
      bottom={bottom ?? "none"}
      left={left ?? "none"}
      right={right ?? "none"}
      className={className}
    >
      {children}
    </StyledMargin>
  );
};
