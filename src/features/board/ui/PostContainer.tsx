"use client";

import { useModalStore } from "@/shared/store";
import { Button } from "@/shared/ui/button";

import { useAuthStore } from "@/features/auth";
import { Post } from "@/features/post";
import { useFetchMyProfileQuery } from "@/features/profile";

export function PostContainer() {
  const setIsOpenLoginRequiredModal = useAuthStore((s) => s.setIsOpenLoginRequiredModal);
  const authStatus = useAuthStore((s) => s.authStatus);

  const isPostModalOpen = useModalStore((s) => s.isPostModalOpen);
  const togglePostModal = useModalStore((s) => s.togglePostModal);

  const { data: myProfile } = useFetchMyProfileQuery();

  return (
    <div>
      <div className="shrink-0">
        <Button
          className="bold-14 h-14 w-60 rounded-xl"
          onClick={() => {
            if (authStatus !== "authenticated") {
              setIsOpenLoginRequiredModal(true);

              return;
            }

            togglePostModal();
          }}
        >
          글 작성하기
        </Button>
      </div>

      <Post
        open={isPostModalOpen}
        onOpenChange={togglePostModal}
        userInfo={myProfile!}
      />
    </div>
  );
}
