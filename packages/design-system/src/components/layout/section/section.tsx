import * as React from "react";
import { StyledSection } from "./section.styles";
import type { SectionProps } from "./section.type";
import { Container } from "../container/container";

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    {
      children,
      padding = "md",
      background = "transparent",
      fullWidth = false,
      containerSize = "xl",
      noContainer = false,
      ...rest
    },
    ref,
  ) => {
    const content = noContainer ? (
      children
    ) : (
      <Container size={containerSize}>{children}</Container>
    );

    return (
      <StyledSection
        ref={ref}
        $padding={padding}
        $background={background}
        $fullWidth={fullWidth}
        {...rest}
      >
        {content}
      </StyledSection>
    );
  },
);

Section.displayName = "Section";
