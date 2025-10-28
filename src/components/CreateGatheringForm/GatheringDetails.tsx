import React from "react";

import { PET_REQUIRED_OPTIONS } from "@/lib/constants/petRequired";
import { EGatheringType } from "@/lib/types/gatherings";

import { Form } from "../Form";

import GatheringDateTimeField from "./GatheringDateTimeField";

interface GatheringDetailsProps {
  type: EGatheringType;
}

export default function GatheringDetails({ type }: GatheringDetailsProps) {
  return (
    <section className="flex flex-col gap-13">
      <div className="flex justify-between gap-29">
        {/* 모임 날짜 */}
        <GatheringDateTimeField type={type} />

        {/* 마감 날짜 */}
        <Form.Field
          name="registrationEnd"
          render={({ field }) => (
            <Form.Item className="flex-1">
              <Form.Label required className="text-lg font-semibold">
                마감 날짜
              </Form.Label>
              <Form.Control>
                <Form.Input
                  type={
                    type === EGatheringType.QUICK ? "datetime-local" : "date"
                  }
                  placeholder="마감 날짜를 선택해주세요"
                  className="w-full rounded-xl bg-[#edf4fb] px-4 py-2.5"
                  disabled={type === EGatheringType.QUICK}
                  {...field}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />
      </div>

      <div className="flex justify-between gap-29">
        {/* 반려견 동반 여부 */}
        <Form.Field
          name="isPetRequired"
          render={({ field }) => (
            <Form.Item className="flex-1">
              <Form.Label required className="text-lg font-semibold">
                반려견 동반 여부
              </Form.Label>
              <Form.Control>
                <Form.Radio
                  className="max-h-10"
                  options={PET_REQUIRED_OPTIONS}
                  {...field}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />

        {/* 모집 인원 */}
        <Form.Field
          name="capacity"
          render={({ field }) => (
            <Form.Item className="flex-1">
              <Form.Label required className="text-lg font-semibold">
                모집 인원
              </Form.Label>
              <Form.Control>
                <Form.Input
                  type="number"
                  className="w-full rounded-xl bg-[#edf4fb] px-4 py-2.5"
                  {...field}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />
      </div>
    </section>
  );
}
