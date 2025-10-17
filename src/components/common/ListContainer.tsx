interface ListContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const ListContainer = ({
  children,
  className = "space-y-3 sm:space-y-4",
}: ListContainerProps) => <ul className={className}>{children}</ul>;
