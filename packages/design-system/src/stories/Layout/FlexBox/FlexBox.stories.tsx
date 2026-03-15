import type { Meta, StoryObj } from "@storybook/react";
import { FlexBox } from "../../../components/layout/flexbox/Flexbox";
import React from "react";

const Box = ({ height = 40 }: { height?: number }) => (
  <div
    style={{
      width: 60,
      height,
      borderRadius: 8,
      background: "#5B6CFF",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 600,
      fontSize: 12,
    }}
  >
    Box
  </div>
);

const meta: Meta<typeof FlexBox> = {
  title: "Layout/FlexBox",
  component: FlexBox,
  parameters: {
    layout: "padded",
  },

  argTypes: {
    direction: {
      control: "select",
      options: ["row", "column", "rowReverse", "columnReverse"],
    },

    justify: {
      control: "select",
      options: ["start", "center", "end", "between", "around", "evenly"],
    },

    align: {
      control: "select",
      options: ["start", "center", "end", "stretch", "baseline"],
    },

    wrap: {
      control: "select",
      options: ["nowrap", "wrap", "wrapReverse"],
    },

    gap: {
      control: "text",
    },

    fullWidth: {
      control: "boolean",
    },

    fullHeight: {
      control: "boolean",
    },

    grow: {
      control: "boolean",
    },

    shrink: {
      control: "boolean",
    },

    inline: {
      control: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<typeof FlexBox>;

export const Default: Story = {
  render: (args) => (
    <FlexBox {...args}>
      <Box />
      <Box />
      <Box />
    </FlexBox>
  ),

  args: {
    direction: "row",
    justify: "start",
    align: "center",
    gap: 8,
  },
};

export const Column: Story = {
  render: () => (
    <FlexBox direction="column" gap={8}>
      <Box />
      <Box />
      <Box />
    </FlexBox>
  ),
};

export const JustifyBetween: Story = {
  render: () => (
    <div style={{ width: "100%" }}>
      <FlexBox justify="between" align="center" gap={8} fullWidth>
        <Box />
        <Box />
        <Box />
      </FlexBox>
    </div>
  ),
};

export const AlignCenter: Story = {
  render: () => (
    <FlexBox align="center" gap={8}>
      <Box height={30} />
      <Box height={50} />
      <Box height={70} />
    </FlexBox>
  ),
};

export const Wrap: Story = {
  render: () => (
    <div style={{ width: 200 }}>
      <FlexBox wrap="wrap" gap={8}>
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
      </FlexBox>
    </div>
  ),
};

export const Inline: Story = {
  render: () => (
    <FlexBox inline gap={8}>
      <Box />
      <Box />
    </FlexBox>
  ),
};

export const CustomGap: Story = {
  render: () => (
    <FlexBox gap="24px">
      <Box />
      <Box />
      <Box />
    </FlexBox>
  ),
};
