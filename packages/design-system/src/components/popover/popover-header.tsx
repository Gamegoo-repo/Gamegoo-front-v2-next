import styled from "styled-components";
import { usePopoverContext } from "./popover-context";
import type { PopoverHeaderProps } from "./popover.type";
import React from "react";

const StyledHeader = styled.header`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

const StyledTitle = styled.span`
  font-weight: 700;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.white};
`;

const StyledCloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.white};
  font-size: 16px;
  border-radius: ${({ theme }) => theme.radius[6]};
  transition: background 0.15s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
`;

/**
 * PopoverHeader
 *
 * @example
 * <PopoverContent>
 *   <PopoverHeader title="포지션 선택" />
 * </PopoverContent>
 */
export function PopoverHeader({ title }: PopoverHeaderProps) {
  const { close } = usePopoverContext("PopoverHeader");
  return (
    <StyledHeader>
      <StyledTitle>{title}</StyledTitle>
      <StyledCloseButton type="button" onClick={close} aria-label="닫기">
        ✕
      </StyledCloseButton>
    </StyledHeader>
  );
}

export default PopoverHeader;
