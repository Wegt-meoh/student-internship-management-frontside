"use client";

import {
  findAllRequestPostUnderTheTeacher,
  updateRequestPost,
} from "@/api/requestPost";
import { FindAllRequestPostUnderTheTeacherResponseVo } from "@/api/requestPost/index.type";
import { RequestPostStatus } from "@/constants/RequestPostStatus.enum";
import {
  CheckSquareTwoTone,
  CloseSquareTwoTone,
  CompassTwoTone,
  HomeTwoTone,
  ToolTwoTone,
} from "@ant-design/icons";
import { Button, List, message, Select, Space } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [listData, setListData] =
    useState<FindAllRequestPostUnderTheTeacherResponseVo>([]);
  const [listLoading, setListLoading] = useState(true);
  const [selectDisable, setSelectDisable] = useState(false);

  async function fetchListData() {
    setListLoading(true);
    const data = await findAllRequestPostUnderTheTeacher();
    setListData(data);
    setListLoading(false);
  }

  async function handleSubmitUpdateRequest(
    id: number,
    status: RequestPostStatus
  ) {
    setSelectDisable(true);
    message.loading("请求处理中...");
    try {
      const res = await updateRequestPost({ id, status });
      message.destroy();
      message.success(res.message);
      setSelectDisable(false);
      fetchListData();
    } catch {
      setSelectDisable(false);
    }
  }

  useEffect(() => {
    fetchListData();
  }, []);

  return (
    <div className=" px-3">
      <List
        dataSource={listData}
        loading={listLoading}
        renderItem={(item) => {
          return (
            <List.Item
              actions={[
                item.status === RequestPostStatus.PENDING ? (
                  <Select
                    disabled={selectDisable}
                    defaultValue={RequestPostStatus.PENDING}
                    onChange={(value) => {
                      const text =
                        value === RequestPostStatus.RESOLVE ? "通过" : "拒绝";

                      if (
                        confirm(
                          `确认${text}该同学的请求吗？请求处理成功后无法修改`
                        )
                      ) {
                        handleSubmitUpdateRequest(item.id, value);
                      }
                    }}
                    options={[
                      { label: "同意", value: RequestPostStatus.RESOLVE },
                      { label: "拒绝", value: RequestPostStatus.REJECT },
                      { label: "待处理", value: RequestPostStatus.PENDING },
                    ]}
                  />
                ) : item.status === RequestPostStatus.RESOLVE ? (
                  <CheckSquareTwoTone style={{ color: "#00ff00" }} />
                ) : (
                  <CloseSquareTwoTone style={{ color: "red" }} />
                ),
              ]}
            >
              <List.Item.Meta
                title={"申请人：" + item.requestUser.name}
                description={"班级：" + item.requestUser.class}
              />
              <Space>
                <Space>
                  <ToolTwoTone />
                  <Link
                    className=" hover:underline"
                    href={`/teacher/post/${item.targetPost.id}`}
                  >
                    {item.targetPost.name}
                  </Link>
                </Space>
                <Space>
                  <CompassTwoTone />
                  {item.targetPost.position}
                </Space>
                <Space>
                  <HomeTwoTone />
                  {item.targetPost.company}
                </Space>
              </Space>
            </List.Item>
          );
        }}
      />
    </div>
  );
}
