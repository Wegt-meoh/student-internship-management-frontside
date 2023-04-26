"use client";

import React from "react";

export default function Page({ params }: { params: { postId: string } }) {
  const { postId } = params;
  return <div>Page</div>;
}
