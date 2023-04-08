import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getRole } from "../role";
import { getToken } from "../token.util";

export function useCheckPermission() {
  const [hidden, setHidden] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    const role = getRole();
    const token = getToken();
    if (!token || !role) {
      router.push("/login");
    } else {
      setHidden(false);

      if (!pathname || !pathname.includes(role)) {
        router.push("/" + role);
      }
    }
  }, [pathname, router]);
  return hidden;
}
