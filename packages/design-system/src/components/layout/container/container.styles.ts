import styled, { css, DefaultTheme } from "styled-components";
import type { ContainerPadding, ContainerSize } from "./container.type";

const containerWidthMap: Record<string, string> = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
  full: "100%",
};

const resolvePadding = (padding: ContainerPadding, theme: DefaultTheme) => {
  if (padding === "none") return "0";

  if (typeof padding === "number") return `${padding}px`;

  if (typeof padding === "string") {
    if (padding in theme.spacing) {
      return theme.spacing[padding as keyof typeof theme.spacing];
    }

    return padding;
  }

  return "0";
};

const resolveWidth = (size: ContainerSize) => {
  if (typeof size === "number") return `${size}px`;

  if (typeof size === "string") {
    if (size in containerWidthMap) {
      return containerWidthMap[size];
    }

    return size;
  }

  return containerWidthMap.xl;
};

type StyledProps = {
  $size?: ContainerSize;
  $padding?: ContainerPadding;
  $centered?: boolean;
  $fullWidth?: boolean;
};

export const StyledContainer = styled.div<StyledProps>`
  width: 100%;
  margin-left: auto;
  margin-right: auto;

  ${({ $size }) =>
    $size &&
    css`
      max-width: ${resolveWidth($size)};
    `}

  ${({ theme, $padding }) =>
    $padding &&
    css`
      padding-left: ${resolvePadding($padding, theme)};
      padding-right: ${resolvePadding($padding, theme)};
    `}

  ${({ $centered }) =>
    $centered &&
    css`
      display: flex;
      flex-direction: column;
      align-items: center;
    `}

  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      max-width: 100%;
    `}
`;
