"use client";

import {
  deleteRequestPost,
  findAllRequestPostUnderTheStudent,
} from "@/api/requestPost";
import {
  FindAllRequestPostUnderTheStudentVo,
  RequestPostResponseVo,
} from "@/api/requestPost/index.type";
import { RequestPostStatus } from "@/constants/RequestPostStatus.enum";
import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  CompassTwoTone,
  HomeTwoTone,
  LoadingOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Input, List, message, Radio, Space } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [listData, setListData] = useState<FindAllRequestPostUnderTheStudentVo>(
    []
  );
  const [radioValue, setRadioValue] = useState<RequestPostStatus | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [buttonDisable, setButtonDisable] = useState(false);
  const showingListData = listData.filter((item) => {
    if (searchValue === "") {
      if (radioValue === null) {
        return true;
      } else {
        return item.status === radioValue;
      }
    } else {
      if (radioValue === null) {
        return item.targetPost.name.includes(searchValue);
      } else {
        return (
          item.targetPost.name.includes(searchValue) &&
          item.status === radioValue
        );
      }
    }
  });

  async function fetchListData() {
    setLoading(true);
    const data = await findAllRequestPostUnderTheStudent();
    setListData(data);
    setLoading(false);
  }

  async function handleDelete(requestId: number) {
    try {
      message.loading("删除岗位申请中...");
      setButtonDisable(true);
      const res = await deleteRequestPost(requestId);
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
      <List
        header={
          <div className=" flex justify-between items-center">
            <div>岗位申请列表</div>
            <Space>
              <Radio.Group
                value={radioValue}
                onChange={(e) => {
                  setRadioValue(e.target.value);
                }}
              >
                <Radio value={null}>全部</Radio>
                <Radio value={RequestPostStatus.PENDING}>处理中</Radio>
                <Radio value={RequestPostStatus.RESOLVE}>已通过</Radio>
                <Radio value={RequestPostStatus.REJECT}>拒绝</Radio>
              </Radio.Group>
              岗位名称筛选：
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
            <List.Item>
              <List.Item.Meta
                title={item.targetPost.name}
                description={
                  <Space>
                    <div>
                      <CompassTwoTone /> {item.targetPost.position}
                    </div>
                    <div>
                      <HomeTwoTone /> {item.targetPost.company}
                    </div>
                  </Space>
                }
              />

              <Space>
                {item.status === RequestPostStatus.PENDING ? (
                  <Button
                    disabled={buttonDisable}
                    onClick={() => {
                      if (confirm("确认删除此申请吗？")) {
                        handleDelete(item.id);
                      }
                    }}
                  >
                    删除
                  </Button>
                ) : null}
                {item.status === RequestPostStatus.PENDING ? (
                  <Space>
                    处理中
                    <LoadingOutlined />
                  </Space>
                ) : item.status === RequestPostStatus.REJECT ? (
                  <Space>
                    拒绝申请
                    <CloseCircleTwoTone style={{ color: "#08c" }} />
                  </Space>
                ) : (
                  <Space>
                    申请通过
                    <CheckCircleTwoTone style={{ fill: "green" }} />
                  </Space>
                )}
              </Space>
            </List.Item>
          );
        }}
      />
    </div>
  );
}
