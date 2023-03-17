import { useState } from "react";
import EyeSvg from "./EyeSvg";

export default function PasswordInput(
  props: React.InputHTMLAttributes<HTMLInputElement>
) {
  const [open, setOpen] = useState(true);

  return (
    <div>
      <input {...props} />
      <div
        className="hover:cursor-pointer"
        onClick={() => {
          setOpen((f) => !f);
        }}
      >
        <EyeSvg open={open} />
      </div>
    </div>
  );
}
