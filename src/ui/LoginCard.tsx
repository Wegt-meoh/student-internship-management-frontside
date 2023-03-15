"use client";

import clsx from "clsx";

export default function LoginCard() {
  return (
    <div className=" ring-1 ring-slate-50 p-3">
      <h1>登录</h1>
      <Input iconType="user" placeholder="请输入手机号" />
      <Input iconType="unlock" placeholder="请输入密码" />
      <button
        type="button"
        className=" mt-4 w-64 h-8 bg-blue-400 text-slate-50"
      >
        登录
      </button>
    </div>
  );
}

function Input({
  iconType,
  placeholder,
}: {
  iconType: "user" | "unlock";
  placeholder?: string;
}) {
  return (
    <div className=" w-64 mt-4 overflow-hidden relative ring-1 ring-slate-200 px-2 flex items-center">
      <i
        className={clsx(`w-3 h-3 bg-cover`, {
          "bg-user": iconType === "user",
          "bg-unlock": iconType === "unlock",
        })}
      />
      <input className=" px-2 py-1 outline-none" placeholder={placeholder} />
    </div>
  );
}
