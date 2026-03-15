import type { Meta, StoryObj } from "@storybook/react";
import {
  DataTable,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "../../components/table";
import React from "react";
import styled, { css } from "styled-components";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

type ChampionStat = {
  championId: number;
  championName: string;
  winRate: number;
};

type BoardRow = {
  id: number;
  boardId: number;
  memberId: number;
  gameName: string;
  tag: string;
  profileImage: number;
  mannerLevel: number;
  tier: string;
  rank: string;
  mainP: string;
  subP: string;
  wantP: string[];
  championStatsResponseList: ChampionStat[];
  winRate: number;
  contents: string;
  createdAt: string;
  bumpTime: string;
  isBlocked: boolean;
};

// ─────────────────────────────────────────────
// Dummy Data
// ─────────────────────────────────────────────

const sampleData: BoardRow[] = [
  {
    id: 1,
    boardId: 1,
    memberId: 101,
    gameName: "광열이다",
    tag: "KR1",
    profileImage: 1,
    mannerLevel: 5,
    tier: "DIAMOND",
    rank: "II",
    mainP: "MID",
    subP: "JUNGLE",
    wantP: ["TOP", "SUPPORT"],
    championStatsResponseList: [
      { championId: 1, championName: "Ahri", winRate: 72 },
      { championId: 2, championName: "Zed", winRate: 58 },
      { championId: 3, championName: "Yasuo", winRate: 48 },
    ],
    winRate: 62.5,
    contents: "다이아 미드 듀오 구합니다. 진지하게 하실 분만",
    createdAt: "2026-03-15T10:00:00",
    bumpTime: "2026-03-15T12:00:00",
    isBlocked: false,
  },
  {
    id: 2,
    boardId: 2,
    memberId: 102,
    gameName: "사공광열",
    tag: "0001",
    profileImage: 3,
    mannerLevel: 3,
    tier: "PLATINUM",
    rank: "I",
    mainP: "SUPPORT",
    subP: "BOTTOM",
    wantP: ["BOTTOM"],
    championStatsResponseList: [
      { championId: 4, championName: "Thresh", winRate: 65 },
      { championId: 5, championName: "Lulu", winRate: 55 },
    ],
    winRate: 51.2,
    contents: "원딜 구해요~ 소통 잘 되는 분",
    createdAt: "2026-03-14T18:30:00",
    bumpTime: "2026-03-14T18:30:00",
    isBlocked: false,
  },
  {
    id: 3,
    boardId: 3,
    memberId: 103,
    gameName: "Gamegoo",
    tag: "GG01",
    profileImage: 5,
    mannerLevel: 4,
    tier: "EMERALD",
    rank: "III",
    mainP: "TOP",
    subP: "MID",
    wantP: ["JUNGLE", "MID"],
    championStatsResponseList: [
      { championId: 6, championName: "Darius", winRate: 71 },
      { championId: 7, championName: "Garen", winRate: 44 },
    ],
    winRate: 55.0,
    contents: "탑 장인입니다. 정글 듀오 환영",
    createdAt: "2026-03-13T09:00:00",
    bumpTime: "2026-03-13T09:00:00",
    isBlocked: false,
  },
  {
    id: 4,
    boardId: 4,
    memberId: 104,
    gameName: "나는정글러",
    tag: "JG99",
    profileImage: 2,
    mannerLevel: 2,
    tier: "GOLD",
    rank: "IV",
    mainP: "JUNGLE",
    subP: "TOP",
    wantP: ["MID", "SUPPORT"],
    championStatsResponseList: [
      { championId: 8, championName: "LeeSin", winRate: 52 },
    ],
    winRate: 48.3,
    contents: "골드 탈출 같이 해요",
    createdAt: "2026-03-12T14:20:00",
    bumpTime: "2026-03-12T14:20:00",
    isBlocked: false,
  },
  {
    id: 5,
    boardId: 5,
    memberId: 105,
    gameName: "botlane queen",
    tag: "ADC1",
    profileImage: 4,
    mannerLevel: 5,
    tier: "MASTER",
    rank: "",
    mainP: "BOTTOM",
    subP: "MID",
    wantP: ["SUPPORT"],
    championStatsResponseList: [
      { championId: 9, championName: "Jinx", winRate: 78 },
      { championId: 10, championName: "Caitlyn", winRate: 69 },
      { championId: 11, championName: "Jhin", winRate: 61 },
    ],
    winRate: 70.1,
    contents: "마스터 원딜 서폿 듀오 구합니다. 그랜드마 목표",
    createdAt: "2026-03-11T22:00:00",
    bumpTime: "2026-03-15T08:00:00",
    isBlocked: false,
  },
];

// ─────────────────────────────────────────────
// Profile colors / position labels
// ─────────────────────────────────────────────

const PROFILE_COLORS = [
  "#B794F4",
  "#F687B3",
  "#68D391",
  "#63B3ED",
  "#F6AD55",
  "#FC8181",
  "#76E4F7",
  "#9AE6B4",
];

const TIER_COLORS: Record<string, string> = {
  CHALLENGER: "#F4C874",
  GRANDMASTER: "#E84057",
  MASTER: "#9D4DC6",
  DIAMOND: "#5B9BD5",
  EMERALD: "#1FAB89",
  PLATINUM: "#4BADA8",
  GOLD: "#C89B3C",
  SILVER: "#A0A9B8",
  BRONZE: "#8C5A3C",
  IRON: "#6B6B6B",
  UNRANKED: "#9CA3AF",
};

const POSITION_LABEL: Record<string, string> = {
  TOP: "탑",
  JUNGLE: "정",
  MID: "미",
  BOTTOM: "원",
  SUPPORT: "서",
  ANY: "전",
};

// ─────────────────────────────────────────────
// Styled dummy components
// ─────────────────────────────────────────────

// UserProfile
const StyledProfileCircle = styled.div<{ $color: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 700;
  font-size: 13px;
  flex-shrink: 0;
  overflow: hidden;
`;

function UserProfileDummy({ id }: { id: number }) {
  const color = PROFILE_COLORS[(id - 1) % PROFILE_COLORS.length];
  return <StyledProfileCircle $color={color}>{id}</StyledProfileCircle>;
}

// Summoner cell
const StyledSummonerCell = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  height: fit-content;
`;

const StyledSummonerInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const StyledGameName = styled.span`
  font-weight: 600;
  font-size: 15px;
  color: ${({ theme }) => theme.colors.gray[800]};
  max-width: 13ch;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
`;

const StyledTag = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.gray[600]};
`;

// MannerLevelBadge
const StyledMannerBadge = styled.div`
  font-weight: 700;
  font-size: 16px;
  color: #7c3aed;
  text-align: center;
  width: 100%;
  white-space: nowrap;
`;

// TierBadge
const StyledTierBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  min-width: 80px;
`;

const StyledTierDot = styled.div<{ $color: string }>`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  color: #fff;
`;

const StyledTierText = styled.span`
  font-weight: 700;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.gray[800]};
`;

// PositionIcon
const StyledPositionIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.gray[200]};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray[700]};
`;

const StyledPositionList = styled.ol`
  display: flex;
  gap: 2px;
  justify-content: center;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
