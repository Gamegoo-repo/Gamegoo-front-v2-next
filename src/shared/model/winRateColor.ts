export const winRateColor = (winRate: number, type: "text" | "bg") => {
  if (winRate < 50) return type === "text" ? "text-gray-700" : "bg-gray-700";
  if (winRate >= 50 && winRate < 70) return type === "text" ? "text-violet-600" : "bg-violet-600";
  if (winRate >= 70) return type === "text" ? "text-[#CB1FCF]" : "bg-[#CB1FCF]";
};
