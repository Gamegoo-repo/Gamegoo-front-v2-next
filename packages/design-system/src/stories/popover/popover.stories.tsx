import type { Meta, StoryObj } from "@storybook/react";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "../../components/popover";
import { Button } from "../../components/button/button";
import { FlexBox } from "../../components/layout/flexbox/flexbox";

// ─────────────────────────────────────────────
// Meta
// ─────────────────────────────────────────────

const meta: Meta<typeof Popover> = {
  title: "Design System/Popover",
  component: Popover,
  parameters: { layout: "padded" },
  argTypes: {
    align: {
      control: "select",
      options: ["start", "center", "end"],
    },
    side: {
      control: "select",
      options: ["top", "bottom"],
    },
    sideOffset: {
      control: "number",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Popover>;

// ─────────────────────────────────────────────
// Shared Styled
// ─────────────────────────────────────────────

const Stage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  width: 100%;
`;

const PopoverBox = styled.div`
  background: rgba(0, 0, 0, 0.75);
  border-radius: ${({ theme }) => theme.radius[12]};
  padding: 16px;
  min-width: 200px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
`;

const PopoverDivider = styled.div`
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.15);
  margin: 12px 0;
`;

const PopoverMenuItem = styled.button`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 10px;
  padding: 10px 8px;
  border-radius: 8px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  transition: background 0.15s ease;
  text-align: left;

  &:hover {
    background: rgba(255, 255, 255, 0.12);
  }
`;

const TriggerBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  cursor: pointer;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.gray[600]};
  transition: background 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.gray[200]};
  }
`;

const PositionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-top: 12px;
`;

const PositionItem = styled.button<{ $selected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 10px 4px;
  border-radius: 10px;
  background: ${({ $selected }) =>
    $selected ? "rgba(124,58,237,0.6)" : "rgba(255,255,255,0.08)"};
  border: 1.5px solid
    ${({ $selected }) => ($selected ? "#7C3AED" : "rgba(255,255,255,0.12)")};
  cursor: pointer;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  transition: all 0.15s ease;

  &:hover {
    background: rgba(124, 58, 237, 0.4);
  }
`;

const PositionIconDummy = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.2);
`;

const GameStyleGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
`;

const StyleChip = styled.button<{ $selected: boolean }>`
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
  background: ${({ $selected }) =>
    $selected ? "#7C3AED" : "rgba(255,255,255,0.08)"};
  border: 1.5px solid
    ${({ $selected }) => ($selected ? "#7C3AED" : "rgba(255,255,255,0.2)")};
  color: #fff;

  &:hover {
    background: rgba(124, 58, 237, 0.5);
  }
`;

// ─────────────────────────────────────────────
// Stories
// ─────────────────────────────────────────────

/** 기본 사용 */
export const Basic: Story = {
  render: (args) => (
    <Stage>
      <Popover {...args}>
        <PopoverTrigger asChild>
          <TriggerBtn>⋮</TriggerBtn>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverBox>
            <PopoverHeader title="메뉴" />
            <PopoverDivider />
            <FlexBox direction="column" gap={2}>
              <PopoverMenuItem>항목 1</PopoverMenuItem>
              <PopoverMenuItem>항목 2</PopoverMenuItem>
              <PopoverMenuItem>항목 3</PopoverMenuItem>
            </FlexBox>
          </PopoverBox>
        </PopoverContent>
      </Popover>
    </Stage>
  ),
};

/** 게시글 액션 메뉴 (PostActionMenu) */
export const PostActionMenu: Story = {
  render: () => (
    <Stage>
      <FlexBox gap={32} align="center">
        <div>
          <p style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 8 }}>
            내 게시글
          </p>
          <Popover align="end">
            <PopoverTrigger asChild>
              <TriggerBtn aria-label="게시글 메뉴">⋮</TriggerBtn>
            </PopoverTrigger>
            <PopoverContent showArrow={false}>
              <PopoverBox style={{ minWidth: 140, padding: 0 }}>
                <div
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <PopoverMenuItem>수정하기</PopoverMenuItem>
                </div>
                <PopoverMenuItem style={{ color: "#F87171" }}>
                  삭제하기
                </PopoverMenuItem>
              </PopoverBox>
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <p style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 8 }}>
            다른 사람 게시글
          </p>
          <Popover align="end">
            <PopoverTrigger asChild>
              <TriggerBtn aria-label="게시글 메뉴">⋮</TriggerBtn>
            </PopoverTrigger>
            <PopoverContent showArrow={false}>
              <PopoverBox style={{ minWidth: 140, padding: 0 }}>
                <div
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <PopoverMenuItem>신고하기</PopoverMenuItem>
                </div>
                <PopoverMenuItem>차단하기</PopoverMenuItem>
              </PopoverBox>
            </PopoverContent>
          </Popover>
        </div>
      </FlexBox>
    </Stage>
  ),
};

