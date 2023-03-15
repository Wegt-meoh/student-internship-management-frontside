import LoginCard from "@/ui/LoginCard";

export const metadata = {
  title: "登录",
};

export default function Login() {
  return (
    <div>
      <header className=" bg-white flex p-2">
        <h1 className=" text-2xl ml-4">学生实习管理系统</h1>
      </header>
      <main className=" bg-blue-600 relative h-96">
        <div className="absolute top-20 right-60 bg-white">
          <LoginCard />
        </div>
      </main>
      <footer className=" h-28 bg-black text-slate-50 flex justify-center items-center">
        开发者: quepengbiao | 学号: 19145219
      </footer>
    </div>
  );
}
