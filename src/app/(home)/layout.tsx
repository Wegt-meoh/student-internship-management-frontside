"use client";

import { requestUserInfo } from "@/api/user/user-info";
import { RoleEnum } from "@/constants/RoleEnum";
import {
  ClearUserInfoContext,
  UserInfoContext,
} from "@/context/user-info.context";
import { UserInfoResponseType } from "@/types/user/info";
import RouterGuard from "@/ui/RouterGuard";
import { getToken } from "@/utils/token.util";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomeEntry({ children }: { children: React.ReactNode }) {
  const [userInfo, setUserInfo] = useState<UserInfoResponseType | null>(null);

  useEffect(() => {
    if (!getToken()) {
      redirect("/login");
    }

    // fetch user info and save into context
    requestUserInfo().then((res) => {
      setUserInfo(res);
    });
  }, []);

  if (!userInfo) return null;

  return (
    <UserInfoContext.Provider value={userInfo}>
      <ClearUserInfoContext.Provider
        value={() => {
          setUserInfo(null);
        }}
      >
        <RouterGuard
          rules={[
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
          ]}
        >
          {children}
        </RouterGuard>
      </ClearUserInfoContext.Provider>
    </UserInfoContext.Provider>
  );
}
