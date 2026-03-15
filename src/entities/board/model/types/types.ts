import { BOARD_TABS } from "@/entities/board/constants/ui/boardTabs";
import { GameMode, MainPosition, Mic, Position, SubPosition, Tier } from "@/entities/post";

export type PostForm = {
  mainPosition: MainPosition;
  subPosition: SubPosition;
  wantMainPosition: MainPosition | undefined;
  wantSubPosition: SubPosition | undefined;
  gameMode: GameMode;
  gameStyles: number[];
  mic: Mic;
  comment: string;
};

export type PostBody = {
  gameMode: GameMode;
  mainP: MainPosition;
  subP: SubPosition;
  wantP: MainPosition[];
  mike?: Mic | undefined;
  gameStyles?: number[] | undefined;
  contents?: string | undefined;
};

export type SearchParams = {
  page: string;
  mode?: GameMode;
  tier?: Tier;
  voice?: Mic;
  position?: Position;
};

export type BoardTabs = (typeof BOARD_TABS)[number]["id"];
