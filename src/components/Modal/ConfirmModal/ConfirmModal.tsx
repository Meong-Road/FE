import { useConfirmModalStore } from "@/store/modalStore";

import { Button } from "../../ui/button";
import { Modal } from "../shared";

export default function ConfirmModal() {
  const { isOpen, text, title, description, closeModal, onConfirm } =
    useConfirmModalStore();

  if (!isOpen) return null;

  return (
    <Modal className="h-auto max-w-[400px]">
      <Modal.Content className="px-8 sm:px-12">
        <div className="flex flex-col items-center gap-y-1">
          <p className="text-center text-lg font-semibold">{title}</p>
          <p className="text-center text-sm text-gray-500">{description}</p>
        </div>
        <div className="mt-8 mb-2 flex w-full justify-center gap-2 gap-y-3 sm:gap-3">
          <Button
            onClick={() => {
              closeModal();
            }}
            className="h-10 w-1/2"
            variant="outline"
          >
            닫기
          </Button>
          <Button
            onClick={() => {
              closeModal();
              onConfirm?.();
            }}
            className="h-10 w-1/2"
            variant="default"
          >
            {text}
          </Button>
        </div>
      </Modal.Content>
    </Modal>
  );
}
