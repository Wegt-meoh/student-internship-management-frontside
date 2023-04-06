"use client";

import { login } from "@/api/login";
import httpStatus from "@/constants/httpStatus";
import { showNotification } from "@/utils/notification";
import { regMobileCN, regPassword } from "@/utils/reg.util";
import { saveRole } from "@/utils/role";
import { saveToken } from "@/utils/token.util";
import { useState } from "react";
import EyeSvg from "./EyeSvg";

export default function LoginCard() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [passwordInputState, setPasswordInputState] = useState(true);
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

    login(phone, password, role)
      .then((res) => {
        const { statusCode, message, data } = res;
        const { name, role, token, facuties } = data.info;
        switch (statusCode) {
          case httpStatus.SUCC:
          case httpStatus.SUCC_POST: {
            saveToken(token);
            saveRole(role);
            if (role === "student") {
              location.href = "/student";
            } else if (role === "teacher") {
              location.href = "/teacher";
            } else {
              location.href = "/login";
            }
            break;
          }
          default: {
            showNotification({ text: message, duration: 3000 });
          }
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
              disabled={disabled}
              type="radio"
              checked={role === "student"}
              onChange={(e) => {
                if (e.target.checked) {
                  setRole("student");
                }
              }}
              name="role"
              value="student"
              className=" mr-2"
            />
            学生
          </label>
          <label className=" hover:cursor-pointer">
            <input
              disabled={disabled}
              type="radio"
              checked={role === "teacher"}
              name="role"
              onChange={(e) => {
                if (e.target.checked) {
                  setRole("teacher");
                }
              }}
              className=" mr-2"
              value="teacher"
            />
            教师
          </label>
        </div>
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

function InputContainer({ children }: { children: React.ReactNode }) {
  return (
    <div
      onFocus={(e) => {
        e.currentTarget.classList.add("ring-2", "ring-slate-400");
      }}
      onBlur={(e) => {
        e.currentTarget.classList.remove("ring-2", "ring-slate-400");
      }}
      className="mt-4 w-72 rounded-sm overflow-hidden relative
       ring-1 ring-slate-200 px-2 flex items-center"
    >
      {children}
    </div>
  );
}
