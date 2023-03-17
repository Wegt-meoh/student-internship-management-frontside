"use client";

import { regMobileCN, regPassword } from "@/utils/reg.util";
import { request } from "@/utils/request";
import { saveRole } from "@/utils/role";
import { saveToken } from "@/utils/token.util";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import EyeSvg from "./EyeSvg";
import Message from "./Message";
import PasswordInput from "./PasswordInput";

type InputOnChange = React.InputHTMLAttributes<HTMLInputElement>["onChange"];

export default function LoginCard() {
  const [messagePhone, setMessagePhone] = useState("");
  const [messagePassword, setMessagePassword] = useState("");
  const [passwordInputState, setPasswordInputState] = useState(true);
  const [role, setRole] = useState<"student" | "teacher">("student");

  const buttonOnClick = () => {
    setMessagePhone("");
    setMessagePassword("");

    const phone =
      document.querySelector<HTMLInputElement>("#phoneInput")?.value ?? "";

    const password =
      document.querySelector<HTMLInputElement>("#passwordInput")?.value ?? "";

    let role = "student";
    document.getElementsByName("role").forEach((item) => {
      const inputElement = item as HTMLInputElement;
      if (inputElement.checked) {
        role = inputElement.value;
      }
    });
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
        saveToken(res.token);
        saveRole(res.role);
        location.href = "/";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className=" relative bg-white ring-1 rounded-sm ring-slate-50 py-8 px-6 animate-pulse-once">
      <h1>登录</h1>
      <Message text={messagePhone} />
      <InputContainer>
        <i className="w-4 h-4 bg-cover bg-user" />
        <input
          id="phoneInput"
          maxLength={11}
          type="text"
          className=" px-2 py-1 outline-none flex-1"
          placeholder="请输入手机号"
        />
      </InputContainer>
      <Message text={messagePassword} />
      <InputContainer>
        <i className="w-4 h-4 bg-cover bg-unlock" />
        <input
          id="passwordInput"
          maxLength={24}
          placeholder="请输入密码"
          type={passwordInputState ? "password" : "text"}
          className=" px-2 py-1 outline-none flex-1"
        />
        <div
          className="hover:cursor-pointer"
          onClick={() => {
            setPasswordInputState((f) => !f);
          }}
        >
          <EyeSvg open={passwordInputState} />
        </div>
      </InputContainer>
      <div className=" mt-4 flex items-center justify-evenly h-7">
        <label className=" hover:cursor-pointer">
          <input
            defaultChecked
            type="radio"
            name="role"
            value="student"
            className=" mr-2"
          />
          学生
        </label>
        <label className=" hover:cursor-pointer">
          <input type="radio" name="role" className=" mr-2" value="teacher" />
          教师
        </label>
      </div>
      <button
        type="button"
        className=" rounded-sm mt-6 w-72 h-8 bg-blue-500 text-slate-50 outline-none"
        onClick={buttonOnClick}
      >
        登录
      </button>
    </div>
  );
}

function InputContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-72 rounded-sm overflow-hidden relative ring-1 ring-slate-200 px-2 flex items-center">
      {children}
    </div>
  );
}
