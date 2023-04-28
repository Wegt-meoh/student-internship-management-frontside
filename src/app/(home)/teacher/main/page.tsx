"use client";

import { updateUserPassword } from "@/api/user";
import { UpdateUserPasswordDto } from "@/api/user/index.type";
import { useUserInfo } from "@/hooks/useUserInfo";
import { regPassword } from "@/utils/reg.util";
import { removeToken } from "@/utils/token.util";
import { Button, Form, Input, message, Modal } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const [userInfo, clearUserInfo] = useUserInfo();
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [form] = Form.useForm<UpdateUserPasswordDto>();
  const [buttonDisable, setButtonDisable] = useState(false);

  function logout() {
    removeToken();
    if (clearUserInfo) clearUserInfo();
    router.replace("/login");
  }

  async function handleUpdatePassword() {
    const result = await form.validateFields();
    setButtonDisable(true);
    message.loading("更新中...");
    try {
      const res = await updateUserPassword(result);
      message.destroy();
      message.success(res.message);
      setButtonDisable(false);
      logout();
    } catch {
      setButtonDisable(false);
    }
  }

  if (!userInfo) return null;

  return (
    <div className="bg-white p-2">
      <Modal
        title="修改密码"
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
        }}
        footer={
          <Button
            disabled={buttonDisable}
            onClick={handleUpdatePassword}
            type="primary"
          >
            提交
          </Button>
        }
      >
        <Form labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} form={form}>
          <Form.Item
            label="原密码"
            name="password"
            rules={[
              { required: true, message: "请输入密码" },
              {
                pattern: regPassword,
                message: "请输入6到24位的密码，密码不能有空字符",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="新密码"
            name="newPassword"
            rules={[
              {
                required: true,
                message: "新密码不能为空",
              },
              {
                pattern: regPassword,
                message: "请输入6到24位的密码，密码不能有空字符",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="确认密码"
            name="ensurePassword"
            rules={[
              {
                required: true,
                message: "重复密码不能为空",
              },
              {
                validator: (_, value) => {
                  if (!value) {
                    return Promise.reject("请输入密码");
                  }

                  const newPassword = form.getFieldValue("newPassword");
                  if (newPassword !== value) {
                    return Promise.reject("两次密码不一致");
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <h1 className=" text-xl flex justify-between items-center">
        <div>
          <span
            className=" w-1 h-6 bg-slate-800 inline-block
         relative top-1"
          ></span>
          <span> 个人信息</span>
        </div>
        <Button
          className="mr-4"
          onClick={() => {
            setModalOpen(true);
          }}
        >
          修改密码
        </Button>
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
