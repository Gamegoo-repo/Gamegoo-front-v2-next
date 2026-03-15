import React, { forwardRef } from "react";
import { StyledFlexBox } from "./flexbox.styles";
import type { FlexBoxProps } from "./flexbox.type";

export const FlexBox = forwardRef<HTMLElement, FlexBoxProps>(
  (
    {
      as,
      children,
      direction = "row",
      justify = "start",
      align = "start",
      wrap = "nowrap",
      gap = "none",
      fullWidth = false,
      fullHeight = false,
      grow = false,
      shrink = false,
      inline = false,
      ...props
    },
    ref,
  ) => {
    return (
      <StyledFlexBox
        as={as}
        ref={ref as never}
        $direction={direction}
        $justify={justify}
        $align={align}
        $wrap={wrap}
        $gap={gap}
        $fullWidth={fullWidth}
        $fullHeight={fullHeight}
        $grow={grow}
        $shrink={shrink}
        $inline={inline}
        {...props}
      >
        {children}
      </StyledFlexBox>
    );
  },
);

FlexBox.displayName = "FlexBox";
