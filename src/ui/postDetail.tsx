import { findPostById } from "@/api/post";
import { PostResponseVo } from "@/api/post/index.type";
import { useEffect, useState } from "react";

export default function PostDetail({ postId }: { postId: string }) {
  const [postInfo, setPostInfo] = useState<PostResponseVo | null>(null);

  useEffect(() => {
    findPostById(+postId).then((res) => {
      setPostInfo(res);
    });
  }, []);

  if (!postInfo) return <div>loading...</div>;

  return (
    <div className="bg-white p-2">
      <h1 className=" text-xl relative">
        <span
          className=" w-1 h-6 bg-slate-800 inline-block
       relative top-1"
        ></span>
        <span> 岗位信息</span>
      </h1>
      <div className=" bg-blue-100/30 p-4 m-2 flex gap-2 flex-col">
        <div>岗位名称：{postInfo.name}</div>
        <div>岗位地点：{postInfo.position}</div>
        <div>所属公司：{postInfo.company}</div>
        <div>岗位描述：</div>
        <p className=" ml-8 mt-4">
          {postInfo.description.split("\n").map((slice) => {
            return <p>{slice}</p>;
          })}
        </p>
      </div>
    </div>
  );
}
