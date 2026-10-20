import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "ghost" | "inverse";
type Size = "md" | "lg" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 rounded-btn font-semibold transition-colors duration-150 text-center leading-snug sm:whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-70";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-white hover:bg-brand-700 active:bg-brand-700",
  secondary: "border border-neutral-300 bg-white text-ink hover:border-neutral-400 hover:bg-neutral-50",
  ghost: "text-brand hover:text-brand-700 hover:bg-brand-50",
  inverse: "border border-white/30 bg-transparent text-white hover:bg-white/10",
};

const sizes: Record<Size, string> = {
  sm: "min-h-9 px-3.5 py-1.5 text-sm",
  md: "min-h-11 px-5 py-2 text-[15px]",
  lg: "min-h-12 px-6 py-2.5 text-base",
};

export function buttonClass(variant: Variant = "primary", size: Size = "md", className = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`;
}

type LinkButtonProps = {
  href: string;
  variant?: Variant;
  size?: Size;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
} & Omit<ComponentProps<"a">, "href">;

/** Renders next/link for internal routes, a plain <a> for external, hash, tel and mailto links. */
export function LinkButton({ href, variant = "primary", size = "md", external, className = "", children, ...rest }: LinkButtonProps) {
  const cls = buttonClass(variant, size, className);
  const isPlain = external || /^(https?:|tel:|mailto:|#)/.test(href);
  if (isPlain) {
    return (
      <a href={href} className={cls} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...rest
}: { variant?: Variant; size?: Size } & ComponentProps<"button">) {
  return <button className={buttonClass(variant, size, className)} {...rest} />;
}
