import { paths } from "@/shared/api/schema";

import { BOARD_TABS } from "@/entities/board";
import { MANNER_KEYWORDS } from "@/entities/post";

export type PostDetail = NonNullable<
  paths["/api/v2/posts/list/{boardId}"]["get"]["responses"]["200"]["content"]["*/*"]["data"]
>;

export type MainPosition = NonNullable<PostDetail>["mainP"];
export type SubPosition = NonNullable<PostDetail>["subP"];
export type GameMode = NonNullable<PostDetail>["gameMode"];
export type Mic = NonNullable<PostDetail>["mike"];
export type Tier = NonNullable<PostDetail>["soloTier"];
export type Position = NonNullable<PostDetail>["mainP"];

type MannerLevel = NonNullable<
  paths["/api/v2/manner/level/{memberId}"]["get"]["responses"]["200"]["content"]["*/*"]["data"]
>;
type MannerKeywords = NonNullable<
  paths["/api/v2/manner/keyword/{memberId}"]["get"]["responses"]["200"]["content"]["*/*"]["data"]
>;

export type MannerData = MannerLevel & MannerKeywords;

export type ChampionStatsResponseList = NonNullable<PostDetail>["championStatsResponseList"];
export type MemberRecentStats = NonNullable<PostDetail>["memberRecentStats"];
export type BoardDetailModalViewType = (typeof BOARD_TABS)[number];
export type RecentData = NonNullable<PostDetail>["memberRecentStats"];

export type MannerKeywordsGood = (typeof MANNER_KEYWORDS.GOOD)[number];
export type MannerKeywordsBad = (typeof MANNER_KEYWORDS.BAD)[number];
