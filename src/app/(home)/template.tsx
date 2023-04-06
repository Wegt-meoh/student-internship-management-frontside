"use client";

import RouterGuard from "@/ui/RouterGuard";

//redirect to /teacher or /student
export default function Temp({ children }: { children: React.ReactNode }) {
  return <RouterGuard>{children}</RouterGuard>;
}
