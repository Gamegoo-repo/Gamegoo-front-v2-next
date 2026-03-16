import type { ReactNode, RefObject } from "react";

export type PopoverAlign = "start" | "center" | "end";
export type PopoverSide = "top" | "bottom";

export interface PopoverContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  align: PopoverAlign;
  side: PopoverSide;
  sideOffset: number;
  /** overflow:hidden 컨테이너 안에서 body portal 사용 */
  containerRef?: RefObject<HTMLElement | null>;
  referenceRef: RefObject<HTMLElement | null>;
  floatingRef: RefObject<HTMLDivElement | null>;
}

export interface PopoverProps {
  children: ReactNode;
  align?: PopoverAlign;
  side?: PopoverSide;
  sideOffset?: number;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** overflow:hidden 컨테이너 — 팝오버를 portal로 body에 붙임 */
  containerRef?: RefObject<HTMLElement | null>;
}

export interface PopoverTriggerProps {
  children: ReactNode;
  asChild?: boolean;
}

export interface PopoverContentProps {
  children: ReactNode;
  className?: string;
  showArrow?: boolean;
}

export interface PopoverHeaderProps {
  title: string;
}
