import React from "react";
import { StyledButton } from "./button.styles";
import { ButtonProps } from "./button.types";

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, variant = "primary", size = "md", loading = false, ...props },
    ref,
  ) => {
    return (
      <StyledButton
        ref={ref}
        $variant={variant}
        $size={size}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading ? "Loading..." : children}
      </StyledButton>
    );
  },
);

Button.displayName = "Button";
