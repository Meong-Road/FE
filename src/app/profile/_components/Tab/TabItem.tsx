import Link from "next/link";

import { type TabItemProps } from "./types";

export function TabItem({ href, isActive, children }: TabItemProps) {
  return (
    <li>
      <Link
        href={href}
        className={`block ${isActive ? "text-orange-500" : ""}`}
      >
        {children}
      </Link>
    </li>
  );
}
