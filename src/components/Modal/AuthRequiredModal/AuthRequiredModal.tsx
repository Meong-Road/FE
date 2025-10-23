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
    <Modal className="h-auto w-[400px]">
      <Modal.Content>
        <p>로그인이 필요한 서비스입니다.</p>
        <div className="mt-10 flex justify-center gap-3">
          <Button
            onClick={() => {
              closeModal();
              onClose?.();
            }}
            className="h-10 w-full"
            variant="outline"
          >
            취소
          </Button>
          <Button
            onClick={handleConfirm}
            className="h-10 w-full"
            variant="default"
          >
            확인
          </Button>
        </div>
      </Modal.Content>
    </Modal>
  );
}
