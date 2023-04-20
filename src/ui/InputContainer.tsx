export function InputContainer({ children }: { children: React.ReactNode }) {
  return (
    <div
      onFocus={(e) => {
        e.currentTarget.classList.add("ring-2", "ring-slate-400");
      }}
      onBlur={(e) => {
        e.currentTarget.classList.remove("ring-2", "ring-slate-400");
      }}
      className="mt-4 w-72 rounded-sm overflow-hidden relative
         ring-1 ring-slate-200 px-2 flex items-center"
    >
      {children}
    </div>
  );
}
