import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useUploadPetImage } from "@/hooks/queries/imageUpload";
import { usePostPet, usePutPet } from "@/hooks/queries/pets";
import { PATH } from "@/lib/constants/path";

import Dog from "../../assets/images/dog.svg";
import { Form } from "../Form";

import {
  PetInfoFormSchema,
  PetInfoUpdateSchema,
} from "./_hooks/usePetInfoForm";
import { usePetInfoModal } from "./_hooks/usePetInfoModal";
import { useSkipPetInfo } from "./_hooks/useSkipPetInfo";
import { PetInfoModalProps } from "./types/petInfoModal";
import { Modal } from ".";

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
  const router = useRouter();

  const {
    form,
    isPending: isPetPending,
    hasChanges,
  } = usePetInfoModal({ type, petId });
  const image = form.watch("image");

  const createPetMutation = usePostPet();
  const updatePetMutation = usePutPet();
  const uploadImageMutation = useUploadPetImage();
  const { mutate: skipPetInfo } = useSkipPetInfo();

  const handleSubmit = async (
    values: PetInfoFormSchema | PetInfoUpdateSchema,
  ) => {
    try {
      // 1. petPayload 준비. 아직 image는 null로 초기화.
      const petPayload: PetInfoFormSchema = {
        name: values.name!,
        gender: values.gender!,
        birthYear: values.birthYear!,
        breed: values.breed!,
        neuter: values.neuter!,
        petType: values.petType!,
        image: null,
      };

      // 2. image 업로드후 imageUrl 설정.
      if (values.image instanceof File) {
        const imageUrl = await uploadImageMutation.mutateAsync(values.image);
        if (imageUrl.result?.imageUrl) {
          petPayload.image = imageUrl.result.imageUrl as string; // string or null
        }
      }

      // 3. edit-pet 인 경우 업데이트 요청.
      if (type === "edit-pet" && petId) {
        updatePetMutation.mutate(
          { id: petId, data: petPayload as PetInfoUpdateSchema },
          {
            onSuccess: () => {
              toast.success("반려동물 정보가 수정되었습니다.");
              onClose();
            },
            onError: (error: Error) => {
              toast.error(`반려동물 정보 수정에 실패했어요: ${error.message}`);
            },
          },
        );
      } else {
        // add-pet or first-login
        createPetMutation.mutate(petPayload, {
          onSuccess: () => {
            toast.success("반려동물 정보가 등록되었습니다.");
            onClose();
            if (type === "first-login") {
              router.push(PATH.REGULAR);
            }
          },
          onError: (error: Error) => {
            toast.error(`반려동물 정보 등록에 실패했어요: ${error.message}`);
          },
        });
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "알 수 없는 오류가 발생했어요.";
      toast.error(`오류가 발생했어요: ${message}`);
    }
  };

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

  const isSubmitting =
    createPetMutation.isPending ||
    updatePetMutation.isPending ||
    uploadImageMutation.isPending;

  const isSubmitDisabled =
    isPetPending ||
    isSubmitting ||
    !form.formState.isValid ||
    (type === "edit-pet" && !hasChanges);

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
                    <Dog />
                  </Form.ImageUpload>
                </Form.Control>
                <Form.Label className="flex justify-center">
                  사진을 등록해 주세요
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
            disabled={isSubmitDisabled}
            label={type === "edit-pet" ? "수정하기" : "등록하기"}
          />
        </Form>

        {type === "first-login" && (
          <button
            className="mt-2 border-b-2"
            type="button"
            onClick={handleSkip}
          >
            아직 반려견이 없어요
          </button>
        )}
      </Modal.Content>
    </Modal>
  );
}
