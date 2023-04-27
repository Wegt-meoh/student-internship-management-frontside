"use client";
import { findAllStudentUnderThePost } from "@/api/post";
import { FindAllStudentUnderThePostResponseVo } from "@/api/post/index.type";
import { HomeTwoTone, PhoneTwoTone } from "@ant-design/icons";
import { List, Space } from "antd";
import React, { useEffect, useState } from "react";

export default function Page({ params }: { params: { postId: string } }) {
  const { postId } = params;
  const [listData, setListData] =
    useState<FindAllStudentUnderThePostResponseVo>([]);
  const [loading, setLoading] = useState(true);

  async function fetchListData() {
    setLoading(true);
    const data = await findAllStudentUnderThePost(+postId);
    setListData(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchListData();
  }, []);

  return (
    <div className=" bg-white px-4">
      <List
        header={"参与学生"}
        loading={loading}
        dataSource={listData}
        renderItem={(item) => {
          return (
            <List.Item>
              <List.Item.Meta
                title={item.name}
                description={
                  <Space>
                    <PhoneTwoTone />
                    {item.phone}
                    <HomeTwoTone />
                    {item.class}
                  </Space>
                }
              />
            </List.Item>
          );
        }}
      />
    </div>
  );
}
