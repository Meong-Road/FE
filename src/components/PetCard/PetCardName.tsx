interface PetCardNameProps {
  children: React.ReactNode;
  className?: string;
}

export function PetCardName({ children, className }: PetCardNameProps) {
  return (
    <h3
      className={`text-card-foreground mb-4 text-center text-lg font-bold ${className || ""}`}
    >
      {children}
    </h3>
  );
}
