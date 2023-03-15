"use client";

import { request } from "@/utils/request";
import clsx from "clsx";
import { useState } from "react";

export default function LoginCard() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"student" | "teacher">("student");

  const phoneInputOnChange: React.InputHTMLAttributes<HTMLInputElement>["onChange"] =
    (ev) => {
      setPhone(ev.target.value);
    };

  const passwordInputOnChange: React.InputHTMLAttributes<HTMLInputElement>["onChange"] =
    (ev) => {
      setPassword(ev.target.value);
    };

  const buttonOnClick = () => {
    request(`/${role}/login`, false, {
      method: "POST",
      body: JSON.stringify({
        phone: phone,
        password: password,
      }),
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        alert("something error");
      });
  };

  const radioOnChange: React.InputHTMLAttributes<HTMLInputElement>["onChange"] =
    (ev) => {
      setRole(ev.target.value as any);
    };

  return (
    <div className=" ring-1 ring-slate-50 py-3 px-6">
      <h1>登录</h1>
      <Input
        iconType="user"
        placeholder="请输入手机号"
        onChange={phoneInputOnChange}
      />
      <Input
        iconType="unlock"
        placeholder="请输入密码"
        onChange={passwordInputOnChange}
      />
      <div className=" mt-4 flex items-center justify-evenly h-7">
        <label className=" hover:cursor-pointer">
          <input
            checked={role === "student"}
            type={"radio"}
            name="role"
            value={"student"}
            className=" mr-2"
            onChange={radioOnChange}
          />
          学生
        </label>
        <label className=" hover:cursor-pointer">
          <input
            type={"radio"}
            name="role"
            className=" mr-2"
            checked={role === "teacher"}
            value="teacher"
            onChange={radioOnChange}
          />
          教师
        </label>
      </div>
      <button
        type="button"
        className=" mt-12 w-64 h-8 bg-blue-400 text-slate-50 outline-none"
        onClick={buttonOnClick}
      >
        登录
      </button>
    </div>
  );
}

function Input({
  iconType,
  placeholder,
  onChange,
}: {
  iconType: "user" | "unlock";
  placeholder?: string;
  onChange: React.InputHTMLAttributes<HTMLInputElement>["onChange"];
}) {
  return (
    <div className=" w-64 mt-4 overflow-hidden relative ring-1 ring-slate-200 px-2 flex items-center">
      <i
        className={clsx(`w-3 h-3 bg-cover`, {
          "bg-user": iconType === "user",
          "bg-unlock": iconType === "unlock",
        })}
      />
      <input
        onChange={onChange}
        className=" px-2 py-1 outline-none"
        placeholder={placeholder}
      />
    </div>
  );
}
