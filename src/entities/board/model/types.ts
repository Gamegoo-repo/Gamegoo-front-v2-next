import { paths } from "@/shared/api/schema";

import {
  BOARD_DETAIL_MODAL_VIEW_TYPE,
  MANNER_KEYWORDS_BAD,
  MANNER_KEYWORDS_GOOD
} from "@/entities/board";

type Base =
  paths["/api/v2/posts/list/{boardId}"]["get"]["responses"]["200"]["content"]["*/*"]["data"];

export type ChampionStatsResponseList = NonNullable<Base>["championStatsResponseList"];
export type MemberRecentStats = NonNullable<Base>["memberRecentStats"];
export type BoardDetailModalViewType = (typeof BOARD_DETAIL_MODAL_VIEW_TYPE)[number];
export type RecentData = NonNullable<Base>["memberRecentStats"];

export type MannerKeywordsGood = (typeof MANNER_KEYWORDS_GOOD)[number];
export type MannerKeywordsBad = (typeof MANNER_KEYWORDS_BAD)[number];
