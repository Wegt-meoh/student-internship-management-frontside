"use client";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div role={"navigation"}></div>
      <div>{children}</div>
    </div>
  );
}
