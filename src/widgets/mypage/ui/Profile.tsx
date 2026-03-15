"use client";

import { TIER_ICONS } from "@/shared/constants";
import { characters } from "@/shared/model";

import {
  ProfileNameAndTag,
  Rank,
  SelectGameStyleButton,
  ToggleMicButton,
  useFetchMyProfileQuery
} from "@/features/profile";

export function Profile() {
  const { data: userInfo } = useFetchMyProfileQuery();

  if (!userInfo) return null;

  const ProfileIcon = characters[userInfo.profileImg - 1];
  const SoloTierIcon = TIER_ICONS[userInfo.soloTier as keyof typeof TIER_ICONS];
  const FreeTierIcon = TIER_ICONS[userInfo.freeTier as keyof typeof TIER_ICONS];

  return (
    <div
      key={userInfo.id}
      className="flex gap-4 bg-gray-100 p-4"
    >
      <div className="h-fit w-fit rounded-full bg-violet-200 p-6">
        <ProfileIcon className="h-32 w-32" />
      </div>

      <div className="flex-1">
        <ProfileNameAndTag
          gameName={userInfo.gameName}
          tag={userInfo.tag}
        />

        <div className="mt-6 flex gap-8">
          <Rank
            Icon={SoloTierIcon}
            soloTier={userInfo.soloTier}
            soloRank={userInfo.soloRank}
          />

          <Rank
            Icon={FreeTierIcon}
            soloTier={userInfo.freeTier}
            soloRank={userInfo.freeRank}
          />
        </div>

        <hr className="my-8 w-full border-gray-500" />

        <div className="space-y-4">
          <p>게임 스타일</p>
          <SelectGameStyleButton />
        </div>

        <div className="mt-8 flex space-x-4">
          <p>마이크</p>
          <ToggleMicButton />
        </div>
      </div>
    </div>
  );
}
