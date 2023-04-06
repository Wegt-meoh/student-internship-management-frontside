import { teacherNavigation } from "@/routes/teacher";
import Header from "@/ui/TeacherHeader";
import Navigation from "@/ui/Navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="no-bg-scrollbar fixed top-0 left-0 h-screen overflow-y-scroll w-48 bg-slate-800">
        <Navigation data={teacherNavigation} prefix={"teacher"} />
      </div>
      <div className=" pl-48">
        <div className=" h-12">
          <Header />
        </div>
        {children}
      </div>
    </div>
  );
}
