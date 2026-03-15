"use server";

import { revalidateTag } from "next/cache";

export const revalidateCacheTag = async (cacheKey: string) => {
  revalidateTag(cacheKey, "max");
};
