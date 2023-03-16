"use client";

import { regMobileCN, regPassword } from "@/utils/reg.util";
import { request } from "@/utils/request";
import clsx from "clsx";
import { useState } from "react";

export default function LoginCard() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [messagePhone, setMessagePhone] = useState("");
  const [messagePassword, setMessagePassword] = useState("");
  const [role, setRole] = useState<"student" | "teacher">("student");

  const phoneInputOnChange: React.InputHTMLAttributes<HTMLInputElement>["onChange"] =
    (ev) => {
      setMessagePhone("");
      setPhone(ev.target.value);
    };

  const passwordInputOnChange: React.InputHTMLAttributes<HTMLInputElement>["onChange"] =
    (ev) => {
      setMessagePassword("");
      setPassword(ev.target.value);
    };

  const buttonOnClick = () => {
    if (!regMobileCN.test(phone)) {
      setMessagePhone("请输入正确的手机号码");
      return;
    }

    if (!regPassword.test(password)) {
      setMessagePassword("请输入6-24位长度的由字母数字下划线组成的密码");
      return;
    }

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
    <div className=" relative bg-white ring-1 ring-slate-50 py-8 px-6 animate-pulse-once">
      <h1>登录</h1>
      <Message text={messagePhone} />
      <Input
        iconType="user"
        placeholder="请输入手机号"
        maxLength={11}
        onChange={phoneInputOnChange}
        type={"text"}
      />
      <Message text={messagePassword} />
      <Input
        iconType="unlock"
        placeholder="请输入密码"
        maxLength={24}
        onChange={passwordInputOnChange}
        type={"password"}
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
        className=" mt-6 w-64 h-8 bg-blue-500 text-slate-50 outline-none"
        onClick={buttonOnClick}
      >
        登录
      </button>
    </div>
  );
}

function Message({ text }: { text?: string }) {
  return <div className="h-5 text-rose-600 text-xs">{text}</div>;
}

function Input({
  iconType,
  placeholder,
  onChange,
  type,
  maxLength,
}: {
  maxLength?: number;
  iconType: "user" | "unlock";
  placeholder?: string;
  type: "number" | "text" | "password" | "email";
  onChange: React.InputHTMLAttributes<HTMLInputElement>["onChange"];
}) {
  return (
    <div className="w-72 overflow-hidden relative ring-1 ring-slate-200 px-2 flex items-center">
      <i
        className={clsx(`w-3 h-3 bg-cover`, {
          "bg-user": iconType === "user",
          "bg-unlock": iconType === "unlock",
        })}
      />
      <input
        maxLength={maxLength}
        type={type}
        onChange={onChange}
        className=" px-2 py-1 outline-none"
        placeholder={placeholder}
      />
    </div>
  );
}
