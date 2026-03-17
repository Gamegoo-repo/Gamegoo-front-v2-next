import styled, { css } from "styled-components";
import { MarginProps } from "./margin.type";

const marginMap = (theme: any) => ({
  none: "0px",
  xs: theme.spacing[8],
  sm: theme.spacing[12],
  md: theme.spacing[16],
  lg: theme.spacing[24],
  xl: theme.spacing[32],
});

export const StyledMargin = styled.div<
  Required<Omit<MarginProps, "children" | "as" | "className">>
>`
  ${({ theme, size }) =>
    size &&
    css`
      margin: ${marginMap(theme)[size]};
    `}

  ${({ theme, x }) =>
    x &&
    css`
      margin-left: ${marginMap(theme)[x]};
      margin-right: ${marginMap(theme)[x]};
    `}

  ${({ theme, y }) =>
    y &&
    css`
      margin-top: ${marginMap(theme)[y]};
      margin-bottom: ${marginMap(theme)[y]};
    `}

  ${({ theme, top }) =>
    top &&
    css`
      margin-top: ${marginMap(theme)[top]};
    `}

  ${({ theme, bottom }) =>
    bottom &&
    css`
      margin-bottom: ${marginMap(theme)[bottom]};
    `}

  ${({ theme, left }) =>
    left &&
    css`
      margin-left: ${marginMap(theme)[left]};
    `}

  ${({ theme, right }) =>
    right &&
    css`
      margin-right: ${marginMap(theme)[right]};
    `}
`;
