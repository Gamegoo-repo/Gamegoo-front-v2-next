export type PaddingSize = "none" | "xs" | "sm" | "md" | "lg" | "xl";

export interface PaddingProps {
  children: React.ReactNode;

  /** 전체 padding */
  size?: PaddingSize;

  /** 방향별 override */
  x?: PaddingSize;
  y?: PaddingSize;
  top?: PaddingSize;
  bottom?: PaddingSize;
  left?: PaddingSize;
  right?: PaddingSize;

  as?: React.ElementType;
  className?: string;
}
