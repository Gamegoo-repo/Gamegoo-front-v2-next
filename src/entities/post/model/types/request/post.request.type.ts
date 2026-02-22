import { GameMode, Mic, Position, Tier } from "@/entities/post";

export type RequestPostLists = {
  page: number;
  gameMode?: GameMode;
  tier?: Tier;
  mainP?: Position;
  subP?: Position;
  mike?: Mic;
};