/** 포지션 선택 (PositionSelector) */
export const PositionSelector: Story = {
  render: () => {
    const POSITIONS = [
      { id: "TOP", label: "탑" },
      { id: "JUNGLE", label: "정글" },
      { id: "MID", label: "미드" },
      { id: "BOTTOM", label: "원딜" },
      { id: "SUPPORT", label: "서포터" },
      { id: "ANY", label: "전체" },
    ];

    const Example = () => {
      const [selected, setSelected] = useState<string | null>(null);
      return (
        <Stage>
          <Popover align="center">
            <PopoverTrigger asChild>
              <TriggerBtn
                style={{ width: 48, height: 48, fontSize: 12 }}
                aria-label="포지션 선택"
              >
                {selected ?? "+"}
              </TriggerBtn>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverBox style={{ width: 220 }}>
                <PopoverHeader title="포지션 선택" />
                <PositionGrid>
                  {POSITIONS.map((pos) => (
                    <PositionItem
                      key={pos.id}
                      type="button"
                      $selected={selected === pos.id}
                      onClick={() => setSelected(pos.id)}
                    >
                      <PositionIconDummy />
                      <span>{pos.label}</span>
                    </PositionItem>
                  ))}
                </PositionGrid>
              </PopoverBox>
            </PopoverContent>
          </Popover>
        </Stage>
      );
    };
    return <Example />;
  },
};

