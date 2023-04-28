"use client";

import { deletePost } from "@/api/post";
import PostDetail from "@/ui/postDetail";
import { Button, message } from "antd";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Page({ params }: { params: { postId: string } }) {
  const { postId } = params;
  const [buttonDisable, setButtonDisable] = useState(false);
  const router = useRouter();

  async function handleDeletePost() {
    if (confirm("确认删除此岗位吗？此操作无法恢复")) {
      setButtonDisable(true);
      message.loading("岗位删除中");
      try {
        const res = await deletePost(+postId);
        message.destroy();
        message.success(res.message);
        setButtonDisable(false);
        router.replace("/teacher/main/post");
      } catch {
        setButtonDisable(false);
      }
    }
  }

  return (
    <div>
      <PostDetail postId={postId} />
      <Button
        disabled={buttonDisable}
        danger
        className="mt-4"
        type="primary"
        onClick={handleDeletePost}
      >
        删除岗位
      </Button>
    </div>
  );
}
