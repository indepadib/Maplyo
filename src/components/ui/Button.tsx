import * as React from "react";
import { cn } from "@/lib/cn";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
};

export function Button({ className, variant = "primary", size = "md", ...props }: Props) {
  const v =
    variant === "primary"
      ? "bg-black text-white hover:bg-black/90"
      : variant === "secondary"
        ? "bg-zinc-100 text-zinc-900 hover:bg-zinc-200"
        : variant === "outline"
          ? "border-2 border-zinc-200 bg-transparent hover:bg-zinc-50 text-zinc-900"
          : "bg-transparent hover:bg-zinc-100";
  const s = size === "sm" ? "h-9 px-3 text-sm" : size === "lg" ? "h-12 px-5" : "h-10 px-4";
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-xl font-medium transition focus:outline-none focus:ring-2 focus:ring-black/20 disabled:opacity-50 disabled:pointer-events-none",
        v, s, className
      )}
      {...props}
    />
  );
}
