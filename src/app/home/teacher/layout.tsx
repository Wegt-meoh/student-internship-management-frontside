import { teacherNavigation } from "@/routes/teacher";
import Navigation from "@/ui/Navigation";
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
        <Navigation
          data={teacherNavigation}
          prefix={"/home/teacher"}
          title={"教师模块"}
        />
      </div>
      <div className="ml-48 p-2">{children}</div>
    </div>
  );
}
