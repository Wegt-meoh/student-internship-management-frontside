"use client";

import { scoreReport } from "@/api/report";
import { ReportWithSubmitUser } from "@/api/report/index.type";
import {
  deleteTask,
  findAllReportUnderTheTask,
  findOneTaskById,
} from "@/api/task";
import { TaskResponseVo } from "@/api/task/index.type";
import { ReportScoreStatus } from "@/constants/reportScoreStatus.enum";
import { transformDate } from "@/utils/date.transform";
import { FileZipOutlined, FormOutlined } from "@ant-design/icons";
import {
  Button,
  Input,
  InputNumber,
  List,
  message,
  Popconfirm,
  Radio,
  Space,
} from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page({
  params,
}: {
  params: { taskId: string; postId: string };
}) {
  const { taskId, postId } = params;
  const [taskInfo, setTaskInfo] = useState<TaskResponseVo>();
  const [listData, setListData] = useState<ReportWithSubmitUser[]>();
  const [radioValue, setRadioValue] = useState(ReportScoreStatus.ALL);
  const [buttonDisable, setButtonDisable] = useState(false);
  const [inputValue, setInputValue] = useState<number | undefined>();
  const router = useRouter();

  async function fetchData() {
    Promise.all([
      findAllReportUnderTheTask(+taskId),
      findOneTaskById(+taskId),
    ]).then(([res1, res2]) => {
      setListData(res1);
      setTaskInfo(res2);
    });
  }

  useEffect(() => {
    fetchData();
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

  async function handleDeleteTask() {
    if (confirm("确定删除此任务吗？此操作不可恢复")) {
      setButtonDisable(true);
      message.loading("任务删除中");
      try {
        const res = await deleteTask(+taskId);
        message.destroy();
        message.success(res.message);
        router.replace(`/teacher/post/${postId}/task`);
      } catch {
        setButtonDisable(false);
      }
    }
  }

  async function handleScoreReport(reportId: number) {
    if (!inputValue) {
      message.warning("请输入评分");
      return;
    }

    setButtonDisable(true);
    try {
      message.loading("评分中...");
      const res = await scoreReport({
        id: reportId,
        score: inputValue,
      });
      message.destroy();
      message.success(res.message);
      fetchData();
      setInputValue(undefined);
      setButtonDisable(false);
    } catch {
      setButtonDisable(false);
    }
  }

  return (
    <>
      <div className="bg-white p-2">
        <h1 className=" text-xl flex justify-between">
          <div>
            <span className=" w-1 h-6 bg-slate-800 inline-block relative top-1"></span>
            <span> {taskInfo.title}</span>
          </div>
          <Button
            disabled={buttonDisable}
            className="mr-4"
            danger
            onClick={handleDeleteTask}
          >
            删除任务
          </Button>
        </h1>
        <div className=" bg-blue-100/30 p-4 m-2 flex gap-2 flex-col">
          <Space className="" direction="vertical">
            <div>发布时间： {transformDate(taskInfo.createDate)}</div>
            <div>任务描述：</div>
            <article className=" pl-8">
              {taskInfo.description.split("\n").map((slice, index) => {
                return <p key={index}>{slice}</p>;
              })}
            </article>
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
                  <Popconfirm
                    showCancel={false}
                    icon={<FormOutlined />}
                    title={"评分"}
                    cancelText={"取消"}
                    okText={"确认"}
                    okButtonProps={{ disabled: buttonDisable }}
                    onConfirm={() => {
                      handleScoreReport(item.id);
                    }}
                    onCancel={() => {
                      setInputValue(undefined);
                    }}
                    description={
                      <InputNumber
                        size="small"
                        width={20}
                        value={inputValue}
                        onChange={(e) => {
                          if (!e) {
                            setInputValue(undefined);
                          } else {
                            setInputValue(e);
                          }
                        }}
                      />
                    }
                  >
                    <Button className=" text-red-600">
                      {(item.score ?? "未评") + "分"}
                    </Button>
                  </Popconfirm>,
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
