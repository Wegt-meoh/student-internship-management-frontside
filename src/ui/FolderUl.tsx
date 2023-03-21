"use client";

import clsx from "clsx";
import { useEffect, useMemo, useRef, useState } from "react";

export default function FolderUl({
  open,
  children,
}: {
  children: React.ReactNode;
  open: boolean;
}) {
  const [height, setHeight] = useState("0");
  const ulRef = useRef<HTMLUListElement>(null);

  const unfoldHeight = useMemo(() => {
    if (!ulRef.current) {
      return "auto";
    }
    const childrenList = ulRef.current.children;
    let sumHeight = 0;
    for (let i = 0; i < childrenList.length; i += 1) {
      sumHeight += childrenList[i].clientHeight;
    }
    return `${sumHeight}px`;
  }, [children]);

  useEffect(() => {
    if (open) {
      setHeight(unfoldHeight);
    } else {
      setHeight("0");
    }
  }, [open, unfoldHeight]);

  return (
    <ul
      ref={ulRef}
      style={{ height: height }}
      className={clsx(`overflow-hidden transition-all duration-300`, {
        "opacity-50": !open,
        "opacity-100": open,
      })}
    >
      {children}
    </ul>
  );
}
