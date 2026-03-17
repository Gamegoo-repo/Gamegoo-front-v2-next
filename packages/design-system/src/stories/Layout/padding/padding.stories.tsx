import type { Meta, StoryObj } from "@storybook/react";
import { Padding } from "../../../components/layout/padding";
import React from "react";

const meta: Meta<typeof Padding> = {
  title: "Layout/Padding",
  component: Padding,
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

type Story = StoryObj<typeof Padding>;

// ─────────────────────────────────────────────
// 시각화용 더미 박스
// ─────────────────────────────────────────────

const Box = ({ label }: { label?: string }) => (
  <div
    style={{
      background: "#5B6CFF",
      borderRadius: 8,
      color: "#fff",
      fontWeight: 600,
      fontSize: 13,
      padding: "10px 16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {label ?? "Content"}
  </div>
);

const PaddingVisual = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      display: "inline-block",
      background: "rgba(91,108,255,0.08)",
      border: "1.5px dashed #5B6CFF",
      borderRadius: 8,
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
    <PaddingVisual>
      <Padding {...args}>
        <Box />
      </Padding>
    </PaddingVisual>
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
        gap: 24,
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
          <PaddingVisual>
            <Padding size={size}>
              <Box label={size} />
            </Padding>
          </PaddingVisual>
        </div>
      ))}
    </div>
  ),
};

/* ------------------------------ */
/* Axis (x / y)                   */
/* ------------------------------ */

export const AxisPadding: Story = {
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
        <PaddingVisual>
          <Padding x="lg">
            <Box label="x축" />
          </Padding>
        </PaddingVisual>
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
        <PaddingVisual>
          <Padding y="lg">
            <Box label="y축" />
          </Padding>
        </PaddingVisual>
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
        <PaddingVisual>
          <Padding x="lg" y="sm">
            <Box label="x+y" />
          </Padding>
        </PaddingVisual>
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
          <PaddingVisual>
            <Padding {...props}>
              <Box label={label} />
            </Padding>
          </PaddingVisual>
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
        <PaddingVisual>
          <Padding size="md" top="xl">
            <Box label="override" />
          </Padding>
        </PaddingVisual>
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
        <PaddingVisual>
          <Padding size="lg" x="xs">
            <Box label="override" />
          </Padding>
        </PaddingVisual>
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
        <PaddingVisual>
          <Padding size="md" as="section">
            <Box label="section" />
          </Padding>
        </PaddingVisual>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <span style={{ fontSize: 12, color: "#6B7280" }}>as="article"</span>
        <PaddingVisual>
          <Padding size="md" as="article">
            <Box label="article" />
          </Padding>
        </PaddingVisual>
      </div>
    </div>
  ),
};
