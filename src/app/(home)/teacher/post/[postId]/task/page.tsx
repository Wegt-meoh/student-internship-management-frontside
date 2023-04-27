"use client";

import { findAllTaskUnderThePost } from "@/api/post";
import { FindAllTaskUnderThePostResponseVo } from "@/api/post/index.type";
import { SearchOutlined } from "@ant-design/icons";
import { Input, List, Space } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Page({ params }: { params: { postId: string } }) {
  const { postId } = params;
  const [listData, setListData] = useState<FindAllTaskUnderThePostResponseVo>(
    []
  );
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true);
  const showingListData = listData.filter((item) => {
    if (searchValue === "") {
      return true;
    }
    return item.title.includes(searchValue);
  });

  async function fetchListData() {
    setLoading(true);
    const data = await findAllTaskUnderThePost(+postId);
    setListData(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchListData();
  }, []);

  return (
    <div className=" bg-white px-4">
      <List
        header={
          <div className=" flex justify-between items-center">
            任务列表
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
            <Link href={`/teacher/post/${postId}/task/${item.id}`}>
              <List.Item>
                <List.Item.Meta
                  title={item.title}
                  description={item.description}
                />
                已提交：{item.receivedReportList.length}
              </List.Item>
            </Link>
          );
        }}
      />
    </div>
  );
}
