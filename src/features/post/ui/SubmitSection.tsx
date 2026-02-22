"use client";

import { cn } from "@/shared/libs/cn";
import { useModalStore } from "@/shared/store";
import { Button } from "@/shared/ui/button";

type SubmitSectionProps = {
  isValid: boolean;
  isEdit: boolean;
  formId: string;
};

export function SubmitSection({ isValid, isEdit, formId }: SubmitSectionProps) {
  const togglePostModal = useModalStore((s) => s.togglePostModal);
  const toggleEditModal = useModalStore((s) => s.toggleEditModal);

  return (
    <Button
      className={cn("h-14 w-full bg-violet-400 text-white", isValid && "bg-violet-600")}
      type="submit"
      form={formId}
      disabled={!isValid}
      onClick={() => (isEdit ? toggleEditModal() : togglePostModal())}
    >
      작성 완료
    </Button>
  );
}
