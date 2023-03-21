import { NavigationData } from "@/types/navigation";
import Navigation from "@/ui/Navigation";

const teacherNavigation: NavigationData = [
  {
    title: "岗位管理",
    module: "post",
    children: [
      {
        label: "岗位查看",
        target: "list",
      },
      {
        label: "岗位添加",
        target: "add",
      },
      {
        label: "岗位删除",
        target: "delete",
      },
      {
        label: "岗位分配",
        target: "check",
      },
    ],
  },
  {
    title: "报告管理",
    module: "report",
    children: [
      {
        label: "查看报告",
        target: "list",
      },
      {
        label: "报告sadkfjlasdjflkjsdlkj评阅",
        target: "judge",
      },
    ],
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="no-bg-scrollbar fixed top-0 left-0 h-screen overflow-y-scroll w-48 bg-slate-800">
        <Navigation data={teacherNavigation} prefix={"teacher"} />
      </div>
      <div className=" pl-48">{children}</div>
    </div>
  );
}
