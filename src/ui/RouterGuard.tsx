"use client";

import { useCheckPermission } from "@/utils/hooks/useCheckPermission";
import clsx from "clsx";

export default function RouterGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const hidden = useCheckPermission();
  return (
    <div className={clsx({ hidden: hidden, block: !hidden })}>{children}</div>
  );
}
