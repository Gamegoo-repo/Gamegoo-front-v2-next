import React, { memo, useCallback, useMemo } from "react";
import type { JSX } from "react";
import {
  StyledEmptyBox,
  StyledLoadingBox,
  StyledSkeleton,
} from "./table.styles";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  TableWrapper,
} from "./table";
import type { DataTableProps, DataTableColumn } from "./table.type";

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function getResolvedRowKey<T>(
  row: T,
  index: number,
  rowKey?: keyof T | ((row: T, index: number) => string | number),
) {
  if (typeof rowKey === "function") return rowKey(row, index);
  if (rowKey) return row[rowKey] as string | number;
  return index;
}

// ─────────────────────────────────────────────
// HeaderRow
// ─────────────────────────────────────────────

type HeaderRowProps<T> = {
  columns: DataTableColumn<T>[];
};

const HeaderRow = memo(function HeaderRow<T>({ columns }: HeaderRowProps<T>) {
  return (
    <tr>
      {columns.map((column) => (
        <TableHeadCell
          key={column.key}
          width={column.width}
          align={column.align}
          scope="col"
        >
          {column.header}
        </TableHeadCell>
      ))}
    </tr>
  );
}) as <T>(props: HeaderRowProps<T>) => JSX.Element;

// ─────────────────────────────────────────────
// BodyRows
// ─────────────────────────────────────────────

type BodyRowsProps<T> = {
  data: T[];
  columns: DataTableColumn<T>[];
  rowKey?: keyof T | ((row: T, index: number) => string | number);
  onRowClick?: (row: T, rowIndex: number) => void;
  rowClassName?: (row: T, rowIndex: number) => string | undefined;
  getRowStyle?: (row: T, rowIndex: number) => React.CSSProperties | undefined;
};

const BodyRows = memo(function BodyRows<T>({
  data,
  columns,
  rowKey,
  onRowClick,
  rowClassName,
  getRowStyle,
}: BodyRowsProps<T>) {
  const clickable = Boolean(onRowClick);

  return (
    <>
      {data.map((row, rowIndex) => (
        <TableRow
          key={getResolvedRowKey(row, rowIndex, rowKey)}
          clickable={clickable}
          className={rowClassName?.(row, rowIndex)}
          style={getRowStyle?.(row, rowIndex)}
          onClick={onRowClick ? () => onRowClick(row, rowIndex) : undefined}
        >
          {columns.map((column) => (
            <TableCell
              key={column.key}
              width={column.width}
              align={column.align}
            >
              {column.render(row, rowIndex)}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}) as <T>(props: BodyRowsProps<T>) => JSX.Element;

// ─────────────────────────────────────────────
// DataTable
// ─────────────────────────────────────────────

export function DataTable<T>({
  data,
  columns,
  ariaLabel,
  loading = false,
  emptyText = "데이터가 없습니다.",
  rowKey,
  onRowClick,
  rowClassName,
  tableLayout = "fixed",
  size = "md",
  fullWidth = true,
  skeletonRowCount = 8,
  renderLoadingRow,
  getRowStyle,
}: DataTableProps<T>) {
  const safeData = data ?? [];

  const renderFallbackLoadingRow = useCallback(
    (rowIndex: number) => (
      <TableRow key={`loading-${rowIndex}`}>
        <TableCell colSpan={columns.length}>
          <StyledLoadingBox>
            <StyledSkeleton $height={83} />
          </StyledLoadingBox>
        </TableCell>
      </TableRow>
    ),
    [columns.length],
  );

  const loadingRows = useMemo(
    () =>
      Array.from({ length: skeletonRowCount }, (_, index) =>
        renderLoadingRow ? (
          <React.Fragment key={`custom-loading-${index}`}>
            {renderLoadingRow(index, columns.length)}
          </React.Fragment>
        ) : (
          renderFallbackLoadingRow(index)
        ),
      ),
    [
      columns.length,
      renderFallbackLoadingRow,
      renderLoadingRow,
      skeletonRowCount,
    ],
  );

  const emptyRow = useMemo(
    () => (
      <TableRow>
        <TableCell colSpan={columns.length}>
          <StyledEmptyBox>{emptyText}</StyledEmptyBox>
        </TableCell>
      </TableRow>
    ),
    [emptyText, columns.length],
  );

  return (
    <TableWrapper fullWidth={fullWidth}>
      <Table
        aria-label={ariaLabel}
        size={size}
        fullWidth={fullWidth}
        style={{ tableLayout }}
      >
        <TableHead>
          <HeaderRow columns={columns} />
        </TableHead>

        <TableBody>
          {loading ? (
            loadingRows
          ) : safeData.length === 0 ? (
            emptyRow
          ) : (
            <BodyRows
              data={safeData}
              columns={columns}
              rowKey={rowKey}
              onRowClick={onRowClick}
              rowClassName={rowClassName}
              getRowStyle={getRowStyle}
            />
          )}
        </TableBody>
      </Table>
    </TableWrapper>
  );
}
