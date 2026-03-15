import React, { forwardRef } from "react";
import { StyledGrid } from "./grid.styles";
import type { GridProps } from "./grid.type";

export const Grid = forwardRef<HTMLElement, GridProps>(
  (
    {
      as,
      children,
      columns = 3,
      gap = "none",
      rowGap,
      columnGap,
      responsive = false,
      minWidth = 200,
      fullWidth = false,
      ...props
    },
    ref,
  ) => {
    return (
      <StyledGrid
        as={as}
        ref={ref as never}
        $columns={columns}
        $gap={gap}
        $rowGap={rowGap}
        $columnGap={columnGap}
        $responsive={responsive}
        $minWidth={minWidth}
        $fullWidth={fullWidth}
        {...props}
      >
        {children}
      </StyledGrid>
    );
  },
);

Grid.displayName = "Grid";
