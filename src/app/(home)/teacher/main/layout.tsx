import NavigationContainer from "@/ui/NavigationContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "教师模块",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div
        className="no-bg-scrollbar fixed top-0 
      left-0 h-screen overflow-y-scroll w-48 bg-slate-800"
      >
        <NavigationContainer
          headData={{
            target: "/home/teacher/main",
            title: "教师模块",
          }}
          linkData={[
            {
              title: "个人信息",
              target: "/teacher/main",
            },
            {
              title: "负责岗位",
              target: "/teacher/main/post",
            },
            {
              title: "岗位请求",
              target: "/teacher/main/request-post",
            },
          ]}
        />
      </div>
      <div className="ml-48 p-2">{children}</div>
    </div>
  );
}
