import { cn } from "@/shared/libs/cn";

type InnerBoxProps = {
  children: React.ReactNode;
  className?: string;
};

export function InnerBox({ children, className }: InnerBoxProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-1 rounded-xl border border-gray-300 bg-white p-4",
        className
      )}
    >
      {children}
    </div>
  );
}
