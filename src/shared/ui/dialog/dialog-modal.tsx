"use client";

import { EllipsisVertical, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { cn } from "@/shared/libs/cn";
import { toastMessage } from "@/shared/model";
import { AlertModal } from "@/shared/ui/alert-dialog";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/shared/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/shared/ui/dropdown-menu";

import { BoardDetailModalViewType } from "@/entities/board";
import { ProfileIcon } from "@/entities/profile";

import { ReportModal } from "@/features/board";
import { useBlockUserMutation, useFriendRequestMutation } from "@/features/profile";

type DialogModalProps = {
  open: boolean;
  onOpenChange: () => void;
  description: string;
  imgNum: number;
  name: string;
  tag: string;
  memberId?: number;
  boardId?: number;
  myMemberId?: number;
  friendRequestMemberId?: number;
  blocked?: boolean;
  items: {
    id: string;
    viewType?: BoardDetailModalViewType["id"];
    isPost?: boolean;
    content: React.ReactNode;
  }[];
  nav?: React.ReactNode;
  submit: React.ReactNode;
  activeProfileDropdown?: boolean;
  routeBack?: boolean;
  disableInteractOutside?: boolean;
};

export function DialogModal({
  open,
  onOpenChange,
  description,
  imgNum,
  name,
  tag,
  memberId,
  boardId,
  myMemberId,
  friendRequestMemberId,
  blocked,
  items,
  nav,
  submit,
  activeProfileDropdown,
  routeBack = false,
  disableInteractOutside
}: DialogModalProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isBlockUserModalOpen, setIsBlockUserModalOpen] = useState(false);
  const [isUnBlockUserModalOpen, setIsUnBlockUserModalOpen] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const blockUser = useBlockUserMutation();

  useEffect(() => {
    if (!open && routeBack) {
      onOpenChange();
      router.back();
    }
  }, [open, router, routeBack, onOpenChange]);

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={onOpenChange}
      >
        <DialogContent
          className="flex max-h-[95dvh] min-w-xl flex-col rounded-2xl bg-gray-200"
          showCloseButton={false}
          onInteractOutside={(e) => {
            if (disableInteractOutside) e.preventDefault();
          }}
        >
          <DialogHeader>
            <div className="flex justify-between px-2">
              <header className="flex items-center gap-2">
                <ProfileIcon
                  size={64}
                  padding={8}
                  imgNum={imgNum}
                />

                {activeProfileDropdown ? (
                  <DropdownComp
                    name={name}
                    isDropdownOpen={isDropdownOpen}
                    setIsDropdownOpen={setIsDropdownOpen}
                    setIsReportModalOpen={setIsReportModalOpen}
                    setIsBlockUserModalOpen={setIsBlockUserModalOpen}
                    setIsUnblockUserModalOpen={setIsUnBlockUserModalOpen}
                    tag={tag}
                    blocked={blocked!}
                    memberId={memberId!}
                    myMemberId={myMemberId!}
                    friendRequestMemberId={friendRequestMemberId!}
                  >
                    <Button
                      className={cn(
                        `flex items-center gap-4 rounded-xl hover:bg-gray-300
focus-visible:ring-offset-gray-200`,
                        !activeProfileDropdown && "cursor-default hover:bg-transparent"
                      )}
                      variant="ghost"
                      onClick={() => {
                        if (!activeProfileDropdown) return;

                        setIsDropdownOpen(true);
                      }}
                    >
                      <h2 className="flex flex-col items-start">
                        <span className="text-xl font-bold">{name}</span>
                        <span className="text-gray-500">#{tag}</span>
                      </h2>

                      <EllipsisVertical />
                    </Button>
                  </DropdownComp>
                ) : (
                  <h2 className="flex flex-col items-start px-2">
                    <span className="text-xl font-bold">{name}</span>
                    <span className="text-gray-500">#{tag}</span>
                  </h2>
                )}
              </header>

              <DialogClose asChild>
                <Button
                  className="hover:bg-gray-300 focus-visible:ring-offset-gray-200"
                  variant="ghost"
                  size="icon"
                >
                  <X />
                </Button>
              </DialogClose>
            </div>

            <DialogTitle className="sr-only">{description}</DialogTitle>
            <DialogDescription className="sr-only">{description}</DialogDescription>
          </DialogHeader>

          {nav}
          <ul className="space-y-6 overflow-auto rounded-xl px-2">
            {items
              .filter(({ viewType, isPost }) => searchParams.get("viewType") === viewType || isPost)
              .map(({ id, content }) => {
                return <li key={id}>{content}</li>;
              })}
          </ul>
          {submit}
        </DialogContent>
      </Dialog>

      {/* 신고 */}
      <ReportModal
        name={name}
        isReportModalOpen={isReportModalOpen}
        setIsReportModalOpen={setIsReportModalOpen}
        memberId={memberId!}
        boardId={boardId!}
      />

      {/* 차단 */}
      <AlertModal
        open={isBlockUserModalOpen}
        onOpenChange={setIsBlockUserModalOpen}
        action={() => blockUser.mutate({ memberId: memberId!, type: "block" })}
        title="차단하시겠습니까?"
        description="차단한 상대에게는 메시지를 받을 수 없으며 매칭이 이루어지지 않습니다."
        actionLabel="차단"
      />

      {/* 차단 해제 */}
      <AlertModal
        open={isUnBlockUserModalOpen}
        onOpenChange={setIsUnBlockUserModalOpen}
        action={() => blockUser.mutate({ memberId: memberId!, type: "unblock" })}
        title="차단을 해제하시겠습니까?"
        description="차단 해제"
        descriptionSrOnly
        actionLabel="차단 해제"
      />
    </>
  );
}

