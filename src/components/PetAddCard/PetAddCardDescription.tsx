interface PetAddCardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export function PetAddCardDescription({
  children,
  className,
}: PetAddCardDescriptionProps) {
  return (
    <p className={`text-foreground/60 text-center text-sm ${className || ""}`}>
      {children}
    </p>
  );
}
