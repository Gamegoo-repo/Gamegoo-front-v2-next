import type { Meta, StoryObj } from "@storybook/react";
import { Section } from "../../../components/layout/section";
import React from "react";
const meta: Meta<typeof Section> = {
  title: "Layout/Section",
  component: Section,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    padding: {
      control: "select",
      options: ["none", "xs", "sm", "md", "lg", "xl"],
    },
    background: {
      control: "select",
      options: ["transparent", "white", "gray", "brand", "dark", "gradient"],
    },
    fullWidth: {
      control: "boolean",
    },
    noContainer: {
      control: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Section>;

/* ------------------------------ */
/* Basic                          */
/* ------------------------------ */

export const Basic: Story = {
  args: {
    padding: "md",
    background: "transparent",
  },
  render: (args) => (
    <Section {...args}>
      <div style={{ height: 120 }}>
        <h2>Basic Section</h2>
        <p>기본 섹션입니다.</p>
      </div>
    </Section>
  ),
};

/* ------------------------------ */
/* Padding Variants               */
/* ------------------------------ */

export const PaddingVariants: Story = {
  render: () => (
    <>
      {(["none", "xs", "sm", "md", "lg", "xl"] as const).map((p) => (
        <Section key={p} padding={p} background="gray">
          <div style={{ height: 80 }}>
            <strong>padding: {p}</strong>
          </div>
        </Section>
      ))}
    </>
  ),
};

/* ------------------------------ */
/* Background Variants            */
/* ------------------------------ */

export const BackgroundVariants: Story = {
  render: () => (
    <>
      {(
        ["transparent", "white", "gray", "brand", "dark", "gradient"] as const
      ).map((bg) => (
        <Section key={bg} background={bg} padding="md">
          <div style={{ height: 80 }}>
            <strong>background: {bg}</strong>
          </div>
        </Section>
      ))}
    </>
  ),
};

/* ------------------------------ */
/* Full Width                     */
/* ------------------------------ */

export const FullWidth: Story = {
  render: () => (
    <>
      <Section background="gray" padding="md">
        <div style={{ height: 80 }}>Container 있음</div>
      </Section>

      <Section background="dark" padding="md" fullWidth>
        <div style={{ height: 80 }}>Full Width</div>
      </Section>
    </>
  ),
};

/* ------------------------------ */
/* No Container                   */
/* ------------------------------ */

export const NoContainer: Story = {
  render: () => (
    <Section background="brand" padding="lg" noContainer>
      <div style={{ padding: 20 }}>
        <h2>No Container</h2>
        <p>Container 없이 전체 영역 사용</p>
      </div>
    </Section>
  ),
};

/* ------------------------------ */
/* Real Layout Example            */
/* ------------------------------ */

export const LandingExample: Story = {
  render: () => (
    <>
      {/* Hero */}
      <Section background="gradient" padding="xl" fullWidth>
        <div style={{ textAlign: "center", padding: 40 }}>
          <h1>Hero Section</h1>
          <p>서비스를 소개하는 영역</p>
        </div>
      </Section>

      {/* Feature */}
      <Section background="white" padding="lg">
        <div style={{ height: 120 }}>
          <h2>Feature Section</h2>
        </div>
      </Section>

      {/* CTA */}
      <Section background="brand" padding="lg" fullWidth>
        <div style={{ textAlign: "center", height: 100 }}>CTA 영역</div>
      </Section>
    </>
  ),
};
