import type { Meta, StoryObj } from "@storybook/react";
import { Container } from "../../../components/layout/container/container";
import React from "react";

const PageContent = () => (
  <div
    style={{
      border: "1px solid #E2E8F0",
      borderRadius: 12,
      overflow: "hidden",
      background: "#fff",
    }}
  >
    {/* Header */}
    <div
      style={{
        padding: "20px 24px",
        borderBottom: "1px solid #E2E8F0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: "#5B6CFF",
          }}
        />
        <span style={{ fontWeight: 700, fontSize: 16, color: "#1A202C" }}>
          Dashboard
        </span>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        {["Home", "About", "Contact"].map((item) => (
          <span
            key={item}
            style={{ fontSize: 14, color: "#64748B", cursor: "pointer" }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>

    {/* Body */}
    <div style={{ padding: "24px" }}>
      {/* Title */}
      <div
        style={{
          height: 24,
          width: 200,
          borderRadius: 6,
          background: "#1A202C",
          marginBottom: 8,
        }}
      />
      <div
        style={{
          height: 14,
          width: "60%",
          borderRadius: 4,
          background: "#E2E8F0",
          marginBottom: 24,
        }}
      />

      {/* Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
          marginBottom: 24,
        }}
      >
        {[
          { label: "Total Users", value: "12,430", color: "#5B6CFF" },
          { label: "Revenue", value: "$84,200", color: "#10B981" },
          { label: "Orders", value: "3,210", color: "#F59E0B" },
        ].map((card) => (
          <div
            key={card.label}
            style={{
              padding: "16px 20px",
              border: "1px solid #E2E8F0",
              borderRadius: 10,
              background: "#F8FAFC",
            }}
          >
            <div style={{ fontSize: 12, color: "#64748B", marginBottom: 6 }}>
              {card.label}
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: card.color }}>
              {card.value}
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div
        style={{
          border: "1px solid #E2E8F0",
          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            background: "#F1F5F9",
            padding: "10px 16px",
          }}
        >
          {["Name", "Status", "Date"].map((h) => (
            <span
              key={h}
              style={{ fontSize: 12, fontWeight: 600, color: "#64748B" }}
            >
              {h}
            </span>
          ))}
        </div>
        {[
          { name: "Alice Johnson", status: "Active", date: "2024-01-12" },
          { name: "Bob Smith", status: "Pending", date: "2024-01-10" },
          { name: "Carol White", status: "Inactive", date: "2024-01-08" },
        ].map((row, i) => (
          <div
            key={row.name}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              padding: "12px 16px",
              borderTop: "1px solid #E2E8F0",
              background: i % 2 === 0 ? "#fff" : "#FAFAFA",
            }}
          >
            <span style={{ fontSize: 14, color: "#1A202C" }}>{row.name}</span>
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color:
                  row.status === "Active"
                    ? "#10B981"
                    : row.status === "Pending"
                      ? "#F59E0B"
                      : "#94A3B8",
              }}
            >
              {row.status}
            </span>
            <span style={{ fontSize: 13, color: "#64748B" }}>{row.date}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const meta: Meta<typeof Container> = {
  title: "Layout/Container",
  component: Container,
  parameters: {
    layout: "padded",
  },

  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "2xl", "full"],
    },

    padding: {
      control: "text",
    },

    centered: {
      control: "boolean",
    },

    fullWidth: {
      control: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Container>;

export const Default: Story = {
  render: (args) => (
    <Container {...args}>
      <PageContent />
    </Container>
  ),

  args: {
    size: "xl",
    padding: 16,
  },
};

export const Small: Story = {
  render: () => (
    <Container size="sm" padding={16}>
      <PageContent />
    </Container>
  ),
};

export const Medium: Story = {
  render: () => (
    <Container size="md" padding={16}>
      <PageContent />
    </Container>
  ),
};

export const Large: Story = {
  render: () => (
    <Container size="lg" padding={16}>
      <PageContent />
    </Container>
  ),
};

export const XL: Story = {
  render: () => (
    <Container size="xl" padding={16}>
      <PageContent />
    </Container>
  ),
};

export const XXL: Story = {
  render: () => (
    <Container size="2xl" padding={16}>
      <PageContent />
    </Container>
  ),
};

export const Full: Story = {
  render: () => (
    <Container size="full" padding={16}>
      <PageContent />
    </Container>
  ),
};

export const Centered: Story = {
  render: () => (
    <Container size="md" padding={16} centered>
      <PageContent />
    </Container>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <Container fullWidth padding={16}>
      <PageContent />
    </Container>
  ),
};

export const CustomPadding: Story = {
  render: () => (
    <Container size="md" padding={100}>
      <PageContent />
    </Container>
  ),
};
