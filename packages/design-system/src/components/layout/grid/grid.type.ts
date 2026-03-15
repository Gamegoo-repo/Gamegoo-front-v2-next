import type {
  ElementType,
  ReactNode,
  CSSProperties,
  ComponentPropsWithoutRef,
} from "react";
import type { DefaultTheme } from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    spacing: {
      [key: string]: string | number;
    };
  }
}

export type GridColumns = number;

export type GridGap = keyof DefaultTheme["spacing"] | number | string | "none";

export type GridMinWidth = keyof DefaultTheme["spacing"] | number | string;

type PolymorphicProps<T extends ElementType> = {
  as?: T;
  children?: ReactNode;

  columns?: GridColumns;

  gap?: GridGap;
  rowGap?: GridGap;
  columnGap?: GridGap;

  responsive?: boolean;
  minWidth?: GridMinWidth;

  fullWidth?: boolean;

  className?: string;
  style?: CSSProperties;
} & Omit<
  ComponentPropsWithoutRef<T>,
  "children" | "as" | "className" | "style"
>;

export type GridProps<T extends ElementType = "div"> = PolymorphicProps<T>;
