"use client";

import { removeRole } from "@/utils/role";
import { removeToken } from "@/utils/token.util";

export default function Page() {
  function logout() {
    removeRole();
    removeToken();
    location.href = "/login";
  }
  return (
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
  );
}
