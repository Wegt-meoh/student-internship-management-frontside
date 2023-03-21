import { NavigationData } from "@/types/navigation";
import clsx from "clsx";
import RowSvg from "./RowSvg";

export default function LiHead({
  icon,
  title,
  isOpen,
  handleClick,
}: { isOpen: boolean; handleClick: () => void } & Pick<
  NavigationData[number],
  "icon" | "title"
>) {
  return (
    <div
      onClick={handleClick}
      className={clsx(
        `hover:bg-slate-600 cursor-pointer rounded-r-xl rounded-br-xl`,
        {
          "bg-slate-800": !isOpen,
          "bg-slate-600": isOpen,
        }
      )}
    >
      {icon}
      <div className="px-3 py-2">{title}</div>
      <span
        className={clsx(`absolute right-2 top-2`, {
          "text-blue-400": isOpen,
        })}
      >
        <RowSvg direction={isOpen ? "down" : "right"} />
      </span>
    </div>
  );
}
