import type { Meta, StoryObj } from "@storybook/react";
import { Margin } from "../../../components/layout/margin";
import React from "react";

const meta: Meta<typeof Margin> = {
  title: "Layout/Margin",
  component: Margin,
  parameters: {
    layout: "padded",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["none", "xs", "sm", "md", "lg", "xl"],
    },
    x: {
      control: "select",
      options: ["none", "xs", "sm", "md", "lg", "xl"],
    },
    y: {
      control: "select",
      options: ["none", "xs", "sm", "md", "lg", "xl"],
    },
    top: {
      control: "select",
      options: ["none", "xs", "sm", "md", "lg", "xl"],
    },
    bottom: {
      control: "select",
      options: ["none", "xs", "sm", "md", "lg", "xl"],
    },
    left: {
      control: "select",
      options: ["none", "xs", "sm", "md", "lg", "xl"],
    },
    right: {
      control: "select",
      options: ["none", "xs", "sm", "md", "lg", "xl"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Margin>;

// ─────────────────────────────────────────────
// 시각화용 더미 컴포넌트
// ─────────────────────────────────────────────

const Box = ({ label }: { label?: string }) => (
  <div
    style={{
      background: "#10B981",
      borderRadius: 8,
      color: "#fff",
      fontWeight: 600,
      fontSize: 13,
      padding: "10px 16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      whiteSpace: "nowrap",
    }}
  >
    {label ?? "Content"}
  </div>
);

/** 마진 영역을 시각화하는 래퍼 */
const MarginVisual = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      display: "inline-block",
      background: "rgba(16,185,129,0.08)",
      border: "1.5px dashed #10B981",
      borderRadius: 4,
    }}
  >
    {children}
  </div>
);

/* ------------------------------ */
/* Basic                          */
/* ------------------------------ */

export const Basic: Story = {
  args: {
    size: "md",
  },
  render: (args) => (
    <MarginVisual>
      <Margin {...args}>
        <Box />
      </Margin>
    </MarginVisual>
  ),
};

/* ------------------------------ */
/* Size Variants                  */
/* ------------------------------ */

export const SizeVariants: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 8,
        alignItems: "flex-start",
      }}
    >
      {(["none", "xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <div
          key={size}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span style={{ fontSize: 12, color: "#6B7280" }}>size="{size}"</span>
          <MarginVisual>
            <Margin size={size}>
              <Box label={size} />
            </Margin>
          </MarginVisual>
        </div>
      ))}
    </div>
  ),
};

/* ------------------------------ */
/* Axis (x / y)                   */
/* ------------------------------ */

export const AxisMargin: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 32, alignItems: "flex-start" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
        }}
      >
        <span style={{ fontSize: 12, color: "#6B7280" }}>x="lg"</span>
        <MarginVisual>
          <Margin x="lg">
            <Box label="x축" />
          </Margin>
        </MarginVisual>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
        }}
      >
        <span style={{ fontSize: 12, color: "#6B7280" }}>y="lg"</span>
        <MarginVisual>
          <Margin y="lg">
            <Box label="y축" />
          </Margin>
        </MarginVisual>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
        }}
      >
        <span style={{ fontSize: 12, color: "#6B7280" }}>x="lg" y="sm"</span>
        <MarginVisual>
          <Margin x="lg" y="sm">
            <Box label="x+y" />
          </Margin>
        </MarginVisual>
      </div>
    </div>
  ),
};

/* ------------------------------ */
/* Individual Sides               */
/* ------------------------------ */

export const IndividualSides: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 32, alignItems: "flex-start" }}>
      {(
        [
          { props: { top: "xl" as const }, label: "top" },
          { props: { bottom: "xl" as const }, label: "bottom" },
          { props: { left: "xl" as const }, label: "left" },
          { props: { right: "xl" as const }, label: "right" },
        ] as const
      ).map(({ props, label }) => (
        <div
          key={label}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span style={{ fontSize: 12, color: "#6B7280" }}>{label}="xl"</span>
          <MarginVisual>
            <Margin {...props}>
              <Box label={label} />
            </Margin>
          </MarginVisual>
        </div>
      ))}
    </div>
  ),
};

/* ------------------------------ */
/* Override                       */
/* ------------------------------ */

export const Override: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 32, alignItems: "flex-start" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
        }}
      >
        <span style={{ fontSize: 12, color: "#6B7280", textAlign: "center" }}>
          size="md"
          <br />
          top="xl"
        </span>
        <MarginVisual>
          <Margin size="md" top="xl">
            <Box label="override" />
          </Margin>
        </MarginVisual>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
        }}
      >
        <span style={{ fontSize: 12, color: "#6B7280", textAlign: "center" }}>
          size="lg"
          <br />
          x="xs"
        </span>
        <MarginVisual>
          <Margin size="lg" x="xs">
            <Box label="override" />
          </Margin>
        </MarginVisual>
      </div>
    </div>
  ),
};

/* ------------------------------ */
/* As Prop                        */
/* ------------------------------ */

export const AsProp: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 32, alignItems: "flex-start" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <span style={{ fontSize: 12, color: "#6B7280" }}>as="section"</span>
        <MarginVisual>
          <Margin size="md" as="section">
            <Box label="section" />
          </Margin>
        </MarginVisual>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <span style={{ fontSize: 12, color: "#6B7280" }}>as="article"</span>
        <MarginVisual>
          <Margin size="md" as="article">
            <Box label="article" />
          </Margin>
        </MarginVisual>
      </div>
    </div>
  ),
};
