export type MarginSize = "none" | "xs" | "sm" | "md" | "lg" | "xl";

export interface MarginProps {
  children: React.ReactNode;

  /** 전체 margin */
  size?: MarginSize;

  /** 방향별 override */
  x?: MarginSize;
  y?: MarginSize;
  top?: MarginSize;
  bottom?: MarginSize;
  left?: MarginSize;
  right?: MarginSize;

  as?: React.ElementType;
  className?: string;
}
