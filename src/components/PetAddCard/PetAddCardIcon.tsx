import { Plus } from "lucide-react";

interface PetAddCardIconProps {
  className?: string;
  size?: number;
}

export function PetAddCardIcon({ className, size = 112 }: PetAddCardIconProps) {
  return (
    <div className="mb-4 flex justify-center">
      <div
        className={`border-primary/30 bg-primary/5 relative flex items-center justify-center overflow-hidden rounded-full border-3 border-dashed ${className || ""}`}
        style={{ height: `${size}px`, width: `${size}px` }}
      >
        <Plus className="text-primary/60 h-8 w-8" />
      </div>
    </div>
  );
}
