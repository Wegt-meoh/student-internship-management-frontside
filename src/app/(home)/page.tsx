"use client";

import { redirect } from "next/navigation";
import { getRole } from "@/utils/role";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    const role = getRole();
    switch (role) {
      case "teacher": {
        redirect("/teacher");
      }
      case "student": {
        redirect("student");
      }

      default: {
        redirect("/login");
      }
    }
  });
}
