"use client";

import { request } from "@/utils/request";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    request("/", true, { mode: "no-cors" })
      .then((res) => {
        console.log("succ");
        console.log(res);
      })
      .catch(() => {
        location.href = "/login";
      });
  }, []);

  return <div></div>;
}