`;

// ChampionStatsSection
const StyledChampionList = styled.ul`
  display: flex;
  gap: 6px;
  align-items: center;
  justify-content: center;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const StyledChampionItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
`;

const StyledChampionIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 6px;
  background: #2d3748;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 8px;
  font-weight: 700;
  color: #fff;
  text-align: center;
  line-height: 1.2;
`;

const StyledWinRateBadge = styled.span<{ $winRate: number }>`
  font-size: 10px;
  font-weight: 700;
  color: #fff;
  border-radius: 999px;
  padding: 1px 4px;
  min-width: 32px;
  text-align: center;
  background: ${({ $winRate }) =>
    $winRate >= 70 ? "#CB1FCF" : $winRate >= 50 ? "#7C3AED" : "#4A5568"};
`;

const StyledEmptyChampion = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.gray[400]};
  text-align: center;
`;

// WinRate
const StyledWinRate = styled.div<{ $high: boolean }>`
  font-weight: 700;
  font-size: 16px;
  color: ${({ $high, theme }) => ($high ? "#7C3AED" : theme.colors.gray[800])};
  text-align: center;
  width: 100%;
  white-space: nowrap;
`;

// Contents
const StyledContentsBox = styled.div`
  width: 156px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
  background: ${({ theme }) => theme.colors.gray[100]};
  padding: 8px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.gray[800]};
  text-align: center;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
`;

// Date
const StyledDate = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray[500]};
  text-align: center;
  width: 100%;
  white-space: nowrap;
`;

// ActionMenu
const StyledActionDot = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.gray[400]};
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background: ${({ theme }) => theme.colors.gray[200]};
  }
