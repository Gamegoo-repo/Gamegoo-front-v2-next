import React, {
  type CSSProperties,
  useCallback,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { usePopoverContext } from "./popover-context";
import type { PopoverContentProps } from "./popover.type";

const ARROW_SIZE = 8;

/**
 * PopoverContent
 *
 * - 기본: wrapper 기준 CSS absolute — 좌표 계산 없음, 정확함
 * - containerRef 있을 때: body portal + getBoundingClientRect
 */
export function PopoverContent({
  children,
  className = "",
  showArrow = true,
}: PopoverContentProps) {
  const {
    isOpen,
    align,
    side,
    sideOffset,
    containerRef,
    referenceRef,
    floatingRef,
  } = usePopoverContext("PopoverContent");

  const usePortal = !!containerRef;

  // portal 모드 좌표
  const [coords, setCoords] = useState({ x: 0, y: 0, flipped: false });
  const [ready, setReady] = useState(false);

  const compute = useCallback(() => {
    const ref = referenceRef.current;
    const float = floatingRef.current;
    if (!ref || !float) return;

    const tr = ref.getBoundingClientRect();
    const fr = float.getBoundingClientRect();
    const sx = window.scrollX;
    const sy = window.scrollY;
    const vw = document.documentElement.clientWidth;
    const vh = document.documentElement.clientHeight;

    // y
    let y = tr.bottom + sy + sideOffset;
    let flipped = false;
    if (tr.bottom + sideOffset + fr.height > vh - 8) {
      y = tr.top + sy - fr.height - sideOffset;
      flipped = true;
    }

    // x
    let x: number;
    if (align === "start") x = tr.left + sx;
    else if (align === "end") x = tr.right + sx - fr.width;
    else x = tr.left + sx + tr.width / 2 - fr.width / 2;

    if (x + fr.width > vw + sx - 8) x = vw + sx - 8 - fr.width;
    if (x < sx + 8) x = sx + 8;

    setCoords({ x, y, flipped });
    setReady(true);
  }, [referenceRef, floatingRef, align, sideOffset]);

  useEffect(() => {
    if (!isOpen || !usePortal) {
      setReady(false);
      return;
    }
    const frame = requestAnimationFrame(compute);
    window.addEventListener("resize", compute);
    window.addEventListener("scroll", compute, true);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", compute);
      window.removeEventListener("scroll", compute, true);
    };
  }, [isOpen, usePortal, compute]);

  if (!isOpen) return null;

  // ── Arrow ──
  const arrowFlipped = usePortal ? coords.flipped : side === "top";

  const arrowHoriz: CSSProperties =
    align === "start"
      ? { left: 16 }
      : align === "end"
        ? { right: 16 }
        : { left: "50%", transform: "translateX(-50%)" };

  const arrowStyle: CSSProperties = {
    position: "absolute",
    width: 0,
    height: 0,
    borderStyle: "solid",
    pointerEvents: "none",
    zIndex: 1,
    ...arrowHoriz,
  };

  if (!arrowFlipped) {
    arrowStyle.top = `-${ARROW_SIZE}px`;
    arrowStyle.borderWidth = `0 ${ARROW_SIZE}px ${ARROW_SIZE}px ${ARROW_SIZE}px`;
    arrowStyle.borderColor =
      "transparent transparent rgba(0,0,0,0.7) transparent";
    arrowStyle.filter = "drop-shadow(0 4px 8.9px rgba(0,0,0,0.25))";
  } else {
    arrowStyle.bottom = `-${ARROW_SIZE}px`;
    arrowStyle.borderWidth = `${ARROW_SIZE}px ${ARROW_SIZE}px 0 ${ARROW_SIZE}px`;
    arrowStyle.borderColor =
      "rgba(0,0,0,0.7) transparent transparent transparent";
    arrowStyle.filter = "drop-shadow(0 2px 2px rgba(0,0,0,0.05))";
  }

  // ── 기본 모드: CSS absolute ──
  if (!usePortal) {
    const horizStyle: CSSProperties =
      align === "start"
        ? { left: 0 }
        : align === "end"
          ? { right: 0 }
          : { left: "50%", transform: "translateX(-50%)" };

    const vertStyle: CSSProperties =
      side === "bottom"
        ? { top: `calc(100% + ${sideOffset}px)` }
        : { bottom: `calc(100% + ${sideOffset}px)` };

    return (
      <div
        ref={floatingRef}
        className={className}
        style={{
          position: "absolute",
          zIndex: 2001,
          width: "max-content",
          ...horizStyle,
          ...vertStyle,
        }}
        role="dialog"
      >
        {showArrow && <div style={arrowStyle} aria-hidden="true" />}
        {children}
      </div>
    );
  }

  // ── Portal 모드 ──
  return createPortal(
    <div
      ref={floatingRef}
      className={className}
      style={{
        position: "absolute",
        zIndex: 2001,
        width: "max-content",
        left: ready ? `${coords.x}px` : "-9999px",
        top: ready ? `${coords.y}px` : "-9999px",
        visibility: ready ? "visible" : "hidden",
      }}
      role="dialog"
    >
      {showArrow && <div style={arrowStyle} aria-hidden="true" />}
      {children}
    </div>,
    document.body,
  );
}
