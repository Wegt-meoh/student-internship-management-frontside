"use client";

import { NavigationData } from "@/types/navigation";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import RowDownSvg from "./RowDownSvg";
import RowRightSvg from "./RowRightSvg";

export default function Navigation({
  data,
}: {
  prefix: string;
  data: NavigationData;
}) {
  const [openUl, setOpenUl] = useState("");
  function handleLiClick(ulTitile: string) {
    if (ulTitile === openUl) {
      setOpenUl("");
    } else {
      setOpenUl(ulTitile);
    }
  }

  return (
    <div role="navigation" className=" w-full text-slate-400 bg-slate-800">
      <div className=" px-2 py-4 ring-1 ring-slate-400">logo</div>
      <ul>
        {data.map((item) => {
          return (
            <li
              key={item.title}
              className={clsx(`overflow-hidden relative w-full`)}
            >
              <LiHead
                handleClick={handleLiClick}
                icon={item.icon}
                title={item.title}
                isOpen={openUl === item.title}
              />
              <ul
                className={clsx(` overflow-hidden`, {
                  "h-0": openUl !== item.title,
                  "h-fit": openUl === item.title,
                })}
              >
                {item.children.map((anchorItem) => {
                  return (
                    <li
                      key={anchorItem.label}
                      className="hover:bg-slate-600 w-full bg-slate-800 rounded-r-lg rounded-br-lg"
                    >
                      <Link
                        href={anchorItem.target}
                        className="w-full h-full block px-2 py-2"
                      >
                        {anchorItem.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function LiHead({
  icon,
  title,
  isOpen,
  handleClick,
}: { isOpen: boolean; handleClick: (title: string) => void } & Pick<
  NavigationData[number],
  "icon" | "title"
>) {
  return (
    <div
      onClick={() => {
        handleClick(title);
      }}
      className={clsx(
        `hover:bg-slate-600 cursor-pointer rounded-r-lg rounded-br-lg`,
        {
          "bg-slate-800": !isOpen,
          "bg-slate-600 text-blue-400": isOpen,
        }
      )}
    >
      {icon}
      <div className="px-3 py-2">{title}</div>
      <span className=" absolute right-2 top-2">
        {isOpen ? <RowDownSvg /> : <RowRightSvg />}
      </span>
    </div>
  );
}
