import { PetAddBtn } from "./PetAddBtn";
import { PetAddImage } from "./PetAddImage";
import { PetAddProps } from "./types";

export function PetAdd({ children }: PetAddProps) {
  return (
    <li className="relative min-w-[264px] rounded-3xl border-[1px] border-[#FCCFA0]">
      {children}
    </li>
  );
}

PetAdd.Image = PetAddImage;
PetAdd.Btn = PetAddBtn;
