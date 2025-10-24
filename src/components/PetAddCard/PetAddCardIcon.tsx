import { Plus } from "lucide-react";

interface PetAddCardIconProps {
  className?: string;
  size?: number;
}

export function PetAddCardIcon({ className, size = 112 }: PetAddCardIconProps) {
  return (
    <div className="mb-4 flex justify-center">
      <div
        className={`border-border bg-background relative flex items-center justify-center overflow-hidden rounded-full border-2 ${className || ""}`}
        style={{ height: `${size}px`, width: `${size}px` }}
      >
        <Plus className="text-border h-8 w-8" />
      </div>
    </div>
  );
}
