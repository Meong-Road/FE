import { TabItem } from "./TabItem";
import { TabList } from "./TabList";
import { type TabProps } from "./types";

export function Tab({ children }: TabProps) {
  return <nav className="mt-16 border-b-1 border-[#ddd]">{children}</nav>;
}

Tab.List = TabList;
Tab.Item = TabItem;
