import React from "react";
import { useFormContext } from "react-hook-form";

import Dog from "@/assets/images/dog.svg";

import { Form } from "../Form";

export default function GatheringBasicInfo() {
  const form = useFormContext();
  const currentImage = form.watch("image");

  return (
    <section className="flex gap-6">
      {/* 모임 대표사진 */}
      <Form.Field
        name="image"
        render={({ field: { onChange, value } }) => (
          <Form.Item className="bg-card flex h-[357px] w-[456px] flex-col justify-center rounded-xl border-1 border-[#bbb]">
            <Form.Control>
              <Form.ImageUpload
                onChange={onChange}
                value={value as File | null}
                existingImageUrl={currentImage as string}
              >
                <Dog className="w-20" />
              </Form.ImageUpload>
            </Form.Control>
            <Form.Label className="flex justify-center">
              모임의 대표사진을 등록해주세요
            </Form.Label>
          </Form.Item>
        )}
      />

      {/* 모임 이름 */}
      <div className="flex flex-1 flex-col gap-6">
        <div className="flex flex-col gap-3">
          <Form.Field
            name="name"
            render={({ field }) => (
              <Form.Item>
                <Form.Label required className="text-lg font-semibold">
                  모임 이름
                  <span>
                    0/<span className="text-primary">30</span>
                  </span>
                </Form.Label>
                <Form.Control>
                  <Form.Input
                    type="text"
                    placeholder="모임 이름을 작성해주세요"
                    className="w-full rounded-xl bg-[#edf4fb] px-4 py-2.5"
                    {...field}
                  />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />
        </div>

        {/* 모임 설명 */}
        <div className="flex flex-1 flex-col gap-3">
          <Form.Field
            name="description"
            render={({ field }) => (
              <Form.Item className="flex flex-1 flex-col">
                <Form.Label className="text-lg font-semibold">
                  모임 설명
                  <span>
                    0/<span className="text-primary">1000</span>
                  </span>
                </Form.Label>
                <Form.Control>
                  <Form.Textarea
                    placeholder="모임 설명을 간단하게 작성해주세요"
                    className="w-full flex-1 rounded-xl bg-[#edf4fb] px-4 py-2.5"
                    {...field}
                  />
                </Form.Control>
              </Form.Item>
            )}
          />
        </div>
      </div>
    </section>
  );
}
