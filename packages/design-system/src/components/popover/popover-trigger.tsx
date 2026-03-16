import React, { type ReactElement } from "react";
import { usePopoverContext } from "./popover-context";
import type { PopoverTriggerProps } from "./popover.type";

/**
 * PopoverTrigger
 *
 * @example
 * // asChild — children에 ref/onClick 주입 (권장)
 * <PopoverTrigger asChild>
 *   <button>열기</button>
 * </PopoverTrigger>
 *
 * @example
 * // 기본 — button 자동 래핑
 * <PopoverTrigger>열기</PopoverTrigger>
 */
export function PopoverTrigger({
  children,
  asChild = false,
}: PopoverTriggerProps) {
  const { isOpen, toggle, referenceRef } = usePopoverContext("PopoverTrigger");

  if (asChild) {
    if (!React.isValidElement(children)) {
      throw new Error(
        "PopoverTrigger asChild: children must be a single valid React element",
      );
    }
    const child = children as ReactElement<Record<string, unknown>>;
    return React.cloneElement(child, {
      ref: referenceRef,
      onClick: (e: React.MouseEvent) => {
        if (typeof child.props.onClick === "function") {
          (child.props.onClick as (e: React.MouseEvent) => void)(e);
        }
        toggle();
      },
      "aria-expanded": isOpen,
      "aria-haspopup": "true",
    });
  }

  return (
    <button
      ref={referenceRef as React.RefObject<HTMLButtonElement>}
      type="button"
      aria-expanded={isOpen}
      aria-haspopup="true"
      onClick={toggle}
    >
      {children}
    </button>
  );
}
