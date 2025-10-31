import { useRouter } from "next/navigation";

import { useAuthRequiredModalStore } from "@/store/modalStore";

import { Button } from "../../ui/button";
import { Modal } from "../shared";

export default function AuthRequiredModal() {
  const { isOpen, redirectUrl, closeModal, onClose } =
    useAuthRequiredModalStore();
  const router = useRouter();

  const handleConfirm = () => {
    closeModal();
    router.replace(redirectUrl);
  };

  if (!isOpen) return null;

  return (
    <Modal className="h-auto max-w-[400px]">
      <Modal.Content>
        <p className="text-center text-lg font-semibold">
          로그인이 필요한 서비스입니다.
        </p>
        <div className="mt-10 mb-2 flex w-full justify-center gap-2 gap-y-3 px-8 sm:gap-3 sm:px-12">
          <Button
            onClick={() => {
              closeModal();
              onClose?.();
            }}
            className="h-10 w-1/2"
            variant="outline"
          >
            이전으로
          </Button>
          <Button
            onClick={handleConfirm}
            className="h-10 w-1/2"
            variant="default"
          >
            로그인
          </Button>
        </div>
      </Modal.Content>
    </Modal>
  );
}
