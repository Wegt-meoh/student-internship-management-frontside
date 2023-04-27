"use client";
import { ReportResponseVo } from "@/api/report/index.type";
import { findOneTaskById, findUserReportUnderTheTask } from "@/api/task";
import { TaskResponseVo } from "@/api/task/index.type";
import React, { useEffect, useState } from "react";

export default function Page({ params }: { params: { taskId: string } }) {
  const { taskId } = params;
  const [taskInfo, setTaskInfo] = useState<TaskResponseVo>();
  const [reportInfo, setReportInfo] = useState<ReportResponseVo>();

  useEffect(() => {
    Promise.all([
      findOneTaskById(+taskId),
      findUserReportUnderTheTask(+taskId),
    ]).then(([res1, res2]) => {
      setTaskInfo(res1);
      setReportInfo(res2);
    });
  }, []);

  if (!taskInfo || !reportInfo) return <div>loading...</div>;

  return (
    <div className="bg-white p-2">
      <h1 className=" text-xl relative">
        <span
          className=" w-1 h-6 bg-slate-800 inline-block
     relative top-1"
        ></span>
        <span> {taskInfo.title}</span>
      </h1>
      <div className=" bg-blue-100/30 p-4 m-2 flex gap-2 flex-col">
        <div>任务描述：</div>
        <p>{taskInfo.description}</p>
        <div>附件：</div>
        <a className=" hover:underline" href={taskInfo.attachmentUrl}>
          附件
        </a>
        <div>创建时间：{taskInfo.createDate}</div>
      </div>
    </div>
  );
}