`;

// ─────────────────────────────────────────────
// Columns
// ─────────────────────────────────────────────

const boardColumns = [
  {
    key: "summoner",
    header: "소환사",
    width: "17%",
    render: (row: BoardRow) => (
      <StyledSummonerCell>
        <UserProfileDummy id={row.profileImage} />
        <StyledSummonerInfo>
          <StyledGameName>{row.gameName}</StyledGameName>
          <StyledTag>#{row.tag}</StyledTag>
        </StyledSummonerInfo>
      </StyledSummonerCell>
    ),
  },
  {
    key: "mannerLevel",
    header: "매너 레벨",
    width: "7%",
    align: "center" as const,
    render: (row: BoardRow) => (
      <StyledMannerBadge>LV. {row.mannerLevel}</StyledMannerBadge>
    ),
  },
  {
    key: "tier",
    header: "티어",
    width: "8%",
    align: "center" as const,
    render: (row: BoardRow) => {
      const color = TIER_COLORS[row.tier] ?? "#9CA3AF";
      return (
        <StyledTierBadge>
          <StyledTierDot $color={color}>{row.tier.charAt(0)}</StyledTierDot>
          <StyledTierText>
            {row.tier.charAt(0)}
            {row.rank}
          </StyledTierText>
        </StyledTierBadge>
      );
    },
  },
  {
    key: "position",
    header: "주/부 포지션",
    width: "9%",
    align: "center" as const,
    render: (row: BoardRow) => (
      <StyledPositionList>
        <li>
          <StyledPositionIcon>
            {POSITION_LABEL[row.mainP] ?? row.mainP}
          </StyledPositionIcon>
        </li>
        <li>
          <StyledPositionIcon>
            {POSITION_LABEL[row.subP] ?? row.subP}
          </StyledPositionIcon>
        </li>
      </StyledPositionList>
    ),
  },
  {
    key: "wantPosition",
    header: "내가 찾는 포지션",
    width: "10%",
    align: "center" as const,
    render: (row: BoardRow) => (
      <StyledPositionList>
        {row.wantP.map((p, i) => (
          <li key={i}>
            <StyledPositionIcon>{POSITION_LABEL[p] ?? p}</StyledPositionIcon>
          </li>
        ))}
      </StyledPositionList>
    ),
  },
  {
    key: "champions",
    header: "최근 선호 챔피언",
    width: "17%",
    align: "center" as const,
    render: (row: BoardRow) =>
      row.championStatsResponseList.length === 0 ? (
        <StyledEmptyChampion>챔피언 정보가 없습니다</StyledEmptyChampion>
      ) : (
        <StyledChampionList>
          {row.championStatsResponseList.map((c) => (
            <StyledChampionItem key={c.championId}>
              <StyledChampionIcon>
                {c.championName.slice(0, 3)}
              </StyledChampionIcon>
              <StyledWinRateBadge $winRate={c.winRate}>
                {c.winRate.toFixed(0)}%
              </StyledWinRateBadge>
            </StyledChampionItem>
          ))}
        </StyledChampionList>
      ),
  },
  {
    key: "winRate",
    header: "승률",
    width: "7%",
    align: "center" as const,
    render: (row: BoardRow) => (
      <StyledWinRate $high={(row.winRate ?? 0) >= 50}>
        {row.winRate?.toFixed(1)}%
      </StyledWinRate>
    ),
  },
  {
    key: "contents",
    header: "한마디",
    width: "15%",
    align: "center" as const,
    render: (row: BoardRow) => (
      <StyledContentsBox>{row.contents}</StyledContentsBox>
    ),
  },
  {
    key: "createdAt",
    header: "등록일시",
    width: "8%",
    align: "center" as const,
    render: (row: BoardRow) => (
      <StyledDate>{(row.bumpTime || row.createdAt).slice(0, 10)}</StyledDate>
    ),
  },
  {
    key: "action",
    header: "",
    width: "2%",
    render: () => <StyledActionDot>⋮</StyledActionDot>,
  },
];

// ─────────────────────────────────────────────
// Meta
// ─────────────────────────────────────────────

const meta: Meta<typeof DataTable<BoardRow>> = {
  title: "Data Display/Table",
  component: DataTable<BoardRow>,
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof DataTable<BoardRow>>;

// ─────────────────────────────────────────────
// Stories
// ─────────────────────────────────────────────

export const Primitive: Story = {
  render: () => (
    <Table aria-label="primitive table example">
      <TableHead>
        <tr>
          <TableHeadCell width={80}>번호</TableHeadCell>
          <TableHeadCell>제목</TableHeadCell>
          <TableHeadCell width={120}>작성자</TableHeadCell>
        </tr>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>1</TableCell>
          <TableCell>기본 Primitive 테이블 예시</TableCell>
          <TableCell>광열</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const Default: Story = {
  render: () => (
    <DataTable<BoardRow>
      ariaLabel="게시판 목록"
      data={sampleData}
      rowKey="id"
      columns={boardColumns}
    />
  ),
};

export const Loading: Story = {
  render: () => (
    <DataTable<BoardRow>
      ariaLabel="게시판 목록 로딩"
      loading
      columns={boardColumns}
    />
  ),
};

export const Empty: Story = {
  render: () => (
    <DataTable<BoardRow>
      ariaLabel="게시판 목록 비어있음"
      data={[]}
      emptyText="게시된 글이 없습니다."
      columns={boardColumns}
    />
  ),
};

export const ClickableRows: Story = {
  render: () => (
    <DataTable<BoardRow>
      ariaLabel="클릭 가능한 게시판 목록"
      data={sampleData}
      rowKey="id"
      onRowClick={(row) => {
        // eslint-disable-next-line no-console
        console.log("clicked:", row.gameName);
      }}
      columns={boardColumns}
    />
  ),
};
