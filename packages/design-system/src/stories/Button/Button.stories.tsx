import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Button } from "../../components/button";

const meta: Meta<typeof Button> = {
  title: "Components/Button/Button",
  component: Button,

  parameters: {
    layout: "centered",
  },

  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline", "ghost", "danger", "black"],
    },

    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "icon"],
    },

    loading: {
      control: "boolean",
    },

    children: {
      control: "text",
    },

    onClick: { action: "clicked" },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Button",
  },
};

export const Primary: Story = {
  args: {
    children: "Button",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    children: "Button",
    variant: "secondary",
  },
};

export const Outline: Story = {
  args: {
    children: "Button",
    variant: "outline",
  },
};

export const Ghost: Story = {
  args: {
    children: "Button",
    variant: "ghost",
  },
};

export const Danger: Story = {
  args: {
    children: "Button",
    variant: "danger",
  },
};

export const Black: Story = {
  args: {
    children: "Button",
    variant: "black",
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">XL</Button>
    </div>
  ),
};

export const Icon: Story = {
  render: () => <Button size="icon">X</Button>,
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12 }}>
      <Button variant="primary" disabled>
        Button
      </Button>
      <Button variant="secondary" disabled>
        Button
      </Button>
      <Button variant="outline" disabled>
        Button
      </Button>
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Button size="sm" loading>
        Button
      </Button>
      <Button size="md" loading>
        Button
      </Button>
      <Button size="lg" loading>
        Button
      </Button>
      <Button size="xl" loading>
        Button
      </Button>
    </div>
  ),
};
