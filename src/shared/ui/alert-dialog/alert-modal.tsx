"use client";

import { Dispatch, SetStateAction } from "react";

import { cn } from "@/shared/libs/cn";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/shared/ui/alert-dialog";
import { Button } from "@/shared/ui/button";

type AlertModalProps = {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  action: () => void;
  title: string;
  description: string;
  descriptionSrOnly?: boolean;
  actionLabel: string;
  cancelLabel?: string;
};

export function AlertModal({
  open,
  onOpenChange,
  action,
  title,
  description,
  descriptionSrOnly,
  actionLabel,
  cancelLabel
}: AlertModalProps) {
  return (
    <AlertDialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <AlertDialogContent className="rounded-2xl bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold">{title}</AlertDialogTitle>
          <AlertDialogDescription
            className={cn("text-base", "font-medium", descriptionSrOnly && "sr-only")}
          >
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction asChild>
            <AlertModalButton
              onOpenChange={onOpenChange}
              label={actionLabel}
              action={action}
            />
          </AlertDialogAction>
          <AlertDialogCancel asChild>
            <AlertModalButton
              onOpenChange={onOpenChange}
              label={cancelLabel ?? "취소"}
            />
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

type AlertModalButtonProps = {
  label: string;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  action?: () => void;
};

function AlertModalButton({ label, onOpenChange, action }: AlertModalButtonProps) {
  return (
    <Button
      className="px-6 py-2"
      variant={action ? "default" : "ghost"}
      onClick={() => {
        if (action) action();

        onOpenChange(false);
      }}
    >
      {label}
    </Button>
  );
}
