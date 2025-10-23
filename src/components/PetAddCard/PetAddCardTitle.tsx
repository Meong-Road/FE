interface PetAddCardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function PetAddCardTitle({ children, className }: PetAddCardTitleProps) {
  return (
    <h3
      className={`text-card-foreground mb-4 text-center text-lg font-bold ${className || ""}`}
    >
      {children}
    </h3>
  );
}
