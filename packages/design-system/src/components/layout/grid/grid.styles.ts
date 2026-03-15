import styled, { css, DefaultTheme } from "styled-components";
import type { GridGap, GridMinWidth } from "./grid.type";

const resolveGap = (gap: GridGap, theme: DefaultTheme) => {
  if (gap === "none") return "0";

  if (typeof gap === "number") return `${gap}px`;

  if (typeof gap === "string") {
    if (gap in theme.spacing) {
      return theme.spacing[gap as keyof typeof theme.spacing];
    }

    return gap;
  }

  return "0";
};

const resolveMinWidth = (minWidth: GridMinWidth, theme: DefaultTheme) => {
  if (typeof minWidth === "number") return `${minWidth}px`;

  if (typeof minWidth === "string") {
    if (minWidth in theme.spacing) {
      return theme.spacing[minWidth as keyof typeof theme.spacing];
    }

    return minWidth;
  }

  return "200px";
};

type StyledGridProps = {
  $columns?: number;
  $gap?: GridGap;
  $rowGap?: GridGap;
  $columnGap?: GridGap;
  $responsive?: boolean;
  $minWidth?: GridMinWidth;
  $fullWidth?: boolean;
};

export const StyledGrid = styled.div<StyledGridProps>`
  display: grid;

  ${({ $responsive, $columns, $minWidth, theme }) =>
    $responsive
      ? css`
          grid-template-columns: repeat(
            auto-fit,
            minmax(${resolveMinWidth($minWidth ?? 200, theme)}, 1fr)
          );
        `
      : css`
          grid-template-columns: repeat(${$columns ?? 3}, 1fr);
        `}

  ${({ theme, $gap }) =>
    $gap &&
    css`
      gap: ${resolveGap($gap, theme)};
    `}

  ${({ theme, $rowGap }) =>
    $rowGap &&
    css`
      row-gap: ${resolveGap($rowGap, theme)};
    `}

  ${({ theme, $columnGap }) =>
    $columnGap &&
    css`
      column-gap: ${resolveGap($columnGap, theme)};
    `}

  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `}
`;
