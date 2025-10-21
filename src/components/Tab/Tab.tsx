import { cn } from "@/lib/utils";

import { TabItem } from "./TabItem";
import { TabList } from "./TabList";
import { type TabProps } from "./types";

export function Tab({ className, children }: TabProps) {
  return (
    <nav className={cn("border-b-1 border-[#ddd] select-none", className)}>
      {children}
    </nav>
  );
}

Tab.List = TabList;
Tab.Item = TabItem;
