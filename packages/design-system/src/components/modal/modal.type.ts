import type { ReactNode } from "react";

export type ModalPadding = "none" | "sm" | "md" | "lg";

export interface ModalProps {
  /** 모달 열림 여부 */
  isOpen: boolean;

  /** 모달 닫기 핸들러 */
  onClose: () => void;

  /** 모달 내부 콘텐츠 */
  children: ReactNode;

  /** 모달 컨테이너에 추가할 className */
  className?: string;

  /**
   * 내부 패딩 크기
   * - `"none"` : 0px
   * - `"sm"`   : 16px 20px
   * - `"md"`   : 24px 20px / 모바일 32px (default)
   * - `"lg"`   : 32px
   */
  padding?: ModalPadding;

  /**
   * 백드롭 클릭 시 닫기
   * @default true
   */
  backdropClosable?: boolean;

  /**
   * ESC 키 입력 시 닫기
   * @default true
   */
  escClosable?: boolean;

  /**
   * 우측 상단 닫기 버튼 표시
   * @default false
   */
  hasCloseButton?: boolean;
}
