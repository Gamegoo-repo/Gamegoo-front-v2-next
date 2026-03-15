import type {
  CSSProperties,
  HTMLAttributes,
  ReactNode,
  TableHTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from "react";

export type TableSize = "sm" | "md" | "lg";

export interface TableRootProps extends TableHTMLAttributes<HTMLTableElement> {
  size?: TableSize;
  fullWidth?: boolean;
}

export interface TableWrapperProps extends HTMLAttributes<HTMLDivElement> {
  fullWidth?: boolean;
}

export interface TableHeadProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export interface TableFooterProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  clickable?: boolean;
  selected?: boolean;
}

export interface TableHeadCellProps extends ThHTMLAttributes<HTMLTableCellElement> {
  width?: number | string;
  align?: "left" | "center" | "right";
}

export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  width?: number | string;
  align?: "left" | "center" | "right";
}

export interface TableCaptionProps extends React.HTMLAttributes<HTMLTableCaptionElement> {}

export interface DataTableColumn<T> {
  key: string;
  header: ReactNode;
  width?: number | string;
  align?: "left" | "center" | "right";
  render: (row: T, rowIndex: number) => ReactNode;
}

export interface DataTableProps<T> {
  data?: T[];
  columns: DataTableColumn<T>[];
  ariaLabel: string;
  loading?: boolean;
  emptyText?: ReactNode;
  rowKey?: keyof T | ((row: T, index: number) => string | number);
  onRowClick?: (row: T, rowIndex: number) => void;
  rowClassName?: (row: T, rowIndex: number) => string | undefined;
  tableLayout?: "fixed" | "auto";
  size?: TableSize;
  fullWidth?: boolean;
  skeletonRowCount?: number;
  renderLoadingRow?: (rowIndex: number, columnLength: number) => ReactNode;
  getRowStyle?: (row: T, rowIndex: number) => CSSProperties | undefined;
}
