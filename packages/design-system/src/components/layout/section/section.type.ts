import type { HTMLAttributes, ReactNode } from "react";
import type { ContainerSize } from "../container/container.type";

export type SectionPadding = "none" | "xs" | "sm" | "md" | "lg" | "xl";

export type SectionBackground =
  | "transparent"
  | "white"
  | "gray"
  | "brand"
  | "dark"
  | "gradient";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;

  padding?: SectionPadding;
  background?: SectionBackground;

  fullWidth?: boolean;
  containerSize?: ContainerSize;
  noContainer?: boolean;
}
