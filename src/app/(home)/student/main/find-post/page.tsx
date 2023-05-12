"use client";

import { findAllPost } from "@/api/post";
import { PostWithCreatedUserVo } from "@/api/post/index.type";
import { createRequestPost } from "@/api/requestPost";
import PostDetail from "@/ui/postDetail";
import { Button, message, Modal, Table } from "antd";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [tableData, setTableData] = useState<PostWithCreatedUserVo[]>([]);
  const [loading, setLoading] = useState(true);
  const [buttonDisable, setButtonDisable] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [postId, setPostId] = useState<number>();

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
      <Modal
        footer={null}
        title="岗位详情"
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
        }}
      >
        {postId && <PostDetail postId={postId + ""} />}
      </Modal>
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
            filters: Array.from(
              tableData.reduce((set, item) => {
                set.add(item.name);
                return set;
              }, new Set<string>())
            ).map((item) => {
              return {
                text: item,
                value: item,
              };
            }),
            filterSearch: true,
            onFilter: (value, record) => {
              return record.name.includes(value + "");
            },
            render: (_, record) => {
              return (
                <span
                  onClick={() => {
                    setModalOpen(true);
                    setPostId(record.id);
                  }}
                  className=" hover:underline hover:cursor-pointer"
                >
                  {record.name}
                </span>
              );
            },
          },
          {
            title: "岗位地点",
            dataIndex: "position",
            filters: Array.from(
              tableData.reduce((set, item) => {
                set.add(item.position);
                return set;
              }, new Set<string>())
            ).map((item) => {
              return {
                text: item,
                value: item,
              };
            }),
            filterSearch: true,
            onFilter: (value, record) => {
              return record.position.includes(value + "");
            },
          },
          {
            title: "所属公司",
            dataIndex: "company",
            filters: Array.from(
              tableData.reduce((set, item) => {
                set.add(item.company);
                return set;
              }, new Set<string>())
            ).map((item) => {
              return {
                text: item,
                value: item,
              };
            }),
            filterSearch: true,
            onFilter: (value, record) => {
              return record.company.includes(value + "");
            },
          },
          {
            title: "负责教师",
            dataIndex: ["createdUser", "name"],
            filters: Array.from(
              tableData.reduce((set, item) => {
                set.add(item.createdUser.name);
                return set;
              }, new Set<string>())
            ).map((item) => {
              return {
                text: item,
                value: item,
              };
            }),
            filterSearch: true,
            onFilter: (value, record) => {
              return record.createdUser.name.includes(value + "");
            },
          },
          {
            title: "联系电话",
            dataIndex: ["createdUser", "phone"],
          },
          {
            title: "所属学院",
            filters: Array.from(
              tableData.reduce((set, item) => {
                set.add(item.createdUser.facuties ?? "null");
                return set;
              }, new Set<string>())
            ).map((item) => {
              return {
                text: item,
                value: item,
              };
            }),
            filterSearch: true,
            onFilter: (value, record) => {
              return record.createdUser.facuties
                ? record.createdUser.facuties.includes(value + "")
                : true;
            },
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
