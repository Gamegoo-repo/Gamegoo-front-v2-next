import React from "react";
type FeatureTableProps = {
  basics: string[];
  additionals?: string[];
  postponed?: string[];
};

export const FeatureTable = ({
  basics,
  additionals,
  postponed,
}: FeatureTableProps) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid #e5e7eb", // Tailwind's default border color
        borderRadius: "4px",
        marginBottom: "24px",
      }}
    >
      <div
        style={{
          borderBottom: additionals?.length ? "1px solid #e5e7eb" : undefined,
          display: "flex",
        }}
      >
        <CategoryTitle title="Basic" />
        <FeatureList features={basics} />
      </div>
      {additionals?.length && (
        <div
          style={{
            borderBottom: postponed?.length ? "1px solid #e5e7eb" : undefined,
            display: "flex",
          }}
        >
          <CategoryTitle title="Additional" />
          <FeatureList features={additionals} />
        </div>
      )}
      {postponed?.length && (
        <div style={{ display: "flex" }}>
          <CategoryTitle
            title="Postponed"
            style={{ color: "rgb(46, 32, 54)" }}
          />
          <FeatureList features={postponed} />
        </div>
      )}
    </div>
  );
};

const CategoryTitle = ({
  title,
  style,
}: {
  title: string;
  style?: React.CSSProperties;
}) => {
  return (
    <div
      style={{
        width: "200px",
        fontSize: "15px",
        fontWeight: "700",
        color: "black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
    >
      {title}
    </div>
  );
};

const FeatureList = ({ features }: { features: string[] }) => {
  return (
    <ul
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "20px 28px",
        listStyleType: "none",
        margin: 0,
      }}
    >
      {features.map((feature, i) => (
        <li
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "13px",
          }}
          key={i}
        >
          <span
            style={{
              width: "4px",
              height: "4px",
              backgroundColor: "black",
              borderRadius: "100%",
              marginRight: "8px",
            }}
          ></span>
          {feature}
        </li>
      ))}
    </ul>
  );
};
