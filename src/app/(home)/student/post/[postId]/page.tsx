"use client";

import PostDetail from "@/ui/postDetail";
import React from "react";

export default function Page({ params }: { params: { postId: string } }) {
  return <PostDetail postId={params.postId} />;
}
