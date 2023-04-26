import NavigationContainer from "@/ui/NavigationContainer";
import React from "react";

export default function Layout({
  children,
  params,
}: {
  params: { postId: string };
  children: React.ReactNode;
}) {
  const { postId } = params;

  return (
    <div
      className="no-bg-scrollbar fixed top-0 
      left-0 h-screen overflow-y-scroll w-48 bg-slate-800"
    >
      <NavigationContainer
        headData={{
          target: `/teacher/main/post`,
          title: "返回",
        }}
        linkData={[
          { target: `/teacher/post/${postId}`, title: "岗位信息" },
          {
            target: `/teacher/post/${postId}/student`,
            title: "参与学生",
          },
          { target: `/teacher/post/${postId}/task`, title: "任务列表" },
        ]}
      />
      <div className="ml-48 p-2">{children}</div>
    </div>
  );
}
