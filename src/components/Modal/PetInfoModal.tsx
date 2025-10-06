import React from "react";

import Dog from "../../assets/images/dog.svg";
import Button from "../Button";
import { Form } from "../Form";

import { PetInfoFormSchema, usePetInfoForm } from "./_hooks/usePetInfoForm";
import Modal from ".";

interface RadioOptionType {
  id: string;
  label: string;
  value: string;
}

const GENDER_OPTIONS: RadioOptionType[] = [
  { id: "male", label: "남아", value: "male" },
  { id: "female", label: "여아", value: "female" },
];

const NEUTER_OPTIONS: RadioOptionType[] = [
  { id: "did", label: "중성화", value: "did" },
  { id: "didnot", label: "중성화 안함", value: "didnot" },
];

interface PetInfoModalProps {
  type: "first-login" | "add-pet" | "edit-pet";
}

export default function PetInfoModal({ type }: PetInfoModalProps) {
  const form = usePetInfoForm();
  const handleSubmit = (data: PetInfoFormSchema) => {
    console.log(`form data : ${data}`);
    // api 로직 추가
  };
  return (
    <>
      <Modal.Title
        title="반려견 정보를 등록해주세요"
        subtitle="마이페이지에서 언제든지 추가 등록이 가능해요 🐶"
      />
      <Modal.ModalContent>
        <Form form={form} onSubmit={handleSubmit}>
          {/* 이미지 업로드 */}
          <Form.Field
            name="photo"
            render={({ field: { onChange, value, ...field } }) => (
              <Form.Item>
                <Form.Control>
                  <Form.ImageUpload
                    onChange={onChange}
                    value={value}
                    {...field}
                  >
                    <Dog />
                  </Form.ImageUpload>
                </Form.Control>
                <Form.Label className="flex justify-center">
                  사진을 등록해주세요
                </Form.Label>
                <Form.Message />
              </Form.Item>
            )}
          />
          {/* 이름 */}
          <Form.Field
            name="name"
            render={({ field }) => (
              <Form.Item>
                <Form.Label required>이름</Form.Label>
                <Form.Control>
                  <Form.Input
                    type="text"
                    placeholder="반려견 이름을 알려주세요"
                    {...field}
                  />
                </Form.Control>
              </Form.Item>
            )}
          />
          {/* 성별 */}
          <Form.Field
            name="gender"
            render={({ field }) => (
              <Form.Item>
                <Form.Label required>성별</Form.Label>
                <Form.Control>
                  <Form.Radio
                    label="gender"
                    options={GENDER_OPTIONS}
                    defaultChecked="male"
                    {...field}
                  />
                </Form.Control>
              </Form.Item>
            )}
          />
          {/* 중성화 여부 */}
          <Form.Field
            name="neuter"
            render={({ field }) => (
              <Form.Item>
                <Form.Label>중성화</Form.Label>
                <Form.Control>
                  <Form.Radio
                    label="gender"
                    options={NEUTER_OPTIONS}
                    defaultChecked="did"
                    {...field}
                  />
                </Form.Control>
              </Form.Item>
            )}
          />
          {/* 생일 */}
          <Form.Field
            name="birthday"
            render={({ field }) => (
              <Form.Item>
                <Form.Label required>생일</Form.Label>
                <Form.Control>
                  <Modal.DateSelect {...field} name="birthday" />
                </Form.Control>
              </Form.Item>
            )}
          />
          {/* 견종 */}
          <Form.Field
            name="breed"
            render={({ field }) => (
              <Form.Item>
                <Form.Label required>견종</Form.Label>
                <Form.Control>
                  <Modal.BreedSelect {...field} name="breed" htmlFor="breed" />
                </Form.Control>
              </Form.Item>
            )}
          />
          <Form.SubmitButton
            label={type === "edit-pet" ? "수정하기" : "등록하기"}
          />
        </Form>
        {type === "first-login" && (
          <Button className="mt-2 border-b-2" type="button">
            아직 반려견이 없어요
          </Button>
        )}
      </Modal.ModalContent>
    </>
  );
}
