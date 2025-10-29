import Link from "next/link";

import { type TabItemProps } from "./types";

export function TabItem({ href, isActive, children }: TabItemProps) {
  return (
    <li
      className={`flex h-10 w-28 items-center justify-center text-sm sm:h-15 sm:w-40 sm:text-xl ${isActive ? "text-primary border-primary border-b-3 font-semibold" : "text-font-input border-b-3 border-transparent font-semibold"} `}
    >
      <Link href={href} scroll={false}>
        {children}
      </Link>
    </li>
  );
}
