"use client";
import { createReport, deleteReport } from "@/api/report";
import { ReportResponseVo } from "@/api/report/index.type";
import { findOneTaskById, findUserReportUnderTheTask } from "@/api/task";
import { TaskResponseVo } from "@/api/task/index.type";
import { transformDate } from "@/utils/date.transform";
import { getToken } from "@/utils/token.util";
import { FileOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, message, Modal, Space, Upload, UploadFile } from "antd";
import React, { useEffect, useState } from "react";

export default function Page({ params }: { params: { taskId: string } }) {
  const { taskId } = params;
  const [taskInfo, setTaskInfo] = useState<TaskResponseVo>();
  const [reportInfo, setReportInfo] = useState<ReportResponseVo[]>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(false);

  async function fetchData() {
    const res1 = await findOneTaskById(+taskId);
    setTaskInfo(res1);
    const res2 = await findUserReportUnderTheTask(+taskId);
    setReportInfo(res2);
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (!taskInfo || !reportInfo) return <div>loading...</div>;

  async function handleReportDelete() {
    if (!reportInfo) {
      return;
    }
    if (confirm("确认删除已经提交的报告吗？此操作不可恢复")) {
      const res = await deleteReport(reportInfo[0].id);
      message.success(res.message);
      fetchData();
    }
  }

  async function handleReportSubmit() {
    const attachmentUrl = fileList[0]?.url;
    if (!attachmentUrl) {
      message.error("报告附件不能为空");
      return;
    }
    setButtonDisable(true);
    message.loading("报告提交中");
    try {
      const res = await createReport({ taskId: +taskId, attachmentUrl });
      message.destroy();
      setButtonDisable(false);
      message.success(res.message);
      fetchData();
    } catch {
      setButtonDisable(false);
    }
  }

  const haveSubmit = reportInfo.length === 0 ? false : true;

  return (
    <>
      <Modal
        title="提交报告"
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
        }}
        footer={
          <Button
            type="primary"
            disabled={buttonDisable}
            onClick={handleReportSubmit}
          >
            提交
          </Button>
        }
      >
        <Upload
          fileList={fileList}
          action="http://localhost:8000/oss"
          headers={{ authorization: `Bearer ${getToken()}` }}
          onChange={(info) => {
            let newFileList = [...info.fileList];
            newFileList = newFileList.slice(-1);
            newFileList.forEach((file) => {
              if (file.response) {
                file.url = file.response.url;
              }
            });
            setFileList(newFileList);
          }}
        >
          <Button icon={<UploadOutlined />}>点击上传</Button>
        </Upload>
      </Modal>
      <div className="bg-white p-2">
        <h1 className=" text-xl relative">
          <span
            className=" w-1 h-6 bg-slate-800 inline-block
     relative top-1"
          ></span>
          <span> {taskInfo.title}</span>
        </h1>
        <div className=" bg-blue-100/30 p-4 m-2 flex gap-2 flex-col">
          <div>发布时间：{transformDate(taskInfo.createDate)}</div>
          <div>任务描述：</div>
          <p className=" pl-8">{taskInfo.description}</p>
          {taskInfo.attachmentUrl && (
            <div>
              附件：
              <FileOutlined />
              <a className=" hover:underline" href={taskInfo.attachmentUrl}>
                附件
              </a>
            </div>
          )}
        </div>
      </div>
      <div className="bg-white p-2 mt-4">
        我的提交：
        <div>
          {haveSubmit ? (
            <Space>
              <a className="hover:underline" href={reportInfo[0].attachmentUrl}>
                <FileOutlined />
                我的提交
              </a>
              <Button danger onClick={handleReportDelete} size="small">
                删除
              </Button>
            </Space>
          ) : (
            <Button
              onClick={() => {
                setModalOpen(true);
              }}
            >
              提交
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
