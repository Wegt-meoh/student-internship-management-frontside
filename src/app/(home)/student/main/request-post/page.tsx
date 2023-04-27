"use client";

import { findAllRequestPostUnderTheStudent } from "@/api/requestPost";
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
} from "@ant-design/icons";
import { List, Space } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [listData, setListData] = useState<FindAllRequestPostUnderTheStudentVo>(
    []
  );
  const [loading, setLoading] = useState(true);

  async function fetchListData() {
    setLoading(true);
    const data = await findAllRequestPostUnderTheStudent();
    setListData(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchListData();
  }, []);

  return (
    <div>
      <List
        dataSource={listData}
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
