import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

type SharedProps = {
  className?: string;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  children: ReactNode;
};

type ButtonProps = SharedProps & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ className, variant = "primary", children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-ink-300 disabled:cursor-not-allowed disabled:opacity-50",
        variant === "primary" && "bg-ink-900 text-white hover:bg-ink-800",
        variant === "secondary" && "bg-white text-ink-900 ring-1 ring-inset ring-border hover:bg-ink-50",
        variant === "ghost" && "text-ink-700 hover:bg-white/70",
        variant === "danger" && "bg-rose text-white hover:opacity-90",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  className,
  variant = "primary",
  children,
  ...props
}: SharedProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className={cn(
        "inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium transition",
        variant === "primary" && "bg-ink-900 text-white hover:bg-ink-800",
        variant === "secondary" && "bg-white text-ink-900 ring-1 ring-inset ring-border hover:bg-ink-50",
        variant === "ghost" && "text-ink-700 hover:bg-white/70",
        variant === "danger" && "bg-rose text-white hover:opacity-90",
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}
