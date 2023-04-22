"use client";

import { createPost } from "@/api/post/create";
import { searchPost } from "@/api/post/search";
import { SearchPostResponseType } from "@/types/post/seach-post.dto";
import PostTable from "@/ui/PostTable";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Space } from "antd";
import { useState } from "react";

export default function Page() {
  const [form] = Form.useForm();
  const [modalOpen, setModalOpen] = useState(false);
  const [postList, setPostList] = useState<SearchPostResponseType | null>(null);
  const [tableFilters, setTableFilters] = useState<{
    name: { text: string; value: string }[];
    company: { text: string; value: string }[];
    position: { text: string; value: string }[];
    teacherName: { text: string; value: string }[];
  }>({
    name: [],
    company: [],
    position: [],
    teacherName: [],
  });

  async function handleSubmit() {
    await form.validateFields();
    message.info("正在创建岗位");
    await createPost(form.getFieldsValue());
    message.destroy();
    message.success("岗位创建成功", 2);
    fetchTableData();
  }

  function getUniqueKeys(
    key: "name" | "company" | "position",
    data: SearchPostResponseType
  ) {
    return Array.from(
      data
        .reduce((set, item) => {
          set.add(item[key]);
          return set;
        }, new Set<string>())
        .keys()
    ).map((item) => {
      return {
        text: item,
        value: item,
      };
    });
  }

  function getUniqueKeysFromUser(
    key: "phone" | "name",
    data: SearchPostResponseType
  ) {
    return Array.from(
      data
        .reduce((set, item) => {
          set.add(item.user[key]);
          return set;
        }, new Set<string>())
        .keys()
    ).map((item) => {
      return { text: item, value: item };
    });
  }

  async function fetchTableData() {
    const data = await searchPost({});

    setTableFilters({
      name: getUniqueKeys("name", data),
      company: getUniqueKeys("company", data),
      position: getUniqueKeys("position", data),
      teacherName: getUniqueKeysFromUser("name", data),
    });

    setPostList(data);
  }

  return (
    <div>
      <Modal
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
        }}
        footer={
          <Button type="primary" onClick={form.submit}>
            确认添加
          </Button>
        }
      >
        <h1 className=" text-lg">添加岗位</h1>
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            label="岗位名称"
            name={"name"}
            rules={[{ required: true, message: "岗位名称不能为空" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="岗位地点"
            name={"position"}
            rules={[{ required: true, message: "岗位地点不能为空" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="所属公司"
            name={"company"}
            rules={[{ required: true, message: "所属公司不能为空" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Space className=" w-full" direction="vertical">
        <div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setModalOpen(true);
            }}
          >
            添加岗位
          </Button>
        </div>
        <PostTable
          fetchTableData={fetchTableData}
          postList={postList}
          tableFilters={tableFilters}
        />
      </Space>
    </div>
  );
}
