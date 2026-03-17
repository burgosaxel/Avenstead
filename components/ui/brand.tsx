import Image from "next/image";

import { cn } from "@/lib/utils/cn";

export function BrandLogo({
  className,
  priority = false
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/branding/avenstead-logo.png"
      alt="Avenstead"
      width={512}
      height={212}
      priority={priority}
      className={cn("h-auto w-56", className)}
    />
  );
}

export function BrandName({
  className,
  priority = false
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/branding/avenstead-name.png"
      alt="Avenstead"
      width={512}
      height={115}
      priority={priority}
      className={cn("h-auto w-40", className)}
    />
  );
}

export function BrandMark({
  className,
  priority = false
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/branding/avenstead-mark.png"
      alt="Avenstead mark"
      width={512}
      height={512}
      priority={priority}
      className={cn("h-auto w-12", className)}
    />
  );
}
