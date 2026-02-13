"use client";

import { X } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { REPORT_ITEMS } from "@/shared/constants/reportItems";
import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/shared/ui/dialog";
import { Textarea } from "@/shared/ui/textarea";

import { useReportMutation } from "@/features/profile";

type ReportModalProps = {
  isReportModalOpen: boolean;
  setIsReportModalOpen: Dispatch<SetStateAction<boolean>>;
  name: string;
  memberId: number;
  boardId: number;
};

export function ReportModal({
  isReportModalOpen,
  setIsReportModalOpen,
  name,
  memberId,
  boardId
}: ReportModalProps) {
  const [reportCodeList, setReportCodeList] = useState<number[]>([]);
  const [reportContent, setReportContent] = useState("");

  const report = useReportMutation();

  useEffect(() => {
    return () => {
      setReportCodeList([]);
    };
  }, [isReportModalOpen]);

  return (
    <Dialog
      open={isReportModalOpen}
      onOpenChange={setIsReportModalOpen}
    >
      <DialogContent
        className="max-h-[90vh] overflow-y-scroll rounded-2xl bg-gray-200"
        showCloseButton={false}
      >
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="bold-20">[{name}] 유저 신고하기</DialogTitle>
            <DialogClose asChild>
              <Button
                className="hover:bg-gray-300"
                variant="ghost"
                size="icon"
              >
                <X />
              </Button>
            </DialogClose>
          </div>
          <DialogDescription className="sr-only">유저 신고</DialogDescription>
        </DialogHeader>

        <div className="space-y-8">
          <div className="space-y-3">
            <p className="semibold-18">신고 사유</p>

            <ul className="space-y-[21px]">
              {REPORT_ITEMS.map((v, i) => {
                return (
                  <li
                    key={v}
                    className="flex cursor-pointer items-center gap-2 *:cursor-pointer"
                  >
                    <Checkbox
                      id={v}
                      className="bg-white"
                      onCheckedChange={(isSelected: boolean) => {
                        setReportCodeList((prev: number[]) =>
                          isSelected ? [...prev, i] : prev.filter((item) => item !== i)
                        );
                      }}
                      checked={reportCodeList.includes(i)}
                    />
                    <label
                      className="regular-18"
                      htmlFor={v}
                    >
                      {v}
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="space-y-3">
            <p className="semibold-18">상세 내용</p>
            <div>
              <Textarea
                className="a11y-focus-within h-20 border border-gray-300 bg-white"
                onChange={(e) => setReportContent(e.target.value)}
                placeholder="내용을 입력하세요. (선택)"
              />
            </div>
          </div>

          <DialogClose asChild>
            <Button
              className="h-16 w-full rounded-xl"
              disabled={reportCodeList.length === 0}
              onClick={() => {
                report.mutate({
                  memberId: memberId,
                  reportCodeList,
                  pathCode: 1,
                  contents: reportContent,
                  boardId: boardId
                });

                setReportCodeList([]);
              }}
            >
              신고하기
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
