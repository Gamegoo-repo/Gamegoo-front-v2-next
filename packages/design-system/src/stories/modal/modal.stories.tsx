import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import styled from "styled-components";
import { Modal } from "../../components/modal";
import { Button } from "../../components/button/button";
import { FlexBox } from "../../components/layout/flexbox/flexbox";

// ─────────────────────────────────────────────
// Meta
// ─────────────────────────────────────────────

const meta: Meta<typeof Modal> = {
  title: "Design System/Modal",
  component: Modal,
  parameters: { layout: "centered" },
  argTypes: {
    padding: {
      control: "select",
      options: ["none", "sm", "md", "lg"],
    },
    backdropClosable: { control: "boolean" },
    escClosable: { control: "boolean" },
    hasCloseButton: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

// ─────────────────────────────────────────────
// Shared Styled
// ─────────────────────────────────────────────

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.colors.gray[300]};
  margin: 24px 0;
`;

const FooterButton = styled.button<{
  $variant?: "default" | "confirm" | "danger";
}>`
  flex: 1;
  height: 51px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 18px;
  font-weight: 600;
  color: ${({ $variant, theme }) =>
    $variant === "confirm"
      ? "#7C3AED"
      : $variant === "danger"
        ? "#DC2626"
        : theme.colors.gray[600]};
  transition: background 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.gray[200]};
  }

  & + & {
    border-left: 1px solid ${({ theme }) => theme.colors.gray[400]};
  }

  &:last-child {
    border-radius: 0 0 ${({ theme }) => theme.radius[20]}
      ${({ theme }) => theme.radius[20]};
  }

  &:only-child {
    border-radius: 0 0 ${({ theme }) => theme.radius[20]}
      ${({ theme }) => theme.radius[20]};
  }
`;

const FooterRow = styled.footer`
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.colors.gray[400]};
  display: flex;
`;

// ─────────────────────────────────────────────
// Profile dummy
// ─────────────────────────────────────────────

const PROFILE_COLORS = ["#B794F4", "#F687B3", "#68D391", "#63B3ED", "#F6AD55"];

const ProfileCircle = styled.div<{ $color: string; $size: number }>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 700;
  font-size: ${({ $size }) => $size / 3}px;
  flex-shrink: 0;
`;

function ProfileDummy({ id, size = 40 }: { id: number; size?: number }) {
  const color = PROFILE_COLORS[(id - 1) % PROFILE_COLORS.length];
  return (
    <ProfileCircle $color={color} $size={size}>
      {id}
    </ProfileCircle>
  );
}

// ─────────────────────────────────────────────
// MenuItem dummy (UserProfileMenu)
// ─────────────────────────────────────────────

const MenuItemButton = styled.button`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 16px;
  border-radius: 12px;
  padding: 16px 9px;
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray[800]};
  background: transparent;
  border: none;
  cursor: pointer;
  transition: background 0.15s ease;
  text-align: left;

  &:hover {
    background: ${({ theme }) => theme.colors.gray[200]};
  }
`;

const MenuIcon = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.gray[400]};
  flex-shrink: 0;
`;

function MenuItem({ label }: { label: string }) {
  return (
    <MenuItemButton type="button">
      <MenuIcon />
      <span>{label}</span>
    </MenuItemButton>
  );
}

// ─────────────────────────────────────────────
// Checkbox dummy (NotificationComponent)
// ─────────────────────────────────────────────

const CheckboxWrapper = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

const CheckboxInput = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #7c3aed;
`;

function Checkbox({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <CheckboxInput type="checkbox" checked={checked} onChange={onChange} />
  );
}

// ─────────────────────────────────────────────
// AlertItem dummy
// ─────────────────────────────────────────────

const AlertItemWrapper = styled.div<{ $read: boolean; $checked: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-radius: 12px;
  background: ${({ $read, $checked, theme }) =>
    $checked ? theme.colors.gray[200] : $read ? theme.colors.white : "#F5F3FF"};
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.gray[100]};
  }
`;

const AlertDot = styled.div<{ $read: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ $read }) => ($read ? "transparent" : "#7C3AED")};
  flex-shrink: 0;
`;

const AlertContent = styled.div`
  flex: 1;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray[800]};
`;

const AlertTime = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.gray[500]};
  flex-shrink: 0;
`;

// ─────────────────────────────────────────────
// Form elements dummy (PostFormModal)
// ─────────────────────────────────────────────

const FieldLabel = styled.p`
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray[800]};
  margin-bottom: 6px;
`;

const SelectBox = styled.select`
  width: 50%;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
  border-radius: 8px;
  padding: 0 12px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray[700]};
  background: ${({ theme }) => theme.colors.white};
  outline: none;
  cursor: pointer;
`;

const PositionCard = styled.div`
  flex: 1;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  min-height: 98px;
