"use client";

import { login } from "@/api/auth/login";
import { RoleEnum } from "@/constants/RoleEnum";
import { regMobileCN, regPassword } from "@/utils/reg.util";
import { saveToken } from "@/utils/token.util";
import { LockOutlined, LockTwoTone, UserOutlined } from "@ant-design/icons";
import { Button, Input, message } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginCard() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [disabled, setDisabled] = useState(false);

  const handleSubmit = () => {
    if (!regMobileCN.test(phone)) {
      message.info("请输入正确的手机号", 3);
      return;
    }

    if (!regPassword.test(password)) {
      message.info("请输入6-24位长度的由字母数字下划线组成的密码", 3);
      return;
    }

    setDisabled(true);
    message.loading("登录中");
    login(phone, password)
      .then((res) => {
        message.destroy();
        message.success("登录成功", 3);
        const { token, info } = res;
        const { role } = info;

        saveToken(token);

        if (role === RoleEnum.STUDENT) {
          router.replace("/student/main");
        } else if (role === RoleEnum.TEACHER) {
          router.replace("/teacher/main");
        } else {
          alert("unknow role");
        }
      })
      .catch(() => {
        setDisabled(false);
      });
  };

  return (
    <div className=" w-80 relative bg-white ring-1 rounded-sm ring-slate-50 py-8 px-6 animate-pulse-once">
      <div className="flex flex-col gap-4">
        <h1 className=" text-lg">登录</h1>
        <Input
          prefix={<UserOutlined style={{ color: "rgb(59 130 246 / 0.8)" }} />}
          placeholder="电话号码"
          maxLength={11}
          type="text"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
          disabled={disabled}
        />
        <Input.Password
          prefix={<LockOutlined style={{ color: "rgb(59 130 246 / 0.8)" }} />}
          disabled={disabled}
          maxLength={24}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="请输入密码"
          type="password"
        />
        <Button type="primary" disabled={disabled} onClick={handleSubmit}>
          登录
        </Button>
      </div>
    </div>
  );
}
