import "styled-components";
import type { Theme } from "./foundations/theme";

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
