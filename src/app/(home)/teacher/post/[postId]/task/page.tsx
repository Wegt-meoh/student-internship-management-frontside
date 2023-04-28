"use client";

import { findAllTaskUnderThePost } from "@/api/post";
import { FindAllTaskUnderThePostResponseVo } from "@/api/post/index.type";
import { createTask } from "@/api/task";
import { CreateTaskDto } from "@/api/task/index.type";
import { getToken } from "@/utils/token.util";
import {
  PlusOutlined,
  SearchOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  List,
  message,
  Modal,
  Space,
  Upload,
  UploadFile,
} from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Page({ params }: { params: { postId: string } }) {
  const { postId } = params;
  const [listData, setListData] = useState<FindAllTaskUnderThePostResponseVo>(
    []
  );
  const [form] = Form.useForm<CreateTaskDto>();
  const [modalOpen, setModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const showingListData = listData.filter((item) => {
    if (searchValue === "") {
      return true;
    }
    return item.title.includes(searchValue);
  });
  const [buttonDisable, setButtonDisable] = useState(false);

  async function fetchListData() {
    setLoading(true);
    const data = await findAllTaskUnderThePost(+postId);
    setListData(data);
    setLoading(false);
  }

  async function handleSubmit() {
    const result = await form.validateFields();
    result.attachmentUrl = fileList[0]?.url;
    result.postId = +postId;
    try {
      setButtonDisable(true);
      message.loading("创建任务中...");
      const res = await createTask(result);
      message.destroy();
      message.success(res.message);
      setButtonDisable(false);
      fetchListData();
    } catch {
      setButtonDisable(false);
    }
  }

  useEffect(() => {
    fetchListData();
  }, []);

  return (
    <div className=" bg-white px-4">
      <Modal
        open={modalOpen}
        title="创建任务"
        footer={
          <Button disabled={buttonDisable} onClick={handleSubmit}>
            提交
          </Button>
        }
        onCancel={() => {
          setModalOpen(false);
        }}
      >
        <Form form={form}>
          <Form.Item
            label="任务标题"
            name="title"
            rules={[{ required: true, message: "任务标题不能为空" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="任务描述"
            name="description"
            rules={[{ required: true, message: "任务描述不能为空" }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="上传附件">
            <Upload
              fileList={fileList}
              action="http://localhost:8000/oss"
              name="file"
              headers={{ authorization: `Bearer ${getToken()}` }}
              onChange={(info) => {
                let newFileList = [...info.fileList];
                newFileList = newFileList.slice(-1);
                newFileList.forEach((file) => {
                  if (file.response) {
                    file.url = file.response.url;
                  }
                  return file;
                });
                setFileList(newFileList);
              }}
            >
              <Button icon={<UploadOutlined />}>点击上传</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
      <List
        header={
          <div className=" flex justify-between items-center">
            <div>
              <Space>
                任务列表{" "}
                <Button
                  onClick={() => {
                    setModalOpen(true);
                  }}
                >
                  <PlusOutlined /> 创建任务
                </Button>
              </Space>
            </div>
            <Space>
              搜索：
              <Input
                suffix={<SearchOutlined />}
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
              />
            </Space>
          </div>
        }
        loading={loading}
        dataSource={showingListData}
        renderItem={(item) => {
          return (
            <List.Item
              actions={[
                <Link
                  href={`/teacher/post/${postId}/task/${item.id}`}
                  className="hover:underline"
                >
                  查看
                </Link>,
              ]}
            >
              <List.Item.Meta
                title={item.title}
                description={
                  <span className=" inline-block w-36 text-ellipsis overflow-hidden whitespace-nowrap">
                    {item.description}
                  </span>
                }
              />
              <Space>已提交：{item.receivedReportList.length}</Space>
            </List.Item>
          );
        }}
      />
    </div>
  );
}
