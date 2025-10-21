import { PetCardEditBtn } from "./PetCardEditBtn";
import { PetCardImage } from "./PetCardImage";
import { PetCardInfo } from "./PetCardInfo";
import { PetCardProps } from "./types";

export function PetCard({ children }: PetCardProps) {
  return (
    <li className="bg-gradient-opacity relative min-w-[264px] rounded-3xl border-[1px] border-[#FCCFA0] px-4 pt-3 pb-6">
      {children}
    </li>
  );
}

PetCard.Image = PetCardImage;
PetCard.Info = PetCardInfo;
PetCard.EditBtn = PetCardEditBtn;
