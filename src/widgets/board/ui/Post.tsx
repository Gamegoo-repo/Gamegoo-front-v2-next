"use client";

import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { useModalStore } from "@/shared/store";
import { DialogModal } from "@/shared/ui/dialog";

import { UserInfo } from "@/entities/auth";

import { BoardData, type PostForm } from "@/features/board";
import {
  CommentSection,
  GameStyleSection,
  MicSection,
  PositionSection,
  PreferredGameModeSection,
  SubmitSection,
  useEditPostMutation,
  usePostMutation
} from "@/features/post";

type PostProps = {
  boardId?: string;
  postData: BoardData;
  userInfo: UserInfo;
};

export function Post({ boardId, postData, userInfo }: PostProps) {
  const editPost = useEditPostMutation();
  const post = usePostMutation();

  const open = useModalStore((s) => s.isPostModalOpen);
  const onOpenChange = useModalStore((s) => s.togglePostModal);

  const methods = useForm<PostForm>({
    mode: "onChange",
    defaultValues: {
      mainPosition: postData?.mainP ?? undefined,
      subPosition: postData?.subP ?? undefined,
      wantMainPosition: postData?.wantP[0] ?? undefined,
      wantSubPosition: postData?.wantP[1] ?? undefined,
      gameMode: postData?.gameMode ?? "FAST",
      gameStyles: postData?.gameStyles ?? [],
      mic: postData?.mike ?? "UNAVAILABLE",
      comment: postData?.contents ?? ""
    }
  });

  const {
    handleSubmit,
    formState: { isValid },
    reset
  } = methods;

  // postData가 있으면 form 업데이트
  useEffect(() => {
    if (postData) {
      reset({
        mainPosition: postData.mainP,
        subPosition: postData.subP,
        wantMainPosition: postData.wantP[0],
        wantSubPosition: postData.wantP[1],
        gameMode: postData.gameMode,
        gameStyles: postData.gameStyles,
        mic: postData.mike,
        comment: postData.contents
      });
    }
  }, [postData, reset]);

  const handleOnSubmit = async (data: PostForm) => {
    const body = {
      mainP: data.mainPosition!,
      subP: data.subPosition!,
      wantP: [data.wantMainPosition!, data.wantSubPosition!],
      gameMode: data.gameMode,
      gameStyles: data.gameStyles,
      mike: data.mic,
      contents: data.comment
    };

    // -> 글을 수정할 때
    if (postData) {
      editPost.mutate({ body, boardId: Number(boardId!) });
      return;
    }

    // -> 글을 작성할 때
    post.mutate({ body });
  };

  if (!userInfo) return null;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <DialogModal
          name={userInfo.gameName}
          open={open}
          onOpenChange={onOpenChange}
          description="글 작성"
          imgNum={userInfo.profileImg}
          tag={userInfo.tag}
          routeBack
          disableInteractOutside
          submit={<SubmitSection isValid={isValid} />}
          items={[
            {
              id: "position",
              isPost: true,
              content: <PositionSection methods={methods} />
            },
            {
              id: "preferredGameMode",
              isPost: true,
              content: <PreferredGameModeSection />
            },
            {
              id: "gameStyle",
              isPost: true,
              content: <GameStyleSection methods={methods} />
            },
            {
              id: "mic",
              isPost: true,
              content: <MicSection />
            },
            {
              id: "comment",
              isPost: true,
              content: <CommentSection />
            }
          ]}
        />
      </form>
    </FormProvider>
  );
}
