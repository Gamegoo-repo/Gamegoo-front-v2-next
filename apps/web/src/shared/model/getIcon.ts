import { Position, Tier } from "../../features/board";
import { POSITION_ICONS, TIER_ICONS } from "../constants";

export const getPositionIcon = (position: Position) =>
  POSITION_ICONS[position as keyof typeof POSITION_ICONS];

export const getTierIcon = (tier: Tier) => TIER_ICONS[tier as keyof typeof TIER_ICONS];
