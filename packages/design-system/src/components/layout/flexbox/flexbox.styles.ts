import styled, { css, DefaultTheme } from "styled-components";
import type {
  FlexAlign,
  FlexDirection,
  FlexGap,
  FlexJustify,
  FlexWrap,
} from "./flexbox.type";

const directionMap: Record<FlexDirection, string> = {
  row: "row",
  column: "column",
  rowReverse: "row-reverse",
  columnReverse: "column-reverse",
};

const justifyMap: Record<FlexJustify, string> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  between: "space-between",
  around: "space-around",
  evenly: "space-evenly",
};

const alignMap: Record<FlexAlign, string> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  stretch: "stretch",
  baseline: "baseline",
};

const wrapMap: Record<FlexWrap, string> = {
  nowrap: "nowrap",
  wrap: "wrap",
  wrapReverse: "wrap-reverse",
};

const resolveGap = (gap: FlexGap, theme: DefaultTheme) => {
  if (gap === "none") return "0";

  if (typeof gap === "number") {
    if (gap in theme.spacing) {
      return theme.spacing[gap as keyof typeof theme.spacing];
    }

    return `${gap}px`;
  }

  if (typeof gap === "string") {
    return gap;
  }

  return "0";
};

type StyledProps = {
  $direction: FlexDirection;
  $justify: FlexJustify;
  $align: FlexAlign;
  $wrap: FlexWrap;
  $gap: FlexGap;
  $fullWidth?: boolean;
  $fullHeight?: boolean;
  $grow?: boolean;
  $shrink?: boolean;
  $inline?: boolean;
};

export const StyledFlexBox = styled.div<StyledProps>`
  display: ${({ $inline }) => ($inline ? "inline-flex" : "flex")};

  flex-direction: ${({ $direction }) => directionMap[$direction]};
  justify-content: ${({ $justify }) => justifyMap[$justify]};
  align-items: ${({ $align }) => alignMap[$align]};
  flex-wrap: ${({ $wrap }) => wrapMap[$wrap]};

  ${({ theme, $gap }) => css`
    gap: ${resolveGap($gap, theme)};
  `}

  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `}

  ${({ $fullHeight }) =>
    $fullHeight &&
    css`
      height: 100%;
    `}

  ${({ $grow }) =>
    $grow &&
    css`
      flex-grow: 1;
    `}

  ${({ $shrink }) =>
    $shrink &&
    css`
      flex-shrink: 1;
    `}
`;
