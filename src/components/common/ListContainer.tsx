interface ListContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const ListContainer = ({ children, className }: ListContainerProps) => (
  <ul className={`flex flex-col gap-3 md:gap-4 ${className}`}>{children}</ul>
);
