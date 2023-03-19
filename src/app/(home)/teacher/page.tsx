"use client";

import RouterGuard from "@/ui/RouterGuard";
import { useCheckPermission } from "@/utils/hooks";
import { removeRole } from "@/utils/role";
import { removeToken } from "@/utils/token.util";
import { useEffect } from "react";

export default function Page() {
  function logout() {
    removeRole();
    removeToken();
    location.href = "/login";
  }
  return (
    <RouterGuard>
      <div className="">
        <button
          type="button"
          onClick={logout}
          className="p-6 bg-blue-400 outline-none"
        >
          logout
        </button>
        teacher page
      </div>
    </RouterGuard>
  );
}
