import { breakpoints } from "./breakpoints";
import { colors } from "./colors";
import { radius } from "./radius";
import { spacing } from "./spacing";
import { typography } from "./typography";

export const theme = {
  colors,
  typography,
  radius,
  spacing,
  breakpoints,
} as const;

export type Theme = typeof theme;
