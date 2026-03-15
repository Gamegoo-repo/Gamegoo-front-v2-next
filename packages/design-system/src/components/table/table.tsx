import React, { forwardRef, memo } from "react";
import {
  StyledTable,
  StyledTableBody,
  StyledTableCaption,
  StyledTableCell,
  StyledTableFooter,
  StyledTableHead,
  StyledTableHeadCell,
  StyledTableRow,
  StyledTableWrapper,
} from "./table.styles";
import type {
  TableBodyProps,
  TableCaptionProps,
  TableCellProps,
  TableFooterProps,
  TableHeadCellProps,
  TableHeadProps,
  TableRootProps,
  TableRowProps,
  TableWrapperProps,
} from "./table.type";

export const TableWrapper = memo(function TableWrapper({
  children,
  fullWidth = true,
  ...props
}: TableWrapperProps) {
  return (
    <StyledTableWrapper fullWidth={fullWidth} {...props}>
      {children}
    </StyledTableWrapper>
  );
});

export const Table = forwardRef<HTMLTableElement, TableRootProps>(
  ({ children, size = "md", fullWidth = true, style, ...props }, ref) => {
    const tableLayout =
      (style?.tableLayout as "fixed" | "auto" | undefined) ?? "fixed";

    return (
      <StyledTable
        ref={ref}
        $size={size}
        $fullWidth={fullWidth}
        $tableLayout={tableLayout}
        style={style}
        {...props}
      >
        {children}
      </StyledTable>
    );
  },
);

Table.displayName = "Table";

export const TableHead = forwardRef<HTMLTableSectionElement, TableHeadProps>(
  ({ children, ...props }, ref) => {
    return (
      <StyledTableHead ref={ref} {...props}>
        {children}
      </StyledTableHead>
    );
  },
);

TableHead.displayName = "TableHead";

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ children, ...props }, ref) => {
    return (
      <StyledTableBody ref={ref} {...props}>
        {children}
      </StyledTableBody>
    );
  },
);

TableBody.displayName = "TableBody";

export const TableFooter = forwardRef<
  HTMLTableSectionElement,
  TableFooterProps
>(({ children, ...props }, ref) => {
  return (
    <StyledTableFooter ref={ref} {...props}>
      {children}
    </StyledTableFooter>
  );
});

TableFooter.displayName = "TableFooter";

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ children, clickable = false, selected = false, ...props }, ref) => {
    return (
      <StyledTableRow
        ref={ref}
        $clickable={clickable}
        $selected={selected}
        {...props}
      >
        {children}
      </StyledTableRow>
    );
  },
);

TableRow.displayName = "TableRow";

export const TableHeadCell = forwardRef<
  HTMLTableCellElement,
  TableHeadCellProps
>(({ children, align = "left", width, ...props }, ref) => {
  return (
    <StyledTableHeadCell ref={ref} $align={align} $width={width} {...props}>
      {children}
    </StyledTableHeadCell>
  );
});

TableHeadCell.displayName = "TableHeadCell";

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ children, align = "left", width, ...props }, ref) => {
    return (
      <StyledTableCell ref={ref} $align={align} $width={width} {...props}>
        {children}
      </StyledTableCell>
    );
  },
);

TableCell.displayName = "TableCell";

export const TableCaption = forwardRef<
  HTMLTableCaptionElement,
  TableCaptionProps
>(({ children, ...props }, ref) => {
  return (
    <StyledTableCaption ref={ref} {...props}>
      {children}
    </StyledTableCaption>
  );
});

TableCaption.displayName = "TableCaption";
