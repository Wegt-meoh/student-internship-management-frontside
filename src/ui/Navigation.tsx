"use client";

import { NavigationData } from "@/types/navigation";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import path from "path";
import { useEffect, useState } from "react";
import FolderUl from "./FolderUl";
import LiHead from "./LiHead";

export default function Navigation({
  data,
  prefix,
  title,
}: {
  title: string;
  prefix: string;
  data: NavigationData;
}) {
  const pathname = usePathname();
  const [openUl, setOpenUl] = useState(() => {
    let res = "";
    data.forEach((item) => {
      if (pathname && pathname.includes(item.module)) {
        res = item.module;
      }
    });
    return res;
  });

  function handleUlFold(ulTitile: string) {
    if (ulTitile === openUl) {
      setOpenUl("");
    } else {
      setOpenUl(ulTitile);
    }
  }

  useEffect(() => {
    data.forEach((item) => {
      if (pathname && pathname.includes(item.module)) {
        setOpenUl(item.module);
      }
    });
  }, [pathname, data]);

  return (
    <div
      role="navigation"
      className=" w-full text-slate-400 bg-slate-800 text-white"
    >
      <Link href={prefix}>
        <div className=" px-2 py-4">{title}</div>
      </Link>
      <ul>
        {data.map((item) => {
          return (
            <li
              key={item.module}
              className={clsx(`overflow-hidden relative w-full`)}
            >
              <LiHead
                handleClick={() => {
                  handleUlFold(item.module);
                }}
                icon={item.icon}
                title={item.title}
                isOpen={openUl === item.module}
              />
              <FolderUl open={openUl === item.module}>
                {item.children.map((anchorItem) => {
                  const href = path.join(
                    "/",
                    prefix,
                    item.module,
                    anchorItem.target
                  );
                  return (
                    <li
                      key={anchorItem.label}
                      className={clsx(` rounded-r-xl rounded-br-xl`, {
                        "text-blue-400": pathname === href,
                        "hover:bg-slate-600 w-full bg-slate-800 text-slate-400":
                          pathname !== href,
                      })}
                    >
                      <Link
                        href={href}
                        className="w-full h-full block px-2 py-2 text-ellipsis 
                        whitespace-nowrap overflow-hidden"
                      >
                        {anchorItem.label}
                      </Link>
                    </li>
                  );
                })}
              </FolderUl>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
