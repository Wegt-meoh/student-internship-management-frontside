import { NavigationData } from "@/types/navigation";

export const teacherNavigation: NavigationData = [
  {
    title: "岗位管理",
    module: "post",
    children: [
      {
        label: "岗位查看",
        target: "list",
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
        label: "报告评阅",
        target: "judge",
      },
    ],
  },
];
