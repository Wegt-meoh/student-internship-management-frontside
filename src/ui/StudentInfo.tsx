"use client";

import { getUserInfoById } from "@/api/user";
import { UserInfoResponseType } from "@/api/user/index.type";
import { FileOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";

export default function StudentInfo({ userId }: { userId: number }) {
  const [userInfo, setUserInfo] = useState<UserInfoResponseType>();
  useEffect(() => {
    getUserInfoById(userId).then((res) => {
      setUserInfo(res);
    });
  }, [userId]);

  if (!userInfo) return <div>loading...</div>;

  return (
    <div className=" bg-blue-100/30 p-4 m-2 flex gap-2 flex-col">
      <div>姓名：{userInfo.name}</div>
      <div>电话：{userInfo.phone}</div>
      <div>班级：{userInfo.class ?? "--"}</div>
      <div>个人简介：</div>
      {userInfo.description && (
        <article className=" ml-8 mt-4">
          {userInfo.description.split("\n").map((slice, index) => {
            return <p key={index}>{slice}</p>;
          })}
        </article>
      )}
      {userInfo.attachmentUrl && (
        <div>
          附件：
          <a href={userInfo.attachmentUrl}>
            <FileOutlined />
            附件
          </a>
        </div>
      )}
    </div>
  );
}
