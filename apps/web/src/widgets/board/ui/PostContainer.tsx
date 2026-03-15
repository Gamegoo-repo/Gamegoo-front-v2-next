"use client";

import { Post } from "..";
import { usePostDetailQuery } from "../../../features/post";
import { useFetchProfileQuery } from "../../../features/profile";

export function PostContainer({ boardId }: { boardId?: string }) {
  const { data: userInfo } = useFetchProfileQuery();
  const { data: postData } = usePostDetailQuery(boardId);

  return (
    <Post
      boardId={boardId}
      postData={postData}
      userInfo={userInfo}
    />
  );
}
