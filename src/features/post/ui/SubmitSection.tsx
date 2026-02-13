import { cn } from "@/shared/libs/cn";
import { Button } from "@/shared/ui/button";

export function SubmitSection({ isValid }: { isValid: boolean }) {
  return (
    <Button
      className={cn("h-14 w-full bg-violet-400 text-white", isValid && "bg-violet-600")}
      type="submit"
      disabled={!isValid}
    >
      작성 완료
    </Button>
  );
}
