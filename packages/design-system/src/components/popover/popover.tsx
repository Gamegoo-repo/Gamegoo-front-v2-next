import React, { useCallback, useEffect, useRef, useState } from "react";
import { PopoverContext } from "./popover-context";
import type { PopoverProps } from "./popover.type";

/**
 * Popover
 *
 * 기본: position:relative wrapper 기준 absolute — CSS만으로 배치
 * containerRef 전달 시: body portal + 좌표 계산 (overflow:hidden 대응)
 *
 * @example
 * <Popover>
 *   <PopoverTrigger asChild><button>열기</button></PopoverTrigger>
 *   <PopoverContent>내용</PopoverContent>
 * </Popover>
 *
 * @example
 * // overflow:hidden 컨테이너
 * <Popover containerRef={modalRef}>
 *   <PopoverTrigger asChild><button>열기</button></PopoverTrigger>
 *   <PopoverContent>내용</PopoverContent>
 * </Popover>
 *
 * @example
 * // controlled
 * <Popover open={isOpen} onOpenChange={setIsOpen}>
 *   <PopoverTrigger asChild><button>열기</button></PopoverTrigger>
 *   <PopoverContent>내용</PopoverContent>
 * </Popover>
 */
export function Popover({
  children,
  align = "center",
  side = "bottom",
  sideOffset = 12,
  open: externalOpen,
  onOpenChange,
  containerRef,
}: PopoverProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const controlled = externalOpen !== undefined;
  const isOpen = controlled ? externalOpen : internalOpen;

  const referenceRef = useRef<HTMLElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleOpenChange = useCallback(
    (next: boolean) => {
      if (controlled) onOpenChange?.(next);
      else setInternalOpen(next);
    },
    [controlled, onOpenChange],
  );

  const open = useCallback(() => handleOpenChange(true), [handleOpenChange]);
  const close = useCallback(() => handleOpenChange(false), [handleOpenChange]);
  const toggle = useCallback(
    () => handleOpenChange(!isOpen),
    [handleOpenChange, isOpen],
  );

  // 외부 클릭 닫기
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      const t = e.target as Node;
      if (containerRef) {
        // portal 모드: reference + floating 각각 체크
        if (
          referenceRef.current?.contains(t) ||
          floatingRef.current?.contains(t)
        )
          return;
      } else {
        // 기본 모드: wrapper 전체
        if (wrapperRef.current?.contains(t)) return;
      }
      close();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen, close, containerRef]);

  return (
    <PopoverContext.Provider
      value={{
        isOpen,
        open,
        close,
        toggle,
        align,
        side,
        sideOffset,
        containerRef,
        referenceRef,
        floatingRef,
      }}
    >
      <div
        ref={wrapperRef}
        style={{ position: "relative", display: "inline-block" }}
      >
        {children}
      </div>
    </PopoverContext.Provider>
  );
}
