export interface TabProps {
  className?: string;
  children: React.ReactNode;
}

export interface TabItemProps {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
}

export interface TabListProps {
  children: React.ReactNode;
}
