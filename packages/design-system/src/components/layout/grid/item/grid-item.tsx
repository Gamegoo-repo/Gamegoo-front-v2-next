import React, { forwardRef } from "react";
import type { GridItemProps } from "./grid-item.type";

export const GridItem = forwardRef<HTMLElement, GridItemProps>(
  ({ as: Component = "div", colSpan, rowSpan, style, ...props }, ref) => {
    return (
      <Component
        ref={ref as never}
        style={{
          ...style,
          ...(colSpan && { gridColumn: `span ${colSpan}` }),
          ...(rowSpan && { gridRow: `span ${rowSpan}` }),
        }}
        {...props}
      />
    );
  },
);

GridItem.displayName = "GridItem";
