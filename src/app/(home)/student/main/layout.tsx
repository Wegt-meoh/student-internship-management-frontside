import NavigationContainer from "@/ui/NavigationContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "学生模块",
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
            target: "/student/main",
            title: "学生模块",
          }}
          linkData={[
            {
              target: "/student/main",
              title: "个人信息",
            },
            {
              target: "/student/main/request-post",
              title: "岗位申请",
            },
            {
              target: "/student/main/post",
              title: "参与岗位",
            },
            {
              target: "/student/main/find-post",
              title: "查找岗位",
            },
          ]}
        />
      </div>
      <div className="ml-48 p-2">{children}</div>
    </div>
  );
}