/** 게임 스타일 (GameStylePopover) */
export const GameStylePopover: Story = {
  render: () => {
    const STYLES = [
      "즐겜",
      "빡겜",
      "소통 중시",
      "캐리 선호",
      "서포터 선호",
      "운영형",
      "한타형",
      "빠른 진행",
    ];

    const Example = () => {
      const [selected, setSelected] = useState<string[]>([]);
      const toggle = (s: string) =>
        setSelected((prev) =>
          prev.includes(s)
            ? prev.filter((v) => v !== s)
            : prev.length < 3
              ? [...prev, s]
              : prev,
        );

      return (
        <Stage>
          <FlexBox direction="column" gap={12} align="center">
            <FlexBox
              gap={8}
              wrap="wrap"
              justify="center"
              style={{ minHeight: 28 }}
            >
              {selected.map((s) => (
                <span
                  key={s}
                  style={{
                    padding: "4px 12px",
                    borderRadius: 999,
                    background: "#EDE9FE",
                    color: "#7C3AED",
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  {s}
                </span>
              ))}
            </FlexBox>

            <Popover align="start">
              <PopoverTrigger asChild>
                <TriggerBtn
                  style={{ width: 36, height: 36, fontSize: 20 }}
                  aria-label="게임 스타일 추가"
                >
                  +
                </TriggerBtn>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverBox style={{ width: 260 }}>
                  <PopoverHeader title="게임 스타일" />
                  <p
                    style={{
                      fontSize: 12,
                      color: "rgba(255,255,255,0.5)",
                      marginTop: 8,
                    }}
                  >
                    최대 3개 선택 ({selected.length}/3)
                  </p>
                  <GameStyleGrid>
                    {STYLES.map((s) => (
                      <StyleChip
                        key={s}
                        type="button"
                        $selected={selected.includes(s)}
                        onClick={() => toggle(s)}
                      >
                        {s}
                      </StyleChip>
                    ))}
                  </GameStyleGrid>
                </PopoverBox>
              </PopoverContent>
            </Popover>
          </FlexBox>
        </Stage>
      );
    };
    return <Example />;
  },
};

/** Controlled 모드 */
export const Controlled: Story = {
  render: () => {
    const Example = () => {
      const [open, setOpen] = useState(false);
      return (
        <Stage>
          <FlexBox direction="column" gap={16} align="center">
            <FlexBox gap={8}>
              <Button onClick={() => setOpen(true)}>외부에서 열기</Button>
              <Button variant="secondary" onClick={() => setOpen(false)}>
                외부에서 닫기
              </Button>
            </FlexBox>

            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <TriggerBtn>⋮</TriggerBtn>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverBox>
                  <PopoverHeader title="Controlled" />
                  <PopoverDivider />
                  <p style={{ color: "#fff", fontSize: 14 }}>
                    외부 상태로 제어됩니다.
                  </p>
                </PopoverBox>
              </PopoverContent>
            </Popover>
          </FlexBox>
        </Stage>
      );
    };
    return <Example />;
  },
};

/** align 변형 */
export const AlignVariants: Story = {
  render: () => (
    <Stage>
      <FlexBox gap={48} align="center">
        {(["start", "center", "end"] as const).map((align) => (
          <FlexBox key={align} direction="column" align="center" gap={8}>
            <span style={{ fontSize: 12, color: "#9CA3AF" }}>{align}</span>
            <Popover align={align}>
              <PopoverTrigger asChild>
                <Button>{align}</Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverBox style={{ minWidth: 160 }}>
                  <p style={{ color: "#fff", fontSize: 14 }}>align = {align}</p>
                </PopoverBox>
              </PopoverContent>
            </Popover>
          </FlexBox>
        ))}
      </FlexBox>
    </Stage>
  ),
};

/** side 변형 */
export const SideVariants: Story = {
  render: () => (
    <Stage>
      <FlexBox gap={48} align="center">
        {(["top", "bottom"] as const).map((side) => (
          <FlexBox key={side} direction="column" align="center" gap={8}>
            <span style={{ fontSize: 12, color: "#9CA3AF" }}>{side}</span>
            <Popover side={side}>
              <PopoverTrigger asChild>
                <Button>{side}</Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverBox style={{ minWidth: 160 }}>
                  <p style={{ color: "#fff", fontSize: 14 }}>side = {side}</p>
                </PopoverBox>
              </PopoverContent>
            </Popover>
          </FlexBox>
        ))}
      </FlexBox>
    </Stage>
  ),
};

/**
 * overflow:hidden 컨테이너 내부
 * containerRef 전달 시 body portal + 좌표 계산으로 잘림 방지
 */
export const InsideContainer: Story = {
  render: () => {
    const containerRef = useRef<HTMLDivElement>(null);
    return (
      <Stage>
        <div
          ref={containerRef}
          style={{
            position: "relative",
            width: 400,
            height: 300,
            background: "#F3F4F6",
            borderRadius: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            border: "1px solid #E5E7EB",
          }}
        >
          <p
            style={{
              position: "absolute",
              top: 12,
              left: 16,
              fontSize: 12,
              color: "#9CA3AF",
            }}
          >
            overflow:hidden 컨테이너 — containerRef 전달
          </p>

          {/* containerRef 전달 → body portal로 잘림 방지 */}
          <Popover containerRef={containerRef} align="center">
            <PopoverTrigger asChild>
              <Button>팝오버 열기</Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverBox style={{ minWidth: 180 }}>
                <PopoverHeader title="내부 팝오버" />
                <PopoverDivider />
                <p style={{ color: "#fff", fontSize: 14 }}>
                  body에 portal로 렌더됩니다.
                </p>
              </PopoverBox>
            </PopoverContent>
          </Popover>
        </div>
      </Stage>
    );
  },
};

/** 화살표 없음 (PopoverMenu 패턴) */
export const NoArrow: Story = {
  render: () => (
    <Stage>
      <Popover align="end">
        <PopoverTrigger asChild>
          <TriggerBtn aria-label="메뉴">⋮</TriggerBtn>
        </PopoverTrigger>
        <PopoverContent showArrow={false}>
          <PopoverBox style={{ minWidth: 160, padding: 0 }}>
            <div style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
              <PopoverMenuItem>수정하기</PopoverMenuItem>
            </div>
            <PopoverMenuItem style={{ color: "#F87171" }}>
              삭제하기
            </PopoverMenuItem>
          </PopoverBox>
        </PopoverContent>
      </Popover>
    </Stage>
  ),
};
