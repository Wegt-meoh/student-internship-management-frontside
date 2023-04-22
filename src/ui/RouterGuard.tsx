"use client";

import { RoleEnum } from "@/constants/RoleEnum";
import { UserInfoContext } from "@/context/user-info.context";
import { RouterGuardType } from "@/types/router-guard";
import { notFound, usePathname } from "next/navigation";
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

  if (!pathName || !userInfo) {
    return null;
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
    if (rule.path.indexOf("/*") === 0) {
      return checkPermission(rule.role, userRole)
        ? Result.ACCESS
        : Result.FORBBIDEN;
    }

    if (pathname.indexOf(rule.path) !== 0) continue;
    if (pathname === rule.path) {
      return checkPermission(rule.role, userRole)
        ? Result.ACCESS
        : Result.FORBBIDEN;
    }
    if (!rule.children) {
      return Result.NOTFOUND;
    }
    return judge(rule.children, pathname.replace(rule.path, ""), userRole);
  }
  return Result.NOTFOUND;
}

function checkPermission(ruleRole: RoleEnum, userRole: RoleEnum): boolean {
  if (ruleRole === RoleEnum.EVERYONE) {
    return true;
  }
  return ruleRole === userRole;
}
