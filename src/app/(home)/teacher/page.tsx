"use client";

import { removeRole } from "@/utils/role";
import { removeToken } from "@/utils/token.util";
import { redirect } from "next/navigation";

export default function Page() {
  function logout() {
    removeRole();
    removeToken();
    location.href = "/login";
    // redirect("/login");
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
