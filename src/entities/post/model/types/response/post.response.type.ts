import { paths } from "@/shared/api/schema";

export type PostDetail = NonNullable<
  paths["/api/v2/posts/list/{boardId}"]["get"]["responses"]["200"]["content"]["*/*"]["data"]
>;
export type PostList = NonNullable<
  paths["/api/v2/posts/list"]["get"]["responses"]["200"]["content"]["*/*"]["data"]
>["boards"];
export type PostData = NonNullable<
  paths["/api/v2/posts/list"]["get"]["responses"]["200"]["content"]["*/*"]["data"]
>;
