import React, { forwardRef } from "react";
import { StyledContainer } from "./container.styles";
import type { ContainerProps } from "./container.type";

export const Container = forwardRef<HTMLElement, ContainerProps>(
  (
    {
      as,
      children,
      size = "xl",
      padding = 16,
      centered = false,
      fullWidth = false,
      ...props
    },
    ref,
  ) => {
    return (
      <StyledContainer
        as={as}
        ref={ref as never}
        $size={size}
        $padding={padding}
        $centered={centered}
        $fullWidth={fullWidth}
        {...props}
      >
        {children}
      </StyledContainer>
    );
  },
);

Container.displayName = "Container";
