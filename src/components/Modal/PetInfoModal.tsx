import React from "react";

import CloseButton from "../../assets/icons/delete-icon.svg";

import Modal from ".";

interface PetInfoModalProps {
  type: "first-login" | "add-pet" | "edit-pet";
  onClose?: () => void;
}

export default function PetInfoModal({ type, onClose }: PetInfoModalProps) {
  return (
    <Modal.Layout>
      {(type === "add-pet" || type === "edit-pet") && (
        <Modal.Button className="ml-auto" type="button">
          <CloseButton />
        </Modal.Button>
      )}
      <Modal.Title
        title="반려견 정보를 등록해주세요"
        subtitle="마이페이지에서 언제든지 추가 등록이 가능해요 🐶"
      ></Modal.Title>
      <Modal.FormWrapper>
        <Modal.Form>
          <Modal.ImageUpload id="photo" placeholder="사진을 등록해주세요" />
          <Modal.TextInput
            label="이름"
            id="name"
            placeholder="반려견 이름을 입력해주세요"
            required
          />
          <Modal.RadioInput
            label="성별"
            required
            name="gender"
            options={[
              { id: "male", label: "남아", value: "male" },
              { id: "female", label: "여아", value: "female" },
            ]}
            defaultChecked="male"
          />
          <Modal.RadioInput
            label="중성화"
            name="neuter"
            options={[
              { id: "did", label: "중성화", value: "did" },
              { id: "didnot", label: "중성화 안함", value: "didnot" },
            ]}
            defaultChecked="did"
          />
          <Modal.DateSelect label="생일" required name="birthday" />
          <Modal.BreedSelect label="견종" required name="breed" />
          <Modal.Button
            className="bg-accent w-full rounded-xl py-2"
            type="submit"
          >
            {type === "edit-pet" ? "수정하기" : "등록하기"}
          </Modal.Button>
        </Modal.Form>
        {type === "first-login" && (
          <Modal.Button className="mt-2 border-b-2" type="button">
            아직 반려견이 없어요
          </Modal.Button>
        )}
      </Modal.FormWrapper>
    </Modal.Layout>
  );
}
