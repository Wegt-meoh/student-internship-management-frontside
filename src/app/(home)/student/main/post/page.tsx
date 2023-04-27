"use client";
import { findAllPostByUser } from "@/api/post";
import { PostResponseVo } from "@/api/post/index.type";
import { CompassOutlined, HomeTwoTone } from "@ant-design/icons";
import { Card, Space } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [postData, setPostData] = useState<PostResponseVo[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchPostData() {
    setLoading(true);
    const data = await findAllPostByUser();
    setPostData(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchPostData();
  }, []);

  return (
    <div className=" flex gap-4 flex-wrap">
      {postData.map((post) => {
        return (
          <Link key={post.id} href={`/student/post/${post.id}`}>
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
  );
}
