import { cn } from "@/shared/libs/cn";

type OuterBoxProps = {
  label: string | React.ReactNode;
  children: React.ReactNode;
  className?: string;
  sectionClassName?: string;
};

export function OuterBox({ label, children, className, sectionClassName }: OuterBoxProps) {
  return (
    <section className={cn("flex flex-1 flex-col gap-1", sectionClassName)}>
      <h3 className="semibold-14 pl-1">{label}</h3>

      <div className={cn("flex flex-1 gap-4 *:flex-1", className)}>{children}</div>
    </section>
  );
}
