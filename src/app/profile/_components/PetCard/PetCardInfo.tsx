import { PetCardInfoProps } from "./types";

export function PetCardInfo({ name, age, gender, type }: PetCardInfoProps) {
  return (
    <div className="font-semibold text-[#515151]">
      <div className="border-b-[1px] border-slate-200 py-2 text-center">
        <span> {name}</span>
      </div>
      <div className="flex pt-2">
        <span className="flex-1 text-center">{age}</span>
        <span className="flex-1 text-center">{gender}</span>
        <span className="flex-1 text-center">{type}</span>
      </div>
    </div>
  );
}
