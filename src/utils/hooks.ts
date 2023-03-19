import { redirect, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getRole } from "./role";
import { getToken } from "./token.util";

export function useCheckPermission() {
  const [hidden, setHidden] = useState(true);
  const pathname = usePathname();
  useEffect(() => {
    const role = getRole();
    const token = getToken();
    if (!token) {
      redirect("/login");
    }
    switch (role) {
      case "teacher":
      case "student": {
        if (pathname.slice(1).indexOf(role) !== 0) {
          redirect("/teacher");
        }
        break;
      }
      default: {
        redirect("/login");
      }
    }
    setHidden(false);
  });

  return hidden;
}
