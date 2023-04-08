"use client";

import { useCheckPermission } from "@/utils/hooks/useCheckPermission";
import clsx from "clsx";

export default function RouterGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const hidden = useCheckPermission();

  if (hidden) {
    return null;
  }
  return <>{children}</>;
}
