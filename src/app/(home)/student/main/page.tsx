"use client";

import { updateUserInfo, updateUserPassword } from "@/api/user";
import {
  UpdateUserInfoDto,
  UpdateUserPasswordDto,
} from "@/api/user/index.type";
import { useUserInfo } from "@/hooks/useUserInfo";
import { regPassword } from "@/utils/reg.util";
import { getToken, removeToken } from "@/utils/token.util";
import { FileOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Space,
  Upload,
  UploadFile,
} from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const [userInfo, clearUserInfo] = useUserInfo();
  const [userInfoModalOpen, setUserInfoModal] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [userInfoForm] = Form.useForm<UpdateUserInfoDto>();
  const [passwordForm] = Form.useForm<UpdateUserPasswordDto>();
  const [buttonDisable, setButtonDisable] = useState(false);
  const router = useRouter();
  const [fileList, setFileList] = useState<UploadFile[]>(() => {
    if (userInfo?.attachmentUrl) {
      return [
        {
          uid: "-1",
          name: "附件1",
          url: userInfo?.attachmentUrl,
        },
      ];
    } else {
      return [];
    }
  });

  function logout() {
    removeToken();
    if (clearUserInfo) clearUserInfo();
    router.replace("/login");
  }

  async function handleUserInfoSubmit() {
    const result = userInfoForm.getFieldsValue();
    if (!result.description && !result.attachmentUrl) {
      return;
    }
    if (fileList[0]?.url) {
      result.attachmentUrl = fileList[0].url;
    }

    setButtonDisable(true);
    message.loading("个人信息更新中");
    try {
      const res = await updateUserInfo(result);
      message.destroy();
      message.success(res.message);
      setButtonDisable(false);
    } catch {
      setButtonDisable(false);
    }
  }

  async function handleUpdatePassword() {
    const result = await passwordForm.validateFields();
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
        title="更新个人信息"
        open={userInfoModalOpen}
        onCancel={() => {
          setUserInfoModal(false);
        }}
        footer={
          <Button
            disabled={buttonDisable}
            onClick={handleUserInfoSubmit}
            type="primary"
          >
            提交
          </Button>
        }
      >
        <Form form={userInfoForm}>
          <Form.Item
            label="个人简介"
            name="description"
            initialValue={userInfo.description ?? undefined}
          >
            <Input.TextArea />
          </Form.Item>
          <Upload
            fileList={fileList}
            action="http://localhost:8000/oss"
            headers={{ authorization: `Bearer ${getToken()}` }}
            onChange={(info) => {
              let newFileList = [...info.fileList];
              newFileList = newFileList.slice(-1);
              newFileList.forEach((file) => {
                if (file.response) {
                  file.url = file.response.url;
                }
              });
              setFileList(newFileList);
            }}
          >
            <Button icon={<UploadOutlined />}>点击上传</Button>
          </Upload>
        </Form>
      </Modal>
      <Modal
        title="修改密码"
        open={passwordModalOpen}
        onCancel={() => {
          setPasswordModalOpen(false);
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
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          form={passwordForm}
        >
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

                  const newPassword = passwordForm.getFieldValue("newPassword");
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
          <span className=" w-1 h-6 bg-slate-800 inline-block relative top-1"></span>
          <span> 个人信息</span>
        </div>
        <Space className=" mr-4">
          <Button
            onClick={() => {
              setUserInfoModal(true);
            }}
          >
            更新个人信息
          </Button>
          <Button
            onClick={() => {
              setPasswordModalOpen(true);
            }}
          >
            修改密码
          </Button>
        </Space>
      </h1>
      <div className=" bg-blue-100/30 p-4 m-2 flex gap-2 flex-col">
        <div>姓名：{userInfo.name}</div>
        <div>电话：{userInfo.phone}</div>
        <div>班级：{userInfo.class ?? "--"}</div>
        <div>个人简介：</div>
        {userInfo.description && (
          <article className=" ml-8 mt-4">
            {userInfo.description.split("\n").map((slice, index) => {
              return <p key={index}>{slice}</p>;
            })}
          </article>
        )}
        {userInfo.attachmentUrl && (
          <div>
            附件：
            <a href={userInfo.attachmentUrl}>
              <FileOutlined />
              附件
            </a>
          </div>
        )}
      </div>
      <Space className=" ml-2">
        <Button onClick={logout}>退出登录</Button>
      </Space>
    </div>
  );
}
