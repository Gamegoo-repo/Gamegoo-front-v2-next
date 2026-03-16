export const radius = {
  6: "6px",
  8: "8px",
  10: "10px",
  12: "12px",
  20: "20px",
  full: "9999px",
} as const;
export type RadiusKey = keyof typeof radius;
