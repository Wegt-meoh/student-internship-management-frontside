"use client";

import { useCheckPermission } from "@/utils/hooks";
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
