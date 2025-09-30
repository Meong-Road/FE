import Link from "next/link";

import { type TabItemProps } from "./types";

export function TabItem({ href, isActive, children }: TabItemProps) {
  return (
    <li className="h-15 w-40">
      <Link
        href={href}
        className={`h-full w-full ${isActive ? "text-primary border-b-primary border-b-2 font-extrabold" : "text-font-input font-semibold"} text-7 flex items-center justify-center`}
      >
        {children}
      </Link>
    </li>
  );
}
