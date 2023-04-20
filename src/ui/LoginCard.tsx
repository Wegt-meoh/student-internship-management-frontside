"use client";

import { login } from "@/api/login";
import { RoleEnum } from "@/constants/RoleEnum";
import { showNotification } from "@/utils/notification";
import { regMobileCN, regPassword } from "@/utils/reg.util";
import { saveToken } from "@/utils/token.util";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { InputContainer } from "./InputContainer";

export default function LoginCard() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [disabled, setDisabled] = useState(false);

  const handleSubmit = () => {
    if (!regMobileCN.test(phone)) {
      showNotification({ text: "请输入正确的手机号", duration: 3000 });
      return;
    }

    if (!regPassword.test(password)) {
      showNotification({
        text: "请输入6-24位长度的由字母数字下划线组成的密码",
        duration: 3000,
      });
      return;
    }

    setDisabled(true);

    login(phone, password)
      .then((res) => {
        const { token, info } = res;
        const { role } = info;

        saveToken(token);

        if (role === RoleEnum.STUDENT) {
          redirect("/home/student");
        } else if (role === RoleEnum.TEACHER) {
          redirect("/home/teacher");
        } else {
          alert("unknow role");
        }
      })
      .finally(() => {
        setDisabled(false);
      });
  };

  return (
    <div className=" relative bg-white ring-1 rounded-sm ring-slate-50 py-8 px-6 animate-pulse-once">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <h1>登录</h1>
        <InputContainer>
          <i className="w-4 h-4 bg-cover bg-user" />
          <input
            id="phoneInput"
            maxLength={11}
            type="text"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            disabled={disabled}
            className=" px-2 py-1 outline-none flex-1"
            placeholder="请输入手机号"
          />
        </InputContainer>
        <InputContainer>
          <i className="w-4 h-4 bg-cover bg-unlock" />
          <input
            disabled={disabled}
            id="passwordInput"
            maxLength={24}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="请输入密码"
            type="password"
            className=" px-2 py-1 outline-none flex-1"
          />
        </InputContainer>
        <button
          disabled={disabled}
          type="submit"
          className=" rounded-sm mt-6 w-72 h-8 bg-blue-500 text-slate-50 outline-none"
        >
          登录
        </button>
      </form>
    </div>
  );
}
