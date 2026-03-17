import React from "react";
import { PaddingProps } from "./padding.type";
import { StyledPadding } from "./padding.styles";

export const Padding = ({
  children,
  size = "md",
  x,
  y,
  top,
  bottom,
  left,
  right,
  as = "div",
  className,
}: PaddingProps) => {
  return (
    <StyledPadding
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
    </StyledPadding>
  );
};
