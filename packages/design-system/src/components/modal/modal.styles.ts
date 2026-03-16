import styled, { css } from "styled-components";
import type { ModalPadding } from "./modal.type";

export const StyledModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;

  display: flex;
  align-items: center;
  justify-content: center;

  /* 모달이 뷰포트보다 길 때 스크롤 가능하게 */
  overflow-y: auto;
  padding: 24px;

  background: rgba(0, 0, 0, 0.4);
`;

const paddingMap: Record<ModalPadding, ReturnType<typeof css>> = {
  none: css`
    padding: 0;
  `,
  sm: css`
    padding: 16px 20px;
  `,
  md: css`
    padding: 24px 20px;

    @media (min-width: 768px) {
      padding: 32px;
    }
  `,
  lg: css`
    padding: 32px;
  `,
};

export const StyledModalContainer = styled.div<{ $padding: ModalPadding }>`
  position: relative;

  /* width는 className으로 외부에서 제어 */
  width: 100%;

  /* 클릭 이벤트 정상 동작 보장 */
  pointer-events: auto;

  background: ${({ theme }) => theme.colors.gray[100]};
  border-radius: ${({ theme }) => theme.radius[20]};

  /* 내용이 길면 자체 스크롤 */
  max-height: calc(100vh - 48px);
  overflow-y: auto;

  ${({ $padding }) => paddingMap[$padding]}
`;

export const StyledCloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;

  width: 32px;
  height: 32px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: transparent;
  border: none;
  border-radius: ${({ theme }) => theme.radius[8]};
  cursor: pointer;

  font-size: 16px;
  color: ${({ theme }) => theme.colors.gray[600]};

  transition: background 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.gray[300]};
  }
`;
