import { type HTMLAttributes } from "react";
import { cn } from "../lib/cn";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur-sm",
        className,
      )}
      {...props}
    />
  );
}
