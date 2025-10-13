import Dog from "@/assets/images/dog2.svg";

import EditBtn from "../EditBtn";

export function PetCardImage() {
  return (
    <div className="relative flex h-[216px] max-w-[234px] items-center justify-center rounded-3xl bg-white">
      <div className="flex h-[114px] w-[114px] items-center justify-center rounded-full border-[1px] border-slate-100">
        <Dog />
      </div>
      <div className="absolute top-2 right-2 opacity-30">
        <EditBtn />
      </div>
    </div>
  );
}
