"use client";

import { findAllTaskUnderThePost, findAllTaskWithOneReport } from "@/api/post";
import { FindAllTaskUnderThePostResponseVo } from "@/api/post/index.type";
import { List, Space } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Page({ params }: { params: { postId: string } }) {
  const { postId } = params;

  const [listData, setListData] = useState<FindAllTaskUnderThePostResponseVo>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    findAllTaskWithOneReport(+postId).then((res) => {
      setListData(res);
      setLoading(false);
    });
  });

  return (
    <div>
      <List
        loading={loading}
        dataSource={listData}
        renderItem={(item) => {
          const isSubmit = item.receivedReportList.length > 0 ? true : false;
          return (
            <Link href={`/student/post/${postId}/task/${item.id}`}>
              <List.Item>
                <List.Item.Meta
                  title={item.title}
                  description={item.description}
                />

                <Space>
                  <a href={item.attachmentUrl}>附件</a>
                  <div>创建时间： {item.createDate}</div>
                  <div>{isSubmit ? "已提交" : "未提交"}</div>
                </Space>
              </List.Item>
            </Link>
          );
        }}
      />
    </div>
  );
}
