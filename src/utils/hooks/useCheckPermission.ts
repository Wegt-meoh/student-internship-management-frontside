import { redirect, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getRole } from "../role";
import { getToken } from "../token.util";

export function useCheckPermission() {
  console.log("check permission");
  const [hidden, setHidden] = useState(true);
  const pathname = usePathname();
  useEffect(() => {
    const role = getRole();
    const token = getToken();
    if (!token || !role) {
      redirect("/login");
    }

    setHidden(false);
  }, [pathname]);
  return hidden;
}
