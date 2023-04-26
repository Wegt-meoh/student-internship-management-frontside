import NavigationContainer from "@/ui/NavigationContainer";
import React from "react";

export default function Layout({
  params,
  children,
}: {
  params: { postId: string };
  children: React.ReactNode;
}) {
  const { postId } = params;

  return (
    <>
      <div
        className="no-bg-scrollbar fixed top-0 
left-0 h-screen overflow-y-scroll w-48 bg-slate-800"
      >
        <NavigationContainer
          headData={{
            target: "/student/main/post",
            title: "返回",
          }}
          linkData={[
            {
              title: "岗位信息",
              target: `/student/post/${postId}`,
            },
            {
              title: "任务列表",
              target: `/student/post/${postId}/task`,
            },
          ]}
        />
      </div>
      <div className="ml-48 p-2">{children}</div>
    </>
  );
}
