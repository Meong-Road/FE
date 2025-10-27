import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useDeletePet } from "@/hooks/queries/pets/useDeletePet";
import { PATH } from "@/lib/constants/path";
import { usePetInfoModalStore } from "@/store/modalStore";

import Dog from "../../../assets/images/dog.svg";
import { Form } from "../../Form";
import { Modal } from "../shared";

import { usePetInfoModal } from "./hooks/usePetInfoModal";
import { usePetInfoSubmit } from "./hooks/usePetInfoSubmit";
import { useSkipPetInfo } from "./hooks/useSkipPetInfo";
import { PetInfoDeleteButton, PetInfoSkipButton } from "./_components";

interface RadioOption {
  id: string;
  label: string;
  value: string;
}

const GENDER_OPTIONS: RadioOption[] = [
  { id: "gender-male", label: "남아", value: "MALE" },
  { id: "gender-female", label: "여아", value: "FEMALE" },
];

const NEUTER_OPTIONS: RadioOption[] = [
  { id: "neuter-true", label: "중성화 했어요", value: "true" },
  { id: "neuter-false", label: "중성화 안 했어요", value: "false" },
];

export default function PetInfoModal() {
  const { isOpen, modalType: type, petId, closeModal } = usePetInfoModalStore();

  const {
    form,
    isPending: isPetPending,
    hasChanges,
  } = usePetInfoModal({ type: type || "add-pet", petId });
  const currentImage = form.watch("image");

  const { handleSubmit, isSubmitting } = usePetInfoSubmit({
    type: type || "add-pet",
    petId,
    onClose: closeModal,
  });

  const router = useRouter();
  const { skipPetInfo, isPending: isSkipping } = useSkipPetInfo();

  const { mutate: deletePet, isPending: isDeleting } = useDeletePet();

  const handleSkip = () => {
    skipPetInfo(undefined, {
      onSuccess: () => {
        toast.success("반려견 정보 입력을 건너뛰었어요.");
        closeModal();
        router.push(PATH.REGULAR);
      },
      onError: (error: Error) => {
        toast.error(`건너뛰기에 실패했어요: ${error.message}`);
      },
    });
  };

  const handleDelete = () => {
    if (!petId) return;
    deletePet(petId, {
      onSuccess: () => {
        toast.success("반려견 정보가 등록 해제되었습니다.");
        closeModal();
      },
      onError: (error: Error) => {
        toast.error(`등록 해제에 실패했어요: ${error.message}`);
      },
    });
  };

  // 모달이 열려있지 않으면 렌더링 안 함
  if (!isOpen || !type) return null;

  // 펫 데이터를 가져오는 중이면 렌더링 안 함
  if (isPetPending) return null;

  return (
    <Modal>
      <Modal.CloseBtn />

      {type === "first-login" ? (
        <Modal.Title
          title="반려견 정보를 등록해 주세요"
          subtitle="마이페이지에서 언제든지 추가 등록이 가능해요 🐶"
        />
      ) : type === "add-pet" ? (
        <Modal.Title title="반려견 정보를 등록해 주세요" />
      ) : (
        <Modal.Title title="반려견 정보를 수정해 주세요" />
      )}

      <Modal.Content>
        <Form form={form} onSubmit={handleSubmit}>
          <Form.Field
            name="image"
            render={({ field }) => (
              <Form.Item>
                <Form.Control>
                  <Form.ImageUpload
                    id="pet-image-upload"
                    onChange={field.onChange}
                    value={field.value as File | null}
                    existingImageUrl={currentImage as string}
                  >
                    <Dog width={150} height={150} />
                  </Form.ImageUpload>
                </Form.Control>
                <span className="mt-4 flex justify-center text-base font-medium text-zinc-700">
                  사진을 등록해주세요
                </span>
              </Form.Item>
            )}
          />

          <Form.Field
            name="name"
            render={({ field }) => (
              <Form.Item>
                <Form.Label required>이름</Form.Label>
                <Form.Control>
                  <Form.Input
                    className="px-4 py-2.5"
                    type="text"
                    placeholder="반려견 이름을 알려주세요"
                    {...field}
                  />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />

          <Form.Field
            name="gender"
            render={({ field }) => (
              <Form.Item>
                <Form.Label required>성별</Form.Label>
                <Form.Control>
                  <Form.Radio
                    ref={field.ref}
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    options={GENDER_OPTIONS}
                  />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />

          <Form.Field
            name="neuter"
            render={({ field }) => (
              <Form.Item>
                <Form.Label required>중성화 여부</Form.Label>
                <Form.Control>
                  <Form.Radio
                    ref={field.ref}
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    options={NEUTER_OPTIONS}
                  />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />

          <Form.Field
            name="birthYear"
            render={({ field }) => (
              <Form.Item>
                <Form.Label required>생일</Form.Label>
                <Form.Control>
                  <Modal.DateSelect
                    name="birthYear"
                    htmlFor="birthYear"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />

          <Form.Field
            name="breed"
            render={({ field }) => (
              <Form.Item>
                <Form.Label required>견종</Form.Label>
                <Form.Control>
                  <Modal.BreedSelect
                    name="breed"
                    htmlFor="breed"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />

          <Form.SubmitButton
            isPending={isSubmitting}
            disabled={
              isPetPending ||
              isSubmitting ||
              !form.formState.isValid ||
              (type === "edit-pet" && !hasChanges)
            }
            label={type === "edit-pet" ? "수정하기" : "등록하기"}
          />
        </Form>

        {type === "first-login" ? (
          <PetInfoSkipButton onClick={handleSkip} disabled={isSkipping} />
        ) : type === "edit-pet" ? (
          <PetInfoDeleteButton onClick={handleDelete} disabled={isDeleting} />
        ) : null}
      </Modal.Content>
    </Modal>
  );
}
