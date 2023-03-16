import LoginCard from "@/ui/LoginCard";
import Image from "next/image";

export const metadata = {
  title: "登录",
};

export default function Login() {
  return (
    <div>
      <header className=" bg-white flex p-2">
        <Image
          src={"/next.svg"}
          className=" bg-slate-50 p-1"
          width={30}
          height={15}
          alt={"logo"}
        />
        <h1 className=" text-2xl ml-4">学生实习管理系统</h1>
      </header>
      <main className="flex bg-blue-600 relative h-120 justify-center items-center">
        <div className=" relative top-6 bg-banner lg:w-2/4 md:w-0 lg:h-full bg-center bg-cover" />
        <LoginCard />
      </main>
      <footer className=" h-28 bg-slate-600 text-slate-50 flex justify-center items-center">
        开发者: 阙鹏彪 | 学号: 19145219
      </footer>
    </div>
  );
}
