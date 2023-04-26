"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type NavigationContainerPropsType = {
  headData: LinkDataItem;
  linkData: LinkDataItem[];
};

type LinkDataItem = {
  target: string;
  title: string;
};

export default function NavigationContainer({
  headData,
  linkData,
}: NavigationContainerPropsType) {
  const pathname = usePathname();

  return (
    <div role="navigation" className=" w-full text-white bg-slate-800">
      <Link href={headData.target}>
        <div className=" px-2 py-4">{headData.title}</div>
      </Link>

      <ul>
        {linkData.map((item) => {
          {
            return (
              <li
                key={item.target}
                className={clsx(` rounded-r-xl rounded-br-xl`, {
                  "text-blue-400": pathname === item.target,
                  "hover:bg-slate-600 w-full bg-slate-800 text-slate-400":
                    pathname !== item.target,
                })}
              >
                <Link
                  href={item.target}
                  className="w-full h-full block px-2 py-2 text-ellipsis 
                        whitespace-nowrap overflow-hidden"
                >
                  {item.title}
                </Link>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}
