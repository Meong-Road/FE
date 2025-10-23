import { cn } from "@/lib/utils";

import { TabItem } from "./TabItem";
import { TabList } from "./TabList";
import { type TabProps } from "./types";

export function Tab({ className, children }: TabProps) {
  return (
    <nav className={cn("border-border border-b-1 select-none", className)}>
      {children}
    </nav>
  );
}

Tab.List = TabList;
Tab.Item = TabItem;
