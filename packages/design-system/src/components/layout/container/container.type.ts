import type {
  ComponentPropsWithoutRef,
  ElementType,
  ReactNode,
  CSSProperties,
} from "react";
import type { DefaultTheme } from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    spacing: {
      [key: string]: string | number;
    };
  }
}

export type ContainerSize =
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "full"
  | number
  | string;

export type ContainerPadding =
  | keyof DefaultTheme["spacing"]
  | number
  | string
  | "none";

type PolymorphicProps<T extends ElementType> = {
  as?: T;
  children?: ReactNode;

  size?: ContainerSize;
  padding?: ContainerPadding;

  centered?: boolean;
  fullWidth?: boolean;

  className?: string;
  style?: CSSProperties;
} & Omit<
  ComponentPropsWithoutRef<T>,
  "children" | "as" | "className" | "style"
>;

export type ContainerProps<T extends ElementType = "div"> = PolymorphicProps<T>;
