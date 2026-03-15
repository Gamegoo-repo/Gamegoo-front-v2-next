import styled, { css } from "styled-components";
import { ButtonVariant, ButtonSize } from "./button.types";

const variantStyles = {
  primary: css`
    background: ${({ theme }) => theme.colors.violet[600]};
    color: white;

    &:hover {
      background: ${({ theme }) => theme.colors.violet[700]};
    }
  `,

  secondary: css`
    background: ${({ theme }) => theme.colors.gray[300]};
    color: ${({ theme }) => theme.colors.gray[900]};
  `,

  outline: css`
    border: 1px solid ${({ theme }) => theme.colors.gray[300]};
    background: transparent;
  `,

  ghost: css`
    background: transparent;
  `,

  danger: css`
    background: ${({ theme }) => theme.colors.red[600]};
    color: white;
  `,

  black: css`
    background: ${({ theme }) => theme.colors.gray[800]};
    color: white;

    &:hover {
      background: ${({ theme }) => theme.colors.gray[700]};
    }
  `,
};

const sizeStyles = {
  sm: css`
    height: 32px;
    padding: 0 12px;
  `,

  md: css`
    height: 36px;
    padding: 0 16px;
  `,

  lg: css`
    height: 40px;
    padding: 0 20px;
  `,

  xl: css`
    height: 56px;
    padding: 0 32px;
  `,

  icon: css`
    width: 36px;
    height: 36px;
    padding: 0;
  `,
};

export const StyledButton = styled.button<{
  $variant: ButtonVariant;
  $size: ButtonSize;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  gap: 8px;

  border-radius: ${({ theme }) => theme.radius[10]};
  border: none;

  ${({ theme }) => theme.typography.bold14};

  transition: all 0.2s ease;

  cursor: pointer;

  ${({ $variant }) => variantStyles[$variant]}
  ${({ $size }) => sizeStyles[$size]}

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;
