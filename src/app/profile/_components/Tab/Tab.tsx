import { TabItem } from "./TabItem";
import { TabList } from "./TabList";
import { type TabProps } from "./types";

export function Tab({ children }: TabProps) {
  return <nav>{children}</nav>;
}

Tab.List = TabList;
Tab.Item = TabItem;
