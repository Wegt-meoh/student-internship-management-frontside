"use client";

import { request } from "@/utils/request";
import clsx from "clsx";
import { useEffect, useState } from "react";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");

  useEffect(() => {
    request("/", true).then((res) => {
      setContent(res.message);
      setOpen(true);
    });
  }, []);

  return <div className={clsx({ hidden: !open, block: open })}>{content}</div>;
}
