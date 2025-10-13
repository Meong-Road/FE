import Dog from "@/assets/images/dog2.svg";

export function PetAddImage() {
  return (
    <div className="absolute top-1/2 left-1/2 flex h-[114px] w-[114px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[1px] border-slate-100">
      <Dog />
    </div>
  );
}
