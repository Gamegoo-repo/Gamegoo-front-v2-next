import { format } from "date-fns";

export const createdAtFormat = (createdAt: string) => {
  if (!createdAt) return;

  const d = new Date(createdAt);

  return format(d, "yy.MM.dd HH:mm");
};
