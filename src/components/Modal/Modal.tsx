import React from "react";

import { useModalStore } from "@/store/modalStore";

import CloseButton from "../../assets/icons/delete-icon.svg";
import Button from "../Button";

interface ModalProps {
  hasCloseButton?: boolean;
  children: React.ReactNode;
}

export default function Modal({ hasCloseButton, children }: ModalProps) {
  const { closeModal } = useModalStore();

  // 필요시 배경 클릭시 모달 닫기 혹은 esc 버튼 입력 시 모달 닫기 기능 추가

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-card flex max-h-[80vh] min-w-150 flex-col items-center justify-center gap-3 overflow-hidden rounded-xl px-12 py-12">
        {hasCloseButton && (
          <Button
            className="ml-auto cursor-pointer"
            type="button"
            onClick={closeModal}
          >
            <CloseButton />
          </Button>
        )}
        {children}
      </div>
    </div>
  );
}
