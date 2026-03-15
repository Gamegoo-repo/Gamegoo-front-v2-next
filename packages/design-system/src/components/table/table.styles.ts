import styled, { css } from "styled-components";
import type {
  TableHeadCellProps,
  TableCellProps,
  TableRootProps,
  TableWrapperProps,
} from "./table.type";

const getCellPadding = (size: TableRootProps["size"]) => {
  switch (size) {
    case "sm":
      return "10px 12px";
    case "lg":
      return "18px 16px";
    case "md":
    default:
      return "20px 12px 12px 12px";
  }
};

const getTextAlign = (align?: "left" | "center" | "right") => {
  switch (align) {
    case "center":
      return "center";
    case "right":
      return "right";
    case "left":
    default:
      return "left";
  }
};

const resolveWidth = (width?: number | string) => {
  if (width == null) return undefined;
  return typeof width === "number" ? `${width}px` : width;
};

export const StyledTableWrapper = styled.div<TableWrapperProps>`
  position: relative;
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};
  overflow-x: auto;
`;

export const StyledTable = styled.table<{
  $size: NonNullable<TableRootProps["size"]>;
  $fullWidth: boolean;
  $tableLayout: "fixed" | "auto";
}>`
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};
  min-width: 100%;

  /* separate + spacing:0 으로 td에 border-radius 적용 가능하게 */
  border-collapse: separate;
  border-spacing: 0;

  table-layout: ${({ $tableLayout }) => $tableLayout};
  background: ${({ theme }) => theme.colors.white};

  ${({ $size }) => css`
    --table-cell-padding: ${getCellPadding($size)};
  `}
`;

export const StyledTableHead = styled.thead``;

export const StyledTableBody = styled.tbody`
  /* 마지막 행 border-bottom 제거 */
  & tr:last-child td {
    border-bottom: none;
  }
`;

export const StyledTableFooter = styled.tfoot`
  & td {
    border-top: 1px solid ${({ theme }) => theme.colors.gray[300]};
  }
`;

export const StyledTableRow = styled.tr<{
  $clickable?: boolean;
  $selected?: boolean;
}>`
  transition: background-color 0.2s ease;

  ${({ $clickable }) =>
    $clickable &&
    css`
      cursor: pointer;
    `}

  ${({ $selected, theme }) =>
    $selected &&
    css`
      background: ${theme.colors.gray[200]};
    `}

  ${({ $clickable, theme }) =>
    $clickable &&
    css`
      &:hover {
        background: ${theme.colors.gray[200]};
      }
    `}
`;

export const StyledTableHeadCell = styled.th<{
  $align?: TableHeadCellProps["align"];
  $width?: number | string;
}>`
  height: 48px;
  padding: 0 12.5px;

  text-align: center;
  vertical-align: middle;
  font-weight: 700;
  font-size: 14px;
  line-height: normal;

  background: ${({ theme }) => theme.colors.gray[800]};
  color: ${({ theme }) => theme.colors.white};

  &:first-child {
    padding-left: 16px;
    text-align: left;
    border-radius: ${({ theme }) =>
      `${theme.radius[8]} 0 0 ${theme.radius[8]}`};
  }

  &:last-child {
    padding-right: 0;
    border-radius: ${({ theme }) =>
      `0 ${theme.radius[8]} ${theme.radius[8]} 0`};
  }

  &:first-child:last-child {
    border-radius: ${({ theme }) => theme.radius[8]};
  }

  ${({ $align }) =>
    $align != null &&
    css`
      text-align: ${getTextAlign($align)};
      &:first-child {
        text-align: ${getTextAlign($align)};
      }
    `}

  ${({ $width }) =>
    $width != null &&
    css`
      width: ${resolveWidth($width)};
    `}
`;

export const StyledTableCell = styled.td<{
  $align?: TableCellProps["align"];
  $width?: number | string;
}>`
  height: 86px;
  padding: var(--table-cell-padding);

  /* border-bottom을 tr 대신 td에 적용 (border-collapse: separate 대응) */
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[300]};

  text-align: ${({ $align }) => getTextAlign($align)};
  vertical-align: middle;
  color: ${({ theme }) => theme.colors.gray[800]};

  &:first-child {
    padding-left: 12px;
  }

  &:last-child {
    padding-right: 0;
  }

  ${({ $width }) =>
    $width != null &&
    css`
      width: ${resolveWidth($width)};
    `}

  /* empty / 단일 td (colSpan으로 전체를 차지하는 경우) */
  &:only-child {
    border-bottom: none;
    border-radius: ${({ theme }) =>
      `0 0 ${theme.radius[8]} ${theme.radius[8]}`};
  }
`;

export const StyledTableCaption = styled.caption`
  margin-top: 12px;
  color: ${({ theme }) => theme.colors.gray[600]};
  font-size: 14px;
  text-align: left;
`;

export const StyledEmptyBox = styled.div`
  padding: 40px 16px;
  text-align: center;
  color: ${({ theme }) => theme.colors.gray[700]};
  font-size: 16px;
`;

export const StyledLoadingBox = styled.div`
  padding: 10px 0;
`;

export const StyledSkeleton = styled.div<{ $height?: number }>`
  width: 100%;
  height: ${({ $height }) => ($height ? `${$height}px` : "83px")};
  border-radius: ${({ theme }) => theme.radius[10]};

  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.gray[200]} 25%,
    ${({ theme }) => theme.colors.gray[100]} 50%,
    ${({ theme }) => theme.colors.gray[200]} 75%
  );
  background-size: 200% 100%;
  animation: tableSkeletonShimmer 1.4s infinite linear;

  @keyframes tableSkeletonShimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;
