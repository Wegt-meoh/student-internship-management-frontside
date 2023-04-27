"use client";

import { findAllPost } from "@/api/post";
import { PostWithCreatedUserVo } from "@/api/post/index.type";
import { createRequestPost } from "@/api/requestPost";
import { Button, message, Table } from "antd";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [tableData, setTableData] = useState<PostWithCreatedUserVo[]>([]);
  const [loading, setLoading] = useState(true);
  const [buttonDisable, setButtonDisable] = useState(false);

  async function fetcheTableData() {
    setLoading(true);
    const data = await findAllPost();
    setTableData(data);
    setLoading(false);
  }

  async function handleSubmitRequest(postId: number) {
    setButtonDisable(true);
    message.loading("岗位申请中...");
    try {
      const res = await createRequestPost(postId);
      message.destroy();
      message.success(res.message);
      setButtonDisable(false);
    } catch {
      setButtonDisable(false);
    }
  }

  useEffect(() => {
    fetcheTableData();
  }, []);

  return (
    <div>
      <Table
        loading={loading}
        dataSource={tableData}
        rowKey="id"
        pagination={{
          position: ["topCenter"],
          showSizeChanger: true,
          pageSizeOptions: [5, 10, 20, 40],
        }}
        columns={[
          {
            title: "岗位名称",
            dataIndex: "name",
          },
          {
            title: "岗位地点",
            dataIndex: "name",
          },
          {
            title: "所属公司",
            dataIndex: "name",
          },
          {
            title: "负责教师",
            dataIndex: ["createdUser", "name"],
          },
          {
            title: "联系电话",
            dataIndex: ["createdUser", "phone"],
          },
          {
            title: "所属学院",
            dataIndex: ["createdUser", "facuties"],
          },
          {
            title: "操作",
            render: (_value, record) => {
              return (
                <Button
                  disabled={buttonDisable}
                  onClick={() => {
                    handleSubmitRequest(record.id);
                  }}
                >
                  申请
                </Button>
              );
            },
          },
        ]}
      />
    </div>
  );
}
