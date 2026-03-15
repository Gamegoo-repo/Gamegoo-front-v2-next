"use client";

import { useFormContext } from "react-hook-form";

import { Textarea } from "@/shared/ui/textarea";

import { PostForm } from "@/entities/board";

export function Comment() {
  const { register, watch } = useFormContext<PostForm>();

  const comment = watch("comment") ?? "";

  return (
    <div className="space-y-1">
      <Textarea
        maxLength={80}
        {...register("comment", {
          required: true,
          maxLength: 80
        })}
        className="a11y-focus-within max-h-[90px]! w-full border border-gray-300 bg-white py-2
outline-none"
      />

      <div className="flex justify-between pl-1">
        <p className="medium-11 text-gray-500">{comment.length} / 80</p>
      </div>
    </div>
  );
}
