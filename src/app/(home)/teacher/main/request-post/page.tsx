"use client";

import {
  findAllRequestPostUnderTheTeacher,
  updateRequestPost,
} from "@/api/requestPost";
import { FindAllRequestPostUnderTheTeacherResponseVo } from "@/api/requestPost/index.type";
import { RequestPostStatus } from "@/constants/RequestPostStatus.enum";
import StudentInfo from "@/ui/StudentInfo";
import {
  CheckSquareTwoTone,
  CloseSquareTwoTone,
  CompassTwoTone,
  HomeTwoTone,
  ToolTwoTone,
} from "@ant-design/icons";
import { List, message, Modal, Radio, Select, Space } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [listData, setListData] =
    useState<FindAllRequestPostUnderTheTeacherResponseVo>([]);
  const [listLoading, setListLoading] = useState(true);
  const [selectDisable, setSelectDisable] = useState(false);
  const [radioValue, setRadioValue] = useState<RequestPostStatus>();
  const showingListData = listData.filter((item) => {
    if (!radioValue) {
      return true;
    }
    return item.status === radioValue;
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [userId, setUserId] = useState<number>();

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
    <div className=" px-4 bg-white">
      <Modal
        title="学生信息"
        footer={null}
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
        }}
      >
        {userId && <StudentInfo userId={userId} />}
      </Modal>
      <List
        header={
          <div>
            处理岗位请求
            <div className=" float-right">
              <Radio.Group
                value={radioValue}
                onChange={(e) => {
                  setRadioValue(e.target.value);
                }}
              >
                <Radio value={undefined}>全部</Radio>
                <Radio value={RequestPostStatus.PENDING}>待处理</Radio>
                <Radio value={RequestPostStatus.RESOLVE}>已通过</Radio>
                <Radio value={RequestPostStatus.REJECT}>已拒绝</Radio>
              </Radio.Group>
            </div>
          </div>
        }
        dataSource={showingListData}
        loading={listLoading}
        renderItem={(item) => {
          return (
            <List.Item
              key={item.id}
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
                title={
                  <span
                    className=" hover:underline hover:cursor-pointer"
                    onClick={() => {
                      setModalOpen(true);
                      setUserId(item.requestUser.id);
                    }}
                  >
                    申请人： {item.requestUser.name}
                  </span>
                }
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
