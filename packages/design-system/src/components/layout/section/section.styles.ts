import styled, { css } from "styled-components";
import type { SectionPadding, SectionBackground } from "./section.type";

const paddingMap = (theme: any) => ({
  none: "0px",
  xs: theme.spacing[8],
  sm: theme.spacing[12],
  md: theme.spacing[16],
  lg: theme.spacing[20],
  xl: theme.spacing[24],
});

const backgroundMap = (theme: any) => ({
  transparent: "transparent",
  white: theme.colors.white,
  gray: theme.colors.gray[100],
  brand: theme.colors.violet[500],
  dark: theme.colors.gray[900],
  gradient: `linear-gradient(135deg, ${theme.colors.violet[500]}, ${theme.colors.violet[700]})`,
});

export const StyledSection = styled.section<{
  $padding: SectionPadding;
  $background: SectionBackground;
  $fullWidth: boolean;
}>`
  width: 100%;

  ${({ theme, $padding }) => css`
    padding-top: ${paddingMap(theme)[$padding]};
    padding-bottom: ${paddingMap(theme)[$padding]};
  `}

  ${({ theme, $background }) => css`
    background: ${backgroundMap(theme)[$background]};
    color: ${$background === "dark" ||
    $background === "brand" ||
    $background === "gradient"
      ? theme.colors.white
      : "inherit"};
  `}

  ${({ $fullWidth }) =>
    !$fullWidth &&
    css`
      max-width: 100%;
    `}
`;
