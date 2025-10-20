import { usePetInfoModalStore } from "@/store/modalStore";

export function PetAddBtn() {
  const { openModal } = usePetInfoModalStore();

  return (
    <button
      onClick={() => openModal("add-pet", undefined)}
      className="bg-primary absolute bottom-7 left-1/2 h-10 w-48 -translate-x-1/2 rounded-[10px] font-semibold text-white"
    >
      반려견 추가하기
    </button>
  );
}
