import { paths } from "@/shared/api/schema";

export type FriendList = NonNullable<
  paths["/api/v2/friend"]["get"]["responses"]["200"]["content"]["*/*"]["data"]
>["friendInfoList"];

export type OtherProfile = NonNullable<
  paths["/api/v2/profile/other"]["get"]["responses"]["200"]["content"]["*/*"]["data"]
>;