type DropdownCompProps = {
  isDropdownOpen: boolean;
  setIsDropdownOpen: Dispatch<SetStateAction<boolean>>;
  setIsReportModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsBlockUserModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsUnblockUserModalOpen: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
  name: string;
  tag: string;
  blocked: boolean;
  memberId: number;
  myMemberId: number;
  friendRequestMemberId: number;
};

function DropdownComp({
  isDropdownOpen,
  setIsDropdownOpen,
  setIsReportModalOpen,
  setIsBlockUserModalOpen,
  setIsUnblockUserModalOpen,
  children,
  name,
  tag,
  blocked,
  memberId,
  myMemberId,
  friendRequestMemberId
}: DropdownCompProps) {
  const friendRequest = useFriendRequestMutation();

  return (
    <DropdownMenu
      open={isDropdownOpen}
      onOpenChange={setIsDropdownOpen}
    >
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        className="rounded-lg border border-gray-300 bg-white p-0 **:rounded-none **:font-medium"
        align="start"
        side="right"
      >
        <DropdownMenuGroup className="*:px-3 *:py-2 *:hover:bg-gray-200">
          <DropdownMenuItem
            className="a11y-focus-within-bg rounded-t-lg"
            onClick={() =>
              myMemberId === friendRequestMemberId
                ? friendRequest.mutate({ memberId, type: "cancel" })
                : friendRequest.mutate({ memberId, type: "request" })
            }
          >
            {myMemberId === friendRequestMemberId ? "친구 요청 취소" : "친구 추가"}
          </DropdownMenuItem>
          <DropdownMenuItem
            className="a11y-focus-within-bg"
            onClick={() => {
              navigator.clipboard.writeText(`${name}#${tag}`);

              toastMessage.success("소환사명이 복사되었습니다.");
            }}
          >
            소환사명 복사
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="my-0 border border-gray-200" />
        <DropdownMenuGroup className="*:px-3 *:py-2 *:hover:bg-gray-200">
          <DropdownMenuItem
            className="a11y-focus-within-bg"
            onClick={() => setIsReportModalOpen(true)}
          >
            신고하기
          </DropdownMenuItem>
          <DropdownMenuItem
            className="a11y-focus-within-bg rounded-b-lg"
            onClick={() =>
              blocked ? setIsUnblockUserModalOpen(true) : setIsBlockUserModalOpen(true)
            }
          >
            {blocked ? "차단 해제" : "차단하기"}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
