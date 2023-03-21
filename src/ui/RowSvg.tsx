import { Direction } from "@/types/direction";
import clsx from "clsx";

// if direction is undefined row's direction is down
export default function RowSvg({ direction }: { direction?: Direction }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      className={clsx(`duration-100 ease-in transition`, {
        "-rotate-90": direction === "right",
        "-rotate-180": direction === "up",
        " rotate-90": direction === "left",
      })}
      style={{ minWidth: "20px", minHeight: "20px" }}
    >
      <g fill="none" fillRule="evenodd" transform="translate(-446 -398)">
        <path
          fill="currentColor"
          fillRule="nonzero"
          d="M95.8838835,240.366117 C95.3957281,239.877961 94.6042719,239.877961 94.1161165,240.366117 C93.6279612,240.854272 93.6279612,241.645728 94.1161165,242.133883 L98.6161165,246.633883 C99.1042719,247.122039 99.8957281,247.122039 100.383883,246.633883 L104.883883,242.133883 C105.372039,241.645728 105.372039,240.854272 104.883883,240.366117 C104.395728,239.877961 103.604272,239.877961 103.116117,240.366117 L99.5,243.982233 L95.8838835,240.366117 Z"
          transform="translate(356.5 164.5)"
        ></path>
        <polygon points="446 418 466 418 466 398 446 398"></polygon>
      </g>
    </svg>
  );
}
