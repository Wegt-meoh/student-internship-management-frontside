"use client";

import { useUserInfo } from "@/hooks/useUserInfo";
import { removeToken } from "@/utils/token.util";
import { Button } from "antd";
import { useRouter } from "next/navigation";

export default function Page() {
  const [userInfo, clearUserInfo] = useUserInfo();
  const router = useRouter();

  function logout() {
    removeToken();
    if (clearUserInfo) clearUserInfo();
    router.replace("/login");
  }

  if (!userInfo) return null;

  return (
    <div className="bg-white p-2">
      <h1 className=" text-xl relative">
        <span
          className=" w-1 h-6 bg-slate-800 inline-block
         relative top-1"
        ></span>
        <span> 个人信息</span>
      </h1>
      <div className=" bg-blue-100/30 p-4 m-2 flex gap-2 flex-col">
        <div>姓名：{userInfo.name}</div>
        <div>电话：{userInfo.phone}</div>
        <div>院系：{userInfo.facuties ?? "--"}</div>
      </div>
      <Button className=" ml-2" onClick={logout}>
        退出登录
      </Button>
    </div>
  );
}
