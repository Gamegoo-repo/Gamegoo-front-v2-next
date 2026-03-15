import type { HTMLAttributes, ReactNode, ElementType } from "react";
import { DefaultTheme } from "styled-components";

export type FlexDirection = "row" | "column" | "rowReverse" | "columnReverse";

export type FlexJustify =
  | "start"
  | "center"
  | "end"
  | "between"
  | "around"
  | "evenly";

export type FlexAlign = "start" | "center" | "end" | "stretch" | "baseline";

export type FlexWrap = "nowrap" | "wrap" | "wrapReverse";

export type FlexGap = keyof DefaultTheme["spacing"] | number | string | "none";

export interface FlexBoxProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  children?: ReactNode;

  direction?: FlexDirection;
  justify?: FlexJustify;
  align?: FlexAlign;
  wrap?: FlexWrap;

  gap?: FlexGap;

  fullWidth?: boolean;
  fullHeight?: boolean;

  grow?: boolean;
  shrink?: boolean;

  inline?: boolean;
}
