import type { Meta, StoryObj } from "@storybook/react";
import { Grid, GridItem } from "../../../components/layout/grid";

import React from "react";

const Box = ({ height = 80 }: { height?: number }) => (
  <div
    style={{
      width: "100%",
      height,
      background: "#5B6CFF",
      borderRadius: 8,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
      fontWeight: 600,
      fontSize: 14,
    }}
  >
    Item
  </div>
);

const meta: Meta<typeof Grid> = {
  title: "Layout/Grid",
  component: Grid,
  parameters: {
    layout: "padded",
  },

  argTypes: {
    columns: {
      control: "number",
    },

    gap: {
      control: "text",
    },

    rowGap: {
      control: "text",
    },

    columnGap: {
      control: "text",
    },

    responsive: {
      control: "boolean",
    },

    minWidth: {
      control: "text",
    },

    fullWidth: {
      control: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Grid>;

export const Default: Story = {
  render: (args) => (
    <Grid {...args}>
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
    </Grid>
  ),

  args: {
    columns: 3,
    gap: 16,
  },
};

export const Responsive: Story = {
  render: () => (
    <Grid responsive minWidth={200} gap={16}>
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
    </Grid>
  ),
};

export const WithRowGap: Story = {
  render: () => (
    <Grid columns={3} rowGap={24} columnGap={8}>
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
    </Grid>
  ),
};

export const ItemSpan: Story = {
  render: () => (
    <Grid columns={4} gap={16}>
      <GridItem colSpan={2}>
        <Box />
      </GridItem>

      <GridItem>
        <Box />
      </GridItem>

      <GridItem>
        <Box />
      </GridItem>

      <GridItem rowSpan={2}>
        <Box height={180} />
      </GridItem>

      <GridItem>
        <Box />
      </GridItem>

      <GridItem>
        <Box />
      </GridItem>
    </Grid>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <div style={{ width: "100%" }}>
      <Grid columns={3} gap={16} fullWidth>
        <Box />
        <Box />
        <Box />
      </Grid>
    </div>
  ),
};
