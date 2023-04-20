"use client";

import { requestUserInfo } from "@/api/user-info";
import { RoleEnum } from "@/constants/RoleEnum";
import { UserInfoContext } from "@/context/user-info.context";
import { UserInfoResponseType } from "@/types/user/info";
import RouterGuard from "@/ui/RouterGuard";
import { getToken } from "@/utils/token.util";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomeEntry({ children }: { children: React.ReactNode }) {
  const [userInfoReady, setUserInfoReady] = useState(false);
  const [useInfo, setUserInfo] = useState<UserInfoResponseType | null>(null);

  useEffect(() => {
    if (!getToken()) {
      redirect("/login");
    }

    // get user info and save into context
    requestUserInfo().then((res) => {
      setUserInfo(res);
      setUserInfoReady(true);
    });
  }, []);

  if (!userInfoReady) return null;

  return (
    <UserInfoContext.Provider value={useInfo}>
      <RouterGuard
        rules={[
          {
            path: "/home",
            role: RoleEnum.EVERYONE,
            children: [
              {
                path: "/student",
                role: RoleEnum.STUDENT,
                children: [{ path: "/*", role: RoleEnum.STUDENT }],
              },
              {
                path: "/teacher",
                role: RoleEnum.TEACHER,
                children: [{ path: "/*", role: RoleEnum.TEACHER }],
              },
            ],
          },
        ]}
      >
        {children}
      </RouterGuard>
    </UserInfoContext.Provider>
  );
}
