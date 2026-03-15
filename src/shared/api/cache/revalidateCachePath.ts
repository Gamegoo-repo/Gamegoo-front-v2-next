"use server";

import { revalidatePath } from "next/cache";

export const revalidatePathTag = async (path: string) => {
  revalidatePath(path);
};
