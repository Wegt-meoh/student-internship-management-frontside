"use client";

import { findAllTaskWithOneReport } from "@/api/post";
import { FindAllTaskUnderThePostResponseVo } from "@/api/post/index.type";
import { TaskReportStatus } from "@/constants/taskReportStatus.enum";
import { transformDate } from "@/utils/date.transform";
import { Button, List, Radio, Space } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Page({ params }: { params: { postId: string } }) {
  const { postId } = params;
  const [radioValue, setRadioValue] = useState<TaskReportStatus>();
  const [listData, setListData] = useState<FindAllTaskUnderThePostResponseVo>(
    []
  );
  const [loading, setLoading] = useState(true);
  const showingListData = listData.filter((item) => {
    if (radioValue === undefined) {
      return true;
    } else {
      const currentStatus =
        item.receivedReportList.length > 0
          ? TaskReportStatus.COMPLETE
          : TaskReportStatus.NO_COMPLETE;
      return currentStatus === radioValue;
    }
  });

  useEffect(() => {
    findAllTaskWithOneReport(+postId).then((res) => {
      setListData(res);
      setLoading(false);
    });
  }, []);

  return (
    <div className=" bg-white px-4">
      <List
        header={
          <div>
            任务列表
            <div className=" float-right">
              <Radio.Group
                value={radioValue}
                onChange={(e) => {
                  setRadioValue(e.target.value);
                }}
              >
                <Radio value={undefined}>全部</Radio>
                <Radio value={TaskReportStatus.COMPLETE}>已提交</Radio>
                <Radio value={TaskReportStatus.NO_COMPLETE}>未提交</Radio>
              </Radio.Group>
            </div>
          </div>
        }
        loading={loading}
        dataSource={showingListData}
        renderItem={(item) => {
          const isSubmit = item.receivedReportList.length > 0 ? true : false;
          return (
            <Link href={`/student/post/${postId}/task/${item.id}`}>
              <List.Item>
                <List.Item.Meta title={item.title} description="" />
                <Space>
                  <div>创建时间： {transformDate(item.createDate)}</div>
                  <div>
                    {isSubmit ? (
                      <Button>已提交</Button>
                    ) : (
                      <Button>未提交</Button>
                    )}
                  </div>
                </Space>
              </List.Item>
            </Link>
          );
        }}
      />
    </div>
  );
}
