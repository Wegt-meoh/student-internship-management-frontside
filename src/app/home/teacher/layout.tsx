import { teacherNavigation } from "@/routes/teacher";
import BreadCrumb from "@/ui/BreadCrumb";
import Navigation from "@/ui/Navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "教师模块",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="no-bg-scrollbar fixed top-0 left-0 h-screen overflow-y-scroll w-48 bg-slate-800">
        <Navigation data={teacherNavigation} prefix={"/home/teacher"} />
      </div>
      <div className=" pl-48">
        <div className=" h-12">head....</div>
        <div className=" h-12">
          <BreadCrumb />
        </div>
        {children}
      </div>
    </div>
  );
}
