import type {
  ComponentPropsWithoutRef,
  ElementType,
  ReactNode,
  CSSProperties,
} from "react";

export type GridItemProps<T extends ElementType = "div"> = {
  as?: T;
  children?: ReactNode;

  colSpan?: number;
  rowSpan?: number;

  className?: string;
  style?: CSSProperties;
} & Omit<
  ComponentPropsWithoutRef<T>,
  "children" | "as" | "className" | "style"
>;
