"use client";

import React from "react";

export default function Page({ params }: { params: { taskId: string } }) {
  const { taskId } = params;
  return <div>Page</div>;
}
