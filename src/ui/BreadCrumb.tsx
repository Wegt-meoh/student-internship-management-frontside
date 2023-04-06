"use client";

import { usePathname } from "next/navigation";

export default function BreadCrumb() {
  const pathname = usePathname();
  return <div>{pathname}</div>;
}
