"use client";

import { RoleEnum } from "@/constants/RoleEnum";
import { UserInfoContext } from "@/context/user-info.context";
import { RouterGuardType } from "@/types/router-guard";
import { notFound, redirect, usePathname } from "next/navigation";
import { useContext } from "react";

export default function RouterGuard({
  rules,
  children,
}: {
  rules: RouterGuardType;
  children: React.ReactNode;
}) {
  const userInfo = useContext(UserInfoContext);
  const pathName = usePathname();
  if (!pathName) {
    alert("pathName is not ready");
    return null;
  }
  if (!userInfo) {
    redirect("/login");
  }

  const { role: userRole } = userInfo;

  switch (judge(rules, pathName, userRole)) {
    case Result.ACCESS: {
      return <>{children}</>;
    }
    case Result.FORBBIDEN: {
      return <>403 Forbbiden</>;
    }
    case Result.NOTFOUND: {
      notFound();
    }
  }
}

enum Result {
  ACCESS,
  FORBBIDEN,
  NOTFOUND,
}

function judge(
  rules: RouterGuardType,
  pathname: string,
  userRole: RoleEnum
): Result {
  for (let rule of rules) {
    if (pathname.indexOf(rule.path) !== 0) continue;
    if (pathname === rule.path) {
      if (rule.role === RoleEnum.EVERYONE || rule.role === userRole) {
        return Result.ACCESS;
      }
      return Result.FORBBIDEN;
    }
    if (!rule.children) {
      return Result.NOTFOUND;
    }
    return judge(rule.children, pathname.replace(rule.path, ""), userRole);
  }
  return Result.NOTFOUND;
}
