"use client";

import { createPost, findAllPostByUser } from "@/api/post";
import { createPostDtoType, PostResponseVo } from "@/api/post/index.type";
import {
  CompassOutlined,
  HomeOutlined,
  HomeTwoTone,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Card, Form, Input, message, Modal, Space } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [form] = Form.useForm<createPostDtoType>();
  const [modalOpen, setModalOpen] = useState(false);
  const [postData, setPostData] = useState<PostResponseVo[]>([]);
  const [loading, setLoading] = useState(false);

  async function fetchPostData() {
    setLoading(true);
    const data = await findAllPostByUser();
    setPostData(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchPostData();
  }, []);

  async function handleSubmit() {
    setLoading(true);
    message.loading("添加岗位...");
    const result = await form.validateFields();
    const res = await createPost(result);
    message.destroy();
    message.success(res.message);
    setLoading(false);
  }

  return (
    <div>
      <Modal
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
          fetchPostData();
        }}
        footer={
          <Button type="primary" onClick={form.submit} disabled={loading}>
            确认添加
          </Button>
        }
      >
        <h1 className=" text-lg">添加岗位</h1>
        <Form form={form} onFinish={handleSubmit} disabled={loading}>
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
          <Form.Item
            label="岗位描述"
            name={"description"}
            rules={[{ required: true, message: "岗位描述不能为空" }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
      <Space className=" w-full" direction="vertical">
        <Button
          disabled={loading}
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setModalOpen(true);
          }}
        >
          添加岗位
        </Button>

        <div className=" flex gap-4 flex-wrap">
          {postData.map((post) => {
            return (
              <Link key={post.id} href={`/teacher/post/${post.id}`}>
                <Card className=" w-72 hover:bg-slate-50 hover:border-slate-400 transition-colors">
                  <Space direction="vertical">
                    <h1 className=" text-lg">{post.name}</h1>
                    <Space>
                      <CompassOutlined />
                      {post.position}
                    </Space>
                    <Space>
                      <HomeTwoTone />
                      {post.company}
                    </Space>
                  </Space>
                </Card>
              </Link>
            );
          })}
        </div>
      </Space>
    </div>
  );
}
