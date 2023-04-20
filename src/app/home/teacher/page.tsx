"use client";

import { removeRole } from "@/utils/role";
import { removeToken } from "@/utils/token.util";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  function logout() {
    removeRole();
    removeToken();
    router.replace("/login");
  }
  return (
    <div>
      <button
        type="button"
        onClick={logout}
        className="p-6 bg-blue-400 outline-none"
      >
        logout
      </button>
      teacher page
    </div>
  );
}
