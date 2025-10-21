interface PetCardInfoProps {
  age: string;
  gender: string;
  breed: string;
  className?: string;
}

export function PetCardInfo({
  age,
  gender,
  breed,
  className,
}: PetCardInfoProps) {
  return (
    <div
      className={`text-foreground/70 flex items-center justify-center gap-2 text-sm ${className || ""}`}
    >
      <span className="font-medium">{age}</span>
      <span className="text-foreground/30">•</span>
      <span className="font-medium">{gender}</span>
      <span className="text-foreground/30">•</span>
      <span className="font-medium">{breed}</span>
    </div>
  );
}
