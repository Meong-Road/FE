import { type TabListProps } from "./types";

export function TabList({ children }: TabListProps) {
  return <ul className="flex">{children}</ul>;
}
