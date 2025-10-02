import React from "react";

import CloseButton from "../../assets/icons/delete-icon.svg";
import Button from "../Button";

interface ModalProps {
  hasCloseButton?: boolean;
  children: React.ReactNode;
}

export default function Modal({ hasCloseButton, children }: ModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-card flex max-h-[80vh] min-w-150 flex-col items-center justify-center gap-3 overflow-hidden rounded-xl px-12 py-12">
        {hasCloseButton && (
          // 해당 버튼을 눌렀을 대 모달이 닫히도록 구현
          <Button className="ml-auto" type="button">
            <CloseButton />
          </Button>
        )}
        {children}
      </div>
    </div>
  );
}
