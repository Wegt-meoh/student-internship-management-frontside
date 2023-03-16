import clsx from "clsx";
import { useEffect, useState } from "react";
import EyeSvg from "./EyeSvg";

export default function Input({
  iconType,
  placeholder,
  onChange,
  type,
  maxLength,
}: {
  maxLength?: number;
  iconType: "user" | "unlock";
  placeholder?: string;
  type: "number" | "text" | "password" | "email";
  onChange: React.InputHTMLAttributes<HTMLInputElement>["onChange"];
}) {
  const [open, setOpen] = useState(true);
  const [inputType, setInputType] = useState(type);

  useEffect(() => {
    if (type === "password") {
      setInputType(open ? "password" : "text");
    }
  }, [open]);

  return (
    <div className="w-72 rounded-sm overflow-hidden relative ring-1 ring-slate-200 px-2 flex items-center">
      <i
        className={clsx(`w-4 h-4 bg-cover`, {
          "bg-user": iconType === "user",
          "bg-unlock": iconType === "unlock",
        })}
      />
      <input
        maxLength={maxLength}
        type={inputType}
        onChange={onChange}
        className=" px-2 py-1 outline-none flex-1"
        placeholder={placeholder}
      />
      {type === "password" && (
        <div
          className="hover:cursor-pointer"
          onClick={() => {
            setOpen((f) => !f);
          }}
        >
          <EyeSvg open={open} />
        </div>
      )}
    </div>
  );
}