`;

const PositionSlot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

const PositionBox = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: 1.5px dashed ${({ theme }) => theme.colors.gray[400]};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  color: ${({ theme }) => theme.colors.gray[400]};
  cursor: pointer;

  &:hover {
    border-color: #7c3aed;
    color: #7c3aed;
  }
`;

const StyleTag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.white};
  padding: 4px 12px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.gray[800]};
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 70px;
  resize: none;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
  padding: 8px 10px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray[700]};
  outline: none;
  transition: border-color 0.15s ease;

  &:focus {
    border-color: #7c3aed;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[400]};
  }
`;

const PrimaryButton = styled.button`
  width: 100%;
  padding: 18px;
  border-radius: 10px;
  background: #7c3aed;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: background 0.15s ease;

  &:disabled {
    background: ${({ theme }) => theme.colors.gray[400]};
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background: #6d28d9;
  }
`;

// ─────────────────────────────────────────────
// Stories
// ─────────────────────────────────────────────

/**
 * 유저 프로필 메뉴 모달
 * UserProfileMenu 컴포넌트 기반
 */
export const UserProfileMenu: Story = {
  render: () => {
    const Example = () => {
      const [open, setOpen] = useState(false);

      return (
        <>
          <Button onClick={() => setOpen(true)}>프로필 메뉴 열기</Button>

          <Modal
            isOpen={open}
            onClose={() => setOpen(false)}
            padding="none"
            className="w-[420px]"
          >
            <div style={{ padding: 32 }}>
              {/* 헤더 */}
              <FlexBox align="center" justify="between">
                <FlexBox align="center" gap={16}>
                  <ProfileDummy id={2} size={64} />
                  <span
                    style={{ fontWeight: 700, fontSize: 20, color: "#111" }}
                  >
                    광열이다
                  </span>
                </FlexBox>
                {/* 알림 아이콘 더미 */}
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    background: "#7C3AED",
                    cursor: "pointer",
                  }}
                />
              </FlexBox>

              <Divider />

              {/* 메뉴 1 */}
              <FlexBox direction="column" gap={8}>
                <MenuItem label="내 정보" />
                <MenuItem label="내가 작성한 글" />
                <MenuItem label="내 평가" />
                <MenuItem label="차단목록" />
              </FlexBox>

              <Divider />

              {/* 메뉴 2 */}
              <FlexBox direction="column" gap={8}>
                <MenuItem label="고객센터" />
                <MenuItem label="로그아웃" />
              </FlexBox>
            </div>
          </Modal>
        </>
      );
    };
    return <Example />;
  },
};

/**
 * 알림 읽음 확인 모달
 * NotificationComponent 기반
 */
export const NotificationReadConfirm: Story = {
  render: () => {
    const Example = () => {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button onClick={() => setOpen(true)}>읽음 처리</Button>
          <Modal
            isOpen={open}
            onClose={() => setOpen(false)}
            padding="none"
            className="w-[320px] md:w-[540px]"
          >
            <FlexBox direction="column" align="center" fullHeight>
              <FlexBox
                align="center"
                justify="center"
                fullHeight
                style={{ flex: 1, padding: 24 }}
              >
                <span style={{ fontSize: 18, color: "#111" }}>
                  선택한 알림을 읽음 처리할까요?
                </span>
              </FlexBox>
              <FooterRow>
                <FooterButton onClick={() => setOpen(false)}>취소</FooterButton>
                <FooterButton $variant="confirm" onClick={() => setOpen(false)}>
                  확인
                </FooterButton>
              </FooterRow>
            </FlexBox>
          </Modal>
        </>
      );
    };
    return <Example />;
  },
};

/**
 * 알림 삭제 확인 모달
 * NotificationComponent 기반
 */
export const NotificationDeleteConfirm: Story = {
  render: () => {
    const Example = () => {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button onClick={() => setOpen(true)}>삭제</Button>
          <Modal
            isOpen={open}
            onClose={() => setOpen(false)}
            padding="none"
            className="w-[320px] md:w-[540px]"
          >
            <FlexBox
              direction="column"
              align="center"
              fullHeight
              style={{ minHeight: 177 }}
            >
              <FlexBox
                direction="column"
                align="center"
                justify="center"
                gap={4}
                fullHeight
                style={{ flex: 1, padding: 24 }}
              >
                <span style={{ fontSize: 18, color: "#111" }}>
                  선택한 알림을 삭제할까요?
                </span>
                <span style={{ fontSize: 18, color: "#111" }}>
                  삭제된 알림은 복구할 수 없습니다.
                </span>
              </FlexBox>
              <FooterRow>
                <FooterButton onClick={() => setOpen(false)}>취소</FooterButton>
                <FooterButton $variant="danger" onClick={() => setOpen(false)}>
                  삭제
                </FooterButton>
              </FooterRow>
            </FlexBox>
          </Modal>
        </>
      );
    };
    return <Example />;
  },
};

/**
 * 알림 목록 + 전체선택 + 모달
 * NotificationComponent 전체 흐름
 */
export const NotificationFull: Story = {
  render: () => {
    const DUMMY_NOTIFICATIONS = [
      {
        id: 1,
        content: "광열이다님이 듀오 요청을 보냈습니다.",
        createdAt: "10분 전",
        read: false,
      },
      {
        id: 2,
        content: "사공님이 매너 평가를 남겼습니다.",
        createdAt: "1시간 전",
        read: true,
      },
      {
        id: 3,
        content: "Gamegoo님의 게시글에 댓글이 달렸습니다.",
        createdAt: "2시간 전",
        read: false,
      },
      {
        id: 4,
        content: "새로운 매칭이 성사되었습니다.",
        createdAt: "어제",
        read: true,
      },
    ];

    const Example = () => {
      const [open, setOpen] = useState(false);
      const [actionState, setActionState] = useState<"read" | "delete" | null>(
        null,
      );
      const [checked, setChecked] = useState<Set<number>>(new Set());

      const allIds = DUMMY_NOTIFICATIONS.map((n) => n.id);
      const isAllChecked =
        allIds.length > 0 && allIds.every((id) => checked.has(id));

      const toggleAll = () => {
        setChecked(isAllChecked ? new Set() : new Set(allIds));
      };

      const toggleOne = (id: number) => {
        setChecked((prev) => {
          const next = new Set(prev);
          next.has(id) ? next.delete(id) : next.add(id);
          return next;
        });
      };

      const openModal = (action: "read" | "delete") => {
        if (!checked.size) return;
        setActionState(action);
        setOpen(true);
      };

      return (
        <div style={{ width: 600 }}>
          <h2
            style={{
              fontWeight: 700,
              fontSize: 25,
              marginBottom: 32,
              borderBottom: "1px solid #E5E7EB",
              paddingBottom: 16,
            }}
          >
            알림
          </h2>

          {/* 툴바 */}
          <header
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              paddingLeft: 12,
              marginBottom: 24,
            }}
          >
            <Checkbox checked={isAllChecked} onChange={toggleAll} />
            <Button
              variant="ghost"
              disabled={!checked.size}
              onClick={() => openModal("read")}
            >
              <span style={{ fontWeight: 600, fontSize: 18 }}>읽음</span>
            </Button>
            <Button
              variant="ghost"
              disabled={!checked.size}
              onClick={() => openModal("delete")}
            >
              <span style={{ fontWeight: 600, fontSize: 18 }}>삭제</span>
            </Button>
          </header>

          {/* 알림 목록 */}
          <ul
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              marginBottom: 32,
              listStyle: "none",
              padding: 0,
            }}
          >
            {DUMMY_NOTIFICATIONS.map((n) => (
              <li
                key={n.id}
                style={{ display: "flex", alignItems: "center", gap: 12 }}
              >
                <Checkbox
                  checked={checked.has(n.id)}
                  onChange={() => toggleOne(n.id)}
                />
                <AlertItemWrapper
                  $read={n.read}
                  $checked={checked.has(n.id)}
                  style={{ flex: 1 }}
                >
                  <AlertDot $read={n.read} />
                  <AlertContent>{n.content}</AlertContent>
                  <AlertTime>{n.createdAt}</AlertTime>
                </AlertItemWrapper>
              </li>
            ))}
          </ul>

          {/* 확인 모달 */}
          <Modal
            isOpen={open}
            onClose={() => {
              setOpen(false);
              setActionState(null);
            }}
            padding="none"
            className="w-[320px] md:w-[540px]"
          >
            <FlexBox
              direction="column"
              align="center"
              fullHeight
              style={{ minHeight: 177 }}
            >
              <FlexBox
                direction="column"
                align="center"
                justify="center"
                gap={4}
                fullHeight
                style={{ flex: 1, padding: 24 }}
              >
                {actionState === "read" ? (
                  <span style={{ fontSize: 18, color: "#111" }}>
                    선택한 알림을 읽음 처리할까요?
                  </span>
                ) : (
                  <>
                    <span style={{ fontSize: 18, color: "#111" }}>
                      선택한 알림을 삭제할까요?
                    </span>
                    <span style={{ fontSize: 18, color: "#111" }}>
                      삭제된 알림은 복구할 수 없습니다.
                    </span>
                  </>
                )}
              </FlexBox>
              <FooterRow>
                <FooterButton
                  onClick={() => {
                    setOpen(false);
                    setActionState(null);
                  }}
                >
                  취소
                </FooterButton>
                <FooterButton
                  $variant={actionState === "read" ? "confirm" : "danger"}
                  onClick={() => {
                    setChecked(new Set());
                    setOpen(false);
                    setActionState(null);
                  }}
                >
                  {actionState === "read" ? "확인" : "삭제"}
                </FooterButton>
              </FooterRow>
            </FlexBox>
          </Modal>
        </div>
      );
    };
    return <Example />;
  },
};

/**
 * 게시글 작성 모달
 * PostFormModal 기반
 */
export const PostFormModal: Story = {
  render: () => {
    const Example = () => {
      const [open, setOpen] = useState(false);
      const [contents, setContents] = useState("");
      const [gameMode, setGameMode] = useState("FAST");
      const [mike, setMike] = useState(false);

      return (
        <>
          <Button onClick={() => setOpen(true)}>게시글 작성</Button>

          <Modal
            isOpen={open}
            onClose={() => setOpen(false)}
            backdropClosable={false}
            className="w-full md:w-[555px]"
          >
            <form>
              <FlexBox direction="column" gap={20}>
                {/* 유저 프로필 */}
                <FlexBox align="center" gap={12}>
                  <ProfileDummy id={1} size={48} />
                  <FlexBox direction="column" gap={2}>
                    <span style={{ fontWeight: 600, fontSize: 15 }}>
                      광열이다
                    </span>
                    <span style={{ fontSize: 12, color: "#6B7280" }}>#KR1</span>
                  </FlexBox>
                </FlexBox>

                {/* 포지션 */}
                <div>
                  <FieldLabel>포지션</FieldLabel>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 8,
                    }}
                  >
                    <PositionCard>
                      <PositionSlot>
                        <span style={{ fontSize: 11, color: "#6B7280" }}>
                          주포지션
                        </span>
                        <PositionBox>선택</PositionBox>
                      </PositionSlot>
                      <PositionSlot>
                        <span style={{ fontSize: 11, color: "#6B7280" }}>
                          부포지션
                        </span>
                        <PositionBox>선택</PositionBox>
                      </PositionSlot>
                    </PositionCard>
                    <PositionCard style={{ flexDirection: "column", gap: 8 }}>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          color: "#6B7280",
                        }}
                      >
                        내가 찾는 포지션
                      </span>
                      <FlexBox gap={16} align="center">
                        <PositionBox>선택</PositionBox>
                        <PositionBox>선택</PositionBox>
                      </FlexBox>
                    </PositionCard>
                  </div>
                </div>

                {/* 게임 모드 */}
                <div>
                  <FieldLabel>선호 게임 모드</FieldLabel>
                  <SelectBox
                    value={gameMode}
                    onChange={(e) => setGameMode(e.target.value)}
                  >
                    <option value="FAST">빠른 대전</option>
                    <option value="NORMAL">일반 게임</option>
                    <option value="RANK_SOLO">솔로 랭크</option>
                    <option value="RANK_FLEX">자유 랭크</option>
                  </SelectBox>
                </div>

                {/* 게임 스타일 */}
                <div>
                  <FieldLabel>게임 스타일</FieldLabel>
                  <FlexBox gap={8} wrap="wrap">
                    {["즐겜", "빡겜", "소통 중시"].map((s) => (
                      <StyleTag key={s}>{s} ✕</StyleTag>
                    ))}
                    <PositionBox style={{ width: 32, height: 32 }}>
                      +
                    </PositionBox>
                  </FlexBox>
                </div>

                {/* 마이크 */}
                <div>
                  <FieldLabel>마이크</FieldLabel>
                  <div
                    style={{
                      width: 44,
                      height: 24,
                      borderRadius: 999,
                      background: mike ? "#7C3AED" : "#D1D5DB",
                      cursor: "pointer",
                      position: "relative",
                      transition: "background 0.2s",
                    }}
                    onClick={() => setMike((v) => !v)}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: 2,
                        left: mike ? 22 : 2,
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        background: "#fff",
                        transition: "left 0.2s",
                      }}
                    />
                  </div>
                </div>

                {/* 한마디 */}
                <div>
                  <FieldLabel>한마디</FieldLabel>
                  <Textarea
                    maxLength={80}
                    value={contents}
                    onChange={(e) => setContents(e.target.value)}
                    placeholder="듀오를 찾는 한마디를 입력하세요."
                  />
                  <span
                    style={{
                      fontSize: 11,
                      color: "#9CA3AF",
                      marginTop: 4,
                      display: "block",
                    }}
                  >
                    {contents.length} / 80
                  </span>
                </div>

                {/* 작성 완료 */}
                <PrimaryButton
                  type="button"
                  disabled={!contents.trim()}
                  onClick={() => setOpen(false)}
                >
                  작성 완료
                </PrimaryButton>
              </FlexBox>
            </form>
          </Modal>
        </>
      );
    };
    return <Example />;
  },
};
