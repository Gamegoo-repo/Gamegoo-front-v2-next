import React from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "../foundations/theme";
import { GlobalStyle } from "./global-style";

interface Props {
  children: React.ReactNode;
}

export const DesignSystemProvider = ({ children }: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};
