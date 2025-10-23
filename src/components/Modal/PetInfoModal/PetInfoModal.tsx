import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useDeletePet } from "@/hooks/queries/pets/useDeletePet";
import { PATH } from "@/lib/constants/path";

import Dog from "../../../assets/images/dog.svg";
import { Form } from "../../Form";
import { Modal } from "../shared";

import { usePetInfoModal } from "./hooks/usePetInfoModal";
import { usePetInfoSubmit } from "./hooks/usePetInfoSubmit";
import { useSkipPetInfo } from "./hooks/useSkipPetInfo";
import { PetInfoModalProps } from "./types/petInfoModal";

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

export default function PetInfoModal({
  type,
  hasCloseBtn = true,
  onClose,
  petId,
}: PetInfoModalProps) {
  const {
    form,
    isPending: isPetPending,
    hasChanges,
  } = usePetInfoModal({ type, petId });
  const image = form.watch("image");

  const { handleSubmit, isSubmitting } = usePetInfoSubmit({
    type,
    petId,
    onClose,
  });

  const router = useRouter();
  const { skipPetInfo, isPending: isSkipping } = useSkipPetInfo();

  const { mutate: deletePet, isPending: isDeleting } = useDeletePet();

  const handleSkip = () => {
    skipPetInfo(undefined, {
      onSuccess: () => {
        toast.success("반려견 정보 입력을 건너뛰었어요.");
        onClose();
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
        onClose();
      },
      onError: (error: Error) => {
        toast.error(`등록 해제에 실패했어요: ${error.message}`);
      },
    });
  };

  return (
    <Modal>
      {hasCloseBtn && <Modal.CloseBtn />}

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
                    existingImageUrl={image as string}
                  >
                    <Dog className="w-20" />
                  </Form.ImageUpload>
                </Form.Control>
                <Form.Label className="flex justify-center">
                  반려견 사진 등록
                </Form.Label>
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
          <button
            className="mt-2 border-b-2"
            type="button"
            onClick={handleSkip}
            disabled={isSkipping}
          >
            {isSkipping ? "건너 뛰는 중..." : "아직 반려견이 없어요"}
          </button>
        ) : type === "edit-pet" ? (
          <button
            className="mt-2 border-b-2"
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "등록 해제 중..." : "등록 해제하기"}
          </button>
        ) : null}
      </Modal.Content>
    </Modal>
  );
}
