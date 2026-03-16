import React, { forwardRef, memo, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";

import {
  StyledCloseButton,
  StyledModalContainer,
  StyledModalOverlay,
} from "./modal.styles";
import type { ModalProps } from "./modal.type";

/**
 * Modal
 *
 * @example
 * // 기본 사용
 * <Modal isOpen={isOpen} onClose={onClose}>
 *   <div>내용</div>
 * </Modal>
 *
 * @example
 * // 닫기 버튼 포함
 * <Modal isOpen={isOpen} onClose={onClose} hasCloseButton>
 *   <div>내용</div>
 * </Modal>
 *
 * @example
 * // 패딩 없이 (커스텀 레이아웃)
 * <Modal isOpen={isOpen} onClose={onClose} padding="none">
 *   <div>내용</div>
 * </Modal>
 *
 * @example
 * // 백드롭 클릭 / ESC 닫기 비활성화
 * <Modal isOpen={isOpen} onClose={onClose} backdropClosable={false} escClosable={false}>
 *   <div>내용</div>
 * </Modal>
 */
const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      isOpen,
      onClose,
      children,
      className,
      padding = "md",
      backdropClosable = true,
      escClosable = true,
      hasCloseButton = false,
    },
    ref,
  ) => {
    // ── ESC 키 핸들러
    const handleEscKey = useCallback(
      (e: KeyboardEvent) => {
        if (e.key === "Escape" && escClosable) onClose();
      },
      [onClose, escClosable],
    );

    // ── 스크롤 잠금 + ESC 리스너
    useEffect(() => {
      if (!isOpen) return;

      const scrollY = window.scrollY;

      document.body.style.cssText = `
        position: fixed;
        top: -${scrollY}px;
        overflow-y: scroll;
        width: 100%;
      `;

      window.addEventListener("keydown", handleEscKey);

      return () => {
        const savedTop = document.body.style.top;
        document.body.style.cssText = "";
        window.scrollTo(0, parseInt(savedTop || "0", 10) * -1);
        window.removeEventListener("keydown", handleEscKey);
      };
    }, [isOpen, handleEscKey]);

    // ── 백드롭 클릭 — currentTarget으로 overlay 자체 클릭만 감지
    const handleOverlayClick = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (backdropClosable && e.target === e.currentTarget) {
          onClose();
        }
      },
      [backdropClosable, onClose],
    );

    if (!isOpen) return null;

    const portalRoot = document.getElementById("modal-root") ?? document.body;

    return createPortal(
      <StyledModalOverlay onClick={handleOverlayClick}>
        <StyledModalContainer
          ref={ref}
          className={className}
          $padding={padding}
          role="dialog"
          aria-modal="true"
        >
          {hasCloseButton && (
            <StyledCloseButton
              type="button"
              onClick={onClose}
              aria-label="닫기"
            >
              ✕
            </StyledCloseButton>
          )}
          {children}
        </StyledModalContainer>
      </StyledModalOverlay>,
      portalRoot,
    );
  },
);

Modal.displayName = "Modal";

export default memo(Modal);
