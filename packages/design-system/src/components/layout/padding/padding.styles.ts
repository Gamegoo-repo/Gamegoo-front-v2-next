import styled, { css } from "styled-components";
import { PaddingProps } from "./padding.type";

const paddingMap = (theme: any) => ({
  none: "0px",
  xs: theme.spacing[8],
  sm: theme.spacing[12],
  md: theme.spacing[16],
  lg: theme.spacing[24],
  xl: theme.spacing[32],
});

export const StyledPadding = styled.div<
  Required<Omit<PaddingProps, "children" | "as" | "className">>
>`
  ${({ theme, size }) =>
    size &&
    css`
      padding: ${paddingMap(theme)[size]};
    `}

  ${({ theme, x }) =>
    x &&
    css`
      padding-left: ${paddingMap(theme)[x]};
      padding-right: ${paddingMap(theme)[x]};
    `}

  ${({ theme, y }) =>
    y &&
    css`
      padding-top: ${paddingMap(theme)[y]};
      padding-bottom: ${paddingMap(theme)[y]};
    `}

  ${({ theme, top }) =>
    top &&
    css`
      padding-top: ${paddingMap(theme)[top]};
    `}

  ${({ theme, bottom }) =>
    bottom &&
    css`
      padding-bottom: ${paddingMap(theme)[bottom]};
    `}

  ${({ theme, left }) =>
    left &&
    css`
      padding-left: ${paddingMap(theme)[left]};
    `}

  ${({ theme, right }) =>
    right &&
    css`
      padding-right: ${paddingMap(theme)[right]};
    `}
`;
