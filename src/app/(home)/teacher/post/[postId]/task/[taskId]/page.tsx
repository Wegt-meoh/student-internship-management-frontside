"use client";

import { ReportWithSubmitUser } from "@/api/report/index.type";
import { findAllReportUnderTheTask, findOneTaskById } from "@/api/task";
import { TaskResponseVo } from "@/api/task/index.type";
import { ReportScoreStatus } from "@/constants/reportScoreStatus.enum";
import { transformDate } from "@/utils/date.transform";
import { FileZipOutlined } from "@ant-design/icons";
import { Button, List, Radio, Space } from "antd";
import React, { useEffect, useState } from "react";

export default function Page({ params }: { params: { taskId: string } }) {
  const { taskId } = params;
  const [taskInfo, setTaskInfo] = useState<TaskResponseVo>();
  const [listData, setListData] = useState<ReportWithSubmitUser[]>();
  const [radioValue, setRadioValue] = useState(ReportScoreStatus.ALL);

  useEffect(() => {
    Promise.all([
      findAllReportUnderTheTask(+taskId),
      findOneTaskById(+taskId),
    ]).then(([res1, res2]) => {
      setListData(res1);
      setTaskInfo(res2);
    });
  }, []);

  if (!taskInfo || !listData) return <div>loading...</div>;
  const showingListData = listData.filter((item) => {
    if (radioValue === ReportScoreStatus.ALL) {
      return true;
    }
    const currentState = item.score
      ? ReportScoreStatus.SCORED
      : ReportScoreStatus.NOT_SCORED;
    return currentState === radioValue;
  });

  return (
    <>
      <div className="bg-white p-2">
        <h1 className=" text-xl relative">
          <span className=" w-1 h-6 bg-slate-800 inline-block relative top-1"></span>
          <span> {taskInfo.title}</span>
        </h1>
        <div className=" bg-blue-100/30 p-4 m-2 flex gap-2 flex-col">
          <Space className="" direction="vertical">
            <div>发布时间： {transformDate(taskInfo.createDate)}</div>
            <div>任务描述：</div>
            <p className=" pl-8">{taskInfo.description}</p>
            {taskInfo.attachmentUrl && (
              <div>
                附件： <FileZipOutlined />
                <a className="hover:underline" href={taskInfo.attachmentUrl}>
                  附件
                </a>
              </div>
            )}
          </Space>
        </div>
      </div>
      <div className="bg-white p-2 mt-4">
        <List
          header={
            <div className=" flex items-center justify-between">
              <div>已提交报告列表</div>
              <Radio.Group
                value={radioValue}
                onChange={(e) => {
                  setRadioValue(e.target.value);
                }}
              >
                <Radio value={ReportScoreStatus.ALL}>全部</Radio>
                <Radio value={ReportScoreStatus.NOT_SCORED}>未评分</Radio>
                <Radio value={ReportScoreStatus.SCORED}>已评分</Radio>
              </Radio.Group>
            </div>
          }
          dataSource={showingListData}
          renderItem={(item) => {
            return (
              <List.Item
                actions={[
                  item.score ? (
                    <span className=" text-red-600">{item.score + "分"}</span>
                  ) : (
                    <Button>评分</Button>
                  ),
                ]}
              >
                <List.Item.Meta title={item.user.name} />
                <div>
                  <a className="hover:underline" href={item.attachmentUrl}>
                    <FileZipOutlined />
                    附件
                  </a>
                </div>
              </List.Item>
            );
          }}
        />
      </div>
    </>
  );
}
