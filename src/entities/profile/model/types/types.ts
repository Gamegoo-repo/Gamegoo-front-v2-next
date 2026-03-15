import { paths } from "@/shared/api/schema";

export type MyProfile = NonNullable<
  paths["/api/v2/profile"]["get"]["responses"]["200"]["content"]["*/*"]["data"]
>;
export type OtherProfile = NonNullable<
  paths["/api/v2/profile/other"]["get"]["responses"]["200"]["content"]["*/*"]["data"]
>;
