import { MouseEvent } from "react";

export function GatheringCardJoinBtn() {
  const handleParticipateButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO
    console.log("참여하기");
  };

  return (
    <button
      className="bg-primary absolute right-6 bottom-6 flex h-9 w-36 items-center justify-center rounded-[10px] font-bold text-white"
      onClick={handleParticipateButtonClick}
    >
      참여하기
    </button>
  );
}
